/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadIcon, PlusIcon, RowsIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Text, Theme } from '@radix-ui/themes';
import { GridOptions, RowDoubleClickedEvent, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useRef, useState } from 'react';
import { UserUpdateInitialValues } from '../../types';
import { Users } from '../../utils/helpers/models';
import { CreateUserModal, PasswordGeneratedModal, UpdateUserModal } from '../Modal';

/**
 * @deprecated Do NOT add more functionality to this
 * FIXME: Refactor this component and transition to a Table component
 * that will be reused for different table lists
 * AKA. we should not be using the same table to funnel
 * different domain data fetching concerns through.
 * As the different use-cases build up, it becomes harder to read and debug
 */
type TableListProps = {
    columnDefs: GridOptions['columnDefs'];
    data: GridOptions['rowData'];
    itemName: string;
    onDelete: () => void;
};

const TableList = ({ columnDefs, data, itemName, onDelete }: TableListProps) => {
    const initialUserUpdateValues: UserUpdateInitialValues = {
        nickname: '',
        id: '',
        active: false,
    };

    const gridRef = useRef<any>(null);
    const [selectedCount, setSelectedCount] = useState(0);
    const [isCreateUserModalOpen, setCreateUserModalOpen] = useState(false);
    const [isUpdateUserModalOpen, setUpdateUserModalOpen] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState<UserUpdateInitialValues>(initialUserUpdateValues);
    const [password, setPassword] = useState('');
    const [showPasswordModal, setShowPasswordModal] = useState(false);

    const handlePasswordGenerated = (newPassword: string) => {
        console.log('Password received in parent:', newPassword);
        setPassword(newPassword);
        setShowPasswordModal(true);
    };

    const onSelectionChanged = () => {
        if (gridRef.current) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            setSelectedCount(selectedRows.length);
        }
    };

    const handleRowDoubleClick = (event: RowDoubleClickedEvent) => {
        const rowData = event.data;
        setSelectedUserData({ id: Users.parseUserID(rowData), ...rowData });
        setUpdateUserModalOpen(true);
    };

    const downloadCSV = () => {
        if (gridRef.current) {
            gridRef.current.api.exportDataAsCsv({
                fileName: `${itemName}_data.csv`,
            });
        }
    };

    return (
        <Theme accentColor='brown'>
            <div data-testid='table-list'>
                <Card style={{ marginTop: '1rem', padding: '1rem', width: '100%', height: 'calc(100% - 2rem)' }}>
                    <Flex justify='between' align='center' mb='4'>
                        <Text size='2' weight='bold'>
                            {selectedCount} {itemName}
                            {selectedCount > 1 || selectedCount == 0 ? 's' : ''} selected
                        </Text>
                        <Flex gap='2'>
                            {selectedCount > 0 && (
                                <Button variant='outline' color='red' size='3' radius='full' onClick={onDelete}>
                                    <TrashIcon />
                                    Delete
                                </Button>
                            )}
                            <Button variant='outline' size='3' radius='large'>
                                <RowsIcon />
                                Filters
                            </Button>
                            <Button variant='outline' size='3' radius='large' onClick={downloadCSV}>
                                <DownloadIcon />
                                Export
                            </Button>
                            <Button
                                data-testid={`new-${itemName}-button`}
                                variant='solid'
                                size='3'
                                radius='large'
                                onClick={() => setCreateUserModalOpen(true)}
                            >
                                <PlusIcon />
                                New {itemName}
                            </Button>
                            {isCreateUserModalOpen && itemName === 'user' && (
                                <CreateUserModal
                                    isOpen={isCreateUserModalOpen}
                                    onClose={() => setCreateUserModalOpen(false)}
                                    onPasswordGenerated={handlePasswordGenerated}
                                />
                            )}
                            {showPasswordModal && (
                                <PasswordGeneratedModal
                                    isOpen={showPasswordModal}
                                    password={password}
                                    onClose={() => setShowPasswordModal(false)}
                                />
                            )}
                        </Flex>
                    </Flex>

                    <div className='max-h-[80vh] h-auto w-full overflow-x-scroll'>
                        <AgGridReact
                            ref={gridRef}
                            columnDefs={columnDefs}
                            rowData={data}
                            theme={themeQuartz.withParams({ accentColor: '#A18072' })}
                            rowSelection={{ mode: 'multiRow' }}
                            onSelectionChanged={onSelectionChanged}
                            suppressRowHoverHighlight={true}
                            columnHoverHighlight={false}
                            domLayout='autoHeight'
                            onRowDoubleClicked={handleRowDoubleClick}
                        />
                    </div>
                    {isUpdateUserModalOpen && itemName === 'user' && (
                        <UpdateUserModal
                            initialValues={selectedUserData}
                            isOpen={isUpdateUserModalOpen}
                            onClose={() => setUpdateUserModalOpen(false)}
                        />
                    )}
                </Card>
            </div>
        </Theme>
    );
};

export default TableList;

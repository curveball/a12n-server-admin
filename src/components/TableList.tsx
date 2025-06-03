import { useState, useRef } from 'react';
import { Theme, Button, Card, Text, Flex } from '@radix-ui/themes';
import { DownloadIcon, PlusIcon, RowsIcon, TrashIcon } from '@radix-ui/react-icons';
import { AgGridReact } from 'ag-grid-react';
import { RowDoubleClickedEvent, themeQuartz } from 'ag-grid-community';
import { CreateUserModal, UpdateUserModal } from '../containers';
import { UserUpdateInitialValues } from '../utils/types';
import { PasswordGeneratedModal } from '../containers/PasswordGeneratedModal';
import { Users } from '../utils/helpers/models';

const TableList = ({ columnDefs, data, itemName, onDelete }: any) => {
    const initialUserUpdateValues: UserUpdateInitialValues = {
        nickname: '',
        id: '',
        active: false,
    };

    const gridRef = useRef<any>(null);
    const [selectedCount, setSelectedCount] = useState(0);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
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
        setIsTableModalOpen(true);
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
            <div>
                <Card style={{ marginTop: '1rem', padding: '1rem', width: '100%', height: 'calc(100% - 2rem)' }}>
                    {/* Action Bar */}
                    <Flex justify='between' align='center' style={{ marginBottom: '1rem' }}>
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
                            <Button variant='solid' size='3' radius='large' onClick={() => setIsNewModalOpen(true)}>
                                <PlusIcon />
                                New {itemName}
                            </Button>
                            {isNewModalOpen && itemName === 'user' && (
                                <CreateUserModal
                                    onClose={() => setIsNewModalOpen(false)}
                                    onPasswordGenerated={handlePasswordGenerated}
                                />
                            )}
                            {showPasswordModal && (
                                <PasswordGeneratedModal
                                    password={password}
                                    onClose={() => setShowPasswordModal(false)}
                                />
                            )}
                        </Flex>
                    </Flex>

                    <div style={{ maxHeight: '80vh', height: 'auto', width: '100%', overflowX: 'scroll' }}>
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
                    {isTableModalOpen && itemName === 'user' && (
                        <UpdateUserModal onClose={() => setIsTableModalOpen(false)} initialValues={selectedUserData} />
                    )}
                </Card>
            </div>
        </Theme>
    );
};

export default TableList;

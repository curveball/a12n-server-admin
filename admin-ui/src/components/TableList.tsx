import { useState, useRef } from 'react';
import { Theme, Button, Card, Text, Flex } from '@radix-ui/themes';
import { TrashIcon, DownloadIcon, PlusIcon, RowsIcon } from '@radix-ui/react-icons';
import { AgGridReact } from 'ag-grid-react';
import { themeQuartz } from 'ag-grid-community';
import { CreateUserModal, UpdateUserModal } from '../containers';

const TableList = ({ columnDefs, data, itemName, onDelete }: any) => {
    const gridRef = useRef<any>(null);
    const [selectedCount, setSelectedCount] = useState(0);
    const [isNewModalOpen, setIsNewModalOpen] = useState(false);
    const [isTableModalOpen, setIsTableModalOpen] = useState(false);
    const [selectedUserData, setSelectedUserData] = useState<any>(null);

    const onSelectionChanged = () => {
        if (gridRef.current) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            setSelectedCount(selectedRows.length);
        }
    };

    const handleRowDoubleClick = (event: any) => { 
        const rowData = event.data;
        setIsTableModalOpen(true);
        setSelectedUserData(rowData)
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
                            <Button variant='outline' size='3' radius='full'>
                                <RowsIcon />
                                Filters
                            </Button>
                            <Button variant='outline' size='3' radius='full'>
                                <DownloadIcon />
                                Export
                            </Button>
                            <Button variant='solid' size='3' radius='full' onClick={ () => setIsNewModalOpen(true) }>
                                <PlusIcon />
                                New {itemName}
                            </Button>
                            { isNewModalOpen && itemName === 'user' && (<CreateUserModal onClose={() => setIsNewModalOpen(false)} />) }
                        </Flex>
                    </Flex>

                    {/* Table */}
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
                            onRowDoubleClicked={ handleRowDoubleClick }
                        />
                    </div>
                    { isTableModalOpen && itemName === 'user' && (<UpdateUserModal onClose={() => setIsTableModalOpen(false)} userData={ selectedUserData } />) }
                </Card>
            </div>
        </Theme>
    );
};

export default TableList;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { DownloadIcon, PlusIcon, TrashIcon } from '@radix-ui/react-icons';
import { Button, Card, Flex, Text, Theme } from '@radix-ui/themes';
import { GridOptions, themeQuartz } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { useRef, useState } from 'react';

type TableProps = {
    testId?: string;
    columnDefs: GridOptions['columnDefs'];
    data: GridOptions['rowData'];
    itemName: string;
    initialValues: unknown;
    onAdd?: () => void;
    onDelete: () => void;
    onDoubleClick?: (rowData: unknown) => void;
};

const Table = ({ columnDefs, data, itemName, initialValues, testId, onAdd, onDelete, onDoubleClick }: TableProps) => {
    const gridRef = useRef<any>(null);
    const [selectedCount, setSelectedCount] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_selectedItem, _setSelectedItem] = useState<unknown>(initialValues);

    const onSelectionChanged = () => {
        if (gridRef.current) {
            const selectedRows = gridRef.current.api.getSelectedRows();
            setSelectedCount(selectedRows.length);
        }
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
            <Card data-testid={testId} className='mt-4 p-4 w-full h-[calc(100%-2rem)]'>
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
                        <Button variant='outline' size='3' radius='large' onClick={downloadCSV}>
                            <DownloadIcon />
                            Export
                        </Button>
                        <Button variant='solid' size='3' radius='large' onClick={onAdd}>
                            <PlusIcon />
                            New {itemName}
                        </Button>
                    </Flex>
                </Flex>

                <div className='max-h-[80vh] h-auto w-full overflow-x-scroll'>
                    {data && (
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
                            onRowDoubleClicked={onDoubleClick}
                        />
                    )}
                    {data && !data && <Text>No {itemName}s available</Text>}
                </div>
            </Card>
        </Theme>
    );
};

export default Table;

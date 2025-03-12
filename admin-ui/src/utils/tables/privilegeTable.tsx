import React from 'react';
import { Badge } from '@radix-ui/themes';

const columnDefs = [
  {
    field: 'title',
    headerName: 'Privilege Title',
    flex: 1,
    minWidth: 300,
    resizable: false,
  },
  {
    field: 'href',
    headerName: 'URL',
    flex: 1,
    minWidth: 300,
    resizable: false,
  },
];

export default columnDefs;
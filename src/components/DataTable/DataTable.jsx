import React, { useMemo } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Button } from '../UI/Button';

const DataTable = ({ nodes, onDeleteNode, onEditNode }) => {
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor('id', {
        header: 'ID',
        cell: info => info.getValue(),
      }),
      columnHelper.accessor('type', {
        header: 'Node Type',
        cell: info => info.getValue().charAt(0).toUpperCase() + info.getValue().slice(1),
      }),
      columnHelper.accessor('data.name', {
        header: 'Name',
        cell: info => info.getValue() || 'Unnamed',
      }),
      columnHelper.accessor('data', {
        id: 'status',
        header: 'Status',
        cell: info => {
          const data = info.getValue();
          if (info.row.original.type === 'task') {
            return data.assignee ? `Assigned to ${data.assignee}` : 'Unassigned';
          } else if (info.row.original.type === 'condition') {
            return data.operator ? `${data.variable || 'Variable'} ${data.operator} ${data.value || 'Value'}` : 'Unconfigured';
          } else if (info.row.original.type === 'notification') {
            return data.channel ? `${data.channel} to ${data.recipient || 'recipient'}` : 'Unconfigured';
          }
          return 'Unknown';
        },
      }),
      columnHelper.accessor('id', {
        id: 'actions',
        header: 'Actions',
        cell: info => (
          <div className="flex space-x-2">
            <Button onClick={() => onEditNode(null, info.row.original)} variant="secondary" size="xs">
              Edit
            </Button>
            <Button onClick={() => onDeleteNode(info.getValue())} variant="danger" size="xs">
              Delete
            </Button>
          </div>
        ),
      }),
    ],
    [columnHelper, onEditNode, onDeleteNode]
  );

  const table = useReactTable({
    data: nodes,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Workflow Nodes</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
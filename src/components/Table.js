import React, { useState } from 'react';

const Table = ({ columns, data }) => {
    const [sortedData, setSortedData] = useState(data);
    const [sortConfig, setSortConfig] = useState(null);

    const sortData = (column) => {
        let direction = 'asc';
        if (sortConfig && sortConfig.column === column && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        const sortedRows = [...data].sort((a, b) => {
            if (a[column] < b[column]) {
                return direction === 'asc' ? -1 : 1;
            }
            if (a[column] > b[column]) {
                return direction === 'asc' ? 1 : -1;
            }
            return 0;
        });
        setSortedData(sortedRows);
        setSortConfig({ column, direction });
    };

    return (
        <table>
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column} onClick={() => sortData(column)}>
                            {column}
                            {sortConfig && sortConfig.column === column ? (
                                <span>
                                    {sortConfig.direction === 'asc' ? ' v' : ' ^'}
                                </span>
                            ) : null}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row) => (
                    <tr key={row.id}>
                        {columns.map((column) => (
                            <td key={`${row.id}-${column}`}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
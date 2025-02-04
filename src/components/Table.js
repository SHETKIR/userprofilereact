import React, { useState, useEffect } from 'react';

const Table = ({ columns, data }) => {
    const [sortedData, setSortedData] = useState(data);
    const [sortConfig, setSortConfig] = useState(null);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const json = await response.json();
                setUserPosts(json);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };
        fetchUserPosts();
    }, []);

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

    const getUserPostById = (userId) => {
        const post = userPosts.find((post) => post.userId === userId);
        return post ? post.title : 'No post found';
    };

    const handleUserClick = (userId) => {
        const userPostTitle = getUserPostById(userId);
        alert(`User Post Title: ${userPostTitle}`);
    };

    return (
        <div>
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
                                <td key={`${row.id}-${column}`}>
                                    {column === 'name' ? (
                                        <button onClick={() => handleUserClick(row.id)}>
                                            {row[column]}
                                        </button>
                                    ) : (
                                        row[column]
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
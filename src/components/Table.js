import React, { useState, useEffect } from 'react';

const Table = ({ columns, data }) => {
    const [sortedData, setSortedData] = useState(data);
    const [sortConfig, setSortConfig] = useState(null);
    const [userPosts, setUserPosts] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);

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
        const posts = userPosts.filter((post) => post.userId === userId);
        return posts.map((post) => post.title).join(', ') || 'No posts found';
    };

    const handleUserClick = (userId) => {
        setSelectedUserId(userId);
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
            <div>
                <h2>User Info</h2>
                {selectedUserId && (
                    <div>
                        <strong>ID:</strong> {selectedUserId}
                        <br />
                        <strong>Name:</strong> {sortedData.find((row) => row.id === selectedUserId)?.name}
                        <br />
                        <strong>Email:</strong> {sortedData.find((row) => row.id === selectedUserId)?.email}
                        <br />
                        <strong>Posts:</strong> {getUserPostById(selectedUserId)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Table;
import React from 'react';
import Table from '../components/Table';
import { fetchUsers } from '../api/api';

const columns = ['name', 'email', 'address.city', 'phone', 'website', 'company.name'];

const HomePage = ({ users }) => {
    return (
        <div>
            <Table columns={columns} data={users} />
        </div>
    );
};

export const getServerSideProps = async () => {
    const users = await fetchUsers();
    return { props: { users } };
};

export default HomePage;
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';

export const fetchUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};
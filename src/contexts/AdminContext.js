import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/user/get-users');
                setUsersList(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getAllUsers();
    }, []);

    return (
        <AdminContext.Provider value={{ usersList }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => useContext(AdminContext);

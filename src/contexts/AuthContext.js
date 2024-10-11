import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const initializeAuthState = () => {
    const storedAuthState = JSON.parse(localStorage.getItem('authState')) || {};
    return {
        isAuthenticated: storedAuthState.isAuthenticated || false,
        isAdmin: storedAuthState.isAdmin || false,
        username: storedAuthState.username || '',
        uId: storedAuthState.uId || null,
        authHeader: storedAuthState.authHeader || ''
    };
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(initializeAuthState().isAuthenticated);
    const [isAdmin, setIsAdmin] = useState(initializeAuthState().isAdmin);
    const [username, setUsername] = useState(initializeAuthState().username);
    const [uId, setuId] = useState(initializeAuthState().uId);
    const [authHeader, setAuthHeader] = useState(initializeAuthState().authHeader);

    useEffect(() => {
        localStorage.setItem('authState', JSON.stringify({
            isAuthenticated,
            isAdmin,
            username,
            uId,
            authHeader
        }));
    }, [isAuthenticated, isAdmin, username, uId, authHeader]);

    const setAuthState = (id, username, password, isAdmin) => {
        setuId(id);
        setUsername(username);
        setIsAuthenticated(true);
        setIsAdmin(isAdmin);
        const headers = {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
        };
        setAuthHeader(headers.Authorization);
    };

    const login = async ({ username, password }) => {
        const response = await axios.post('http://localhost:8080/api/auth/login', { username, password });
        if (response.data.success) {
            setAuthState(response.data.user.id, response.data.user.username, password, response.data.user.role === 'ROLE_ADMIN');
            return true;
        } else {
            return false;
        }
    };

    const register = async ({ email, username, password }) => {
        const response = await axios.post('http://localhost:8080/api/auth/register', { email, username, password });
        if (response.data.success) {
            setAuthState(response.data.user.id, response.data.user.username, password, response.data.user.role === 'ROLE_ADMIN');
            return true;
        } else {
            return false;
        }
    };

    const logout = () => {
        setuId(null);
        setUsername('');
        setIsAuthenticated(false);
        setIsAdmin(false);
        setAuthHeader('');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('username');
        localStorage.removeItem('uId');
        localStorage.removeItem('authHeader');
    };

    return (
        <AuthContext.Provider value={{ isAdmin, isAuthenticated, uId, username, register, login, logout, authHeader }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

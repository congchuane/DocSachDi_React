import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const MyLayout = ({ children }) => {
    return (
        <content>
            {children}
        </content>
    )
};

export default MyLayout;
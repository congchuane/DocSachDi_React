import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Menu, Space, Dropdown } from 'antd';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';

const HomeNav = () => {
    const { isAdmin, username, logout } = useAuth();
    const navigate = useNavigate();

    const handleShortcutClick = (e) => {
        switch (e.key) {
            case '1':
                navigate('/dashboard');
                break;
            case '2':
                navigate('/booklist');
                break;
            case '3':
                navigate('/progress');
                break;
            case '4':
                logout();
                navigate('/');
                break;
            default:
                break;
        }
    };

    const userMenuItems = [
        {
            key: '2',
            label: 'Danh sách đọc',
        },
        {
            key: '3',
            label: 'Tiến trình đọc',
        },
        {
            type: 'divider',
        },
        {
            key: '4',
            label: 'Đăng xuất',
            icon: <LogoutOutlined />,
        },
    ];

    if (isAdmin) {
        userMenuItems.unshift({
            key: '1',
            label: 'Dashboard',
        });
    }

    const userMenu = (
        <Menu onClick={handleShortcutClick} items={userMenuItems} />
    );

    return (
        <ul className="nav-links">
            <li className="nav-link"><a href='/library'>Hướng dẫn</a></li>
            <li className="nav-link"><a href='/library'>Blog</a></li>
            <li className="nav-link">Xin chào,
                <Dropdown overlay={userMenu}>
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <span style={{ color: '#db6776', fontWeight: '500', marginLeft: '3px' }}>  {username}</span>
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
            </li>
        </ul>
    );
}

export default HomeNav;

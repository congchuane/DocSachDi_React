import axios from 'axios';
import React, { useState } from 'react';
import './Dashboard.css';
import pfp from '../../images/profile-picture.png';
import adminpfp from '../../images/adminpfp.png';
import { Avatar, List, Modal } from 'antd';
import { useAdmin } from '../../contexts/AdminContext';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const Users = () => {
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { usersList } = useAdmin();

    const handleUserView = (user) => {
        setSelectedUser(user);
        setIsInfoModalOpen(true);
    };

    return (
        <>
            <div className="dashboard-container">
                <DashboardNav />

                <Sidebar />

                {/* Main Content */}
                <main className='dash-main'>
                    <div className='main-content'>
                        <div className='dash-main-container'>
                            <h1>Quản Lý Thành Viên</h1>
                            <List
                                pagination={{ position: 'bottom', align: 'center' }}
                                dataSource={usersList}
                                renderItem={(item) => (
                                    <List.Item
                                        actions={[
                                            <a key="list-loadmore-view" onClick={() => handleUserView(item)}>Xem</a>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Avatar src={item.role === 'ROLE_ADMIN' ? adminpfp : pfp} />}
                                            title={item.username}
                                            description={item.role === 'ROLE_ADMIN' ? 'Admin' : 'Reader'}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </div>
                </main>
                {/* End of Main Content */}
            </div>

            <Modal
                className="custom-modal"
                title="Thông tin người dùng"
                open={isInfoModalOpen}
                onCancel={() => setIsInfoModalOpen(false)}
                footer={null}
            >
                {selectedUser ? (
                    <div className="user-info">
                        <p><strong>ID:</strong> {selectedUser.id}</p>
                        <p><strong>Username:</strong> {selectedUser.username}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Role:</strong> {selectedUser.role === 'ROLE_ADMIN' ? 'Admin' : 'Reader'}</p>
                    </div>
                ) : (
                    <p>Không tìm thấy thông tin người dùng.</p>
                )}
            </Modal>
        </>
    );
};

export default Users;

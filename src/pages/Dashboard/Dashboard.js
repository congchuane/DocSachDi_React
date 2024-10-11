import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import image from '../../images/image.png';
import more from '../../images/plus-circle-svgrepo-com.png';
import pfp from '../../images/profile-picture.png';
import adminpfp from '../../images/adminpfp.png';
import { useBooks } from '../../contexts/BookContext';
import { useAdmin } from '../../contexts/AdminContext';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const Dashboard = () => {
    const { books, newestBooks } = useBooks();
    const { usersList } = useAdmin();

    return (
        <div className="dashboard-container">
            <DashboardNav />

            <Sidebar />

            {/* Main Content */}
            <main>
                <div className='main-content'>
                    <div className="analyse">
                        <div className="sales">
                            <div className="status">
                                <div className="info">
                                    <h3>Tổng số sách</h3>
                                    <h1>{books.length}</h1>
                                </div>
                                <div className="progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="percentage">
                                        <p>+81%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="visits">
                            <div className="status">
                                <div className="info">
                                    <h3>Lượt truy cập</h3>
                                    <h1>125</h1>
                                </div>
                                <div className="progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="percentage">
                                        <p>-48%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="searches">
                            <div className="status">
                                <div className="info">
                                    <h3>Thành viên</h3>
                                    <h1>{usersList.length}</h1>
                                </div>
                                <div className="progress">
                                    <svg>
                                        <circle cx="38" cy="38" r="36"></circle>
                                    </svg>
                                    <div className="percentage">
                                        <p>+21%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="new-users">
                        <h2>Thành viên mới</h2>
                        <div className="user-list">
                            {usersList
                                .sort((a, b) => b.id - a.id)
                                .slice(0, 3)
                                .map((user, index) => (
                                    <div className="user" key={index}>
                                        <img src={user.role === 'ROLE_ADMIN' ? adminpfp : pfp} alt="user profile" />
                                        <h3>{user.username}</h3>
                                        <p>{user.role === 'ROLE_ADMIN' ? 'Admin' : 'Reader'}</p>
                                    </div>
                                ))
                            }
                            <div className="user">
                                <img src={more} alt="user profile" />
                                <Link to="/users">Xem thêm</Link>
                            </div>
                        </div>
                    </div>

                    <div className="recent-orders">
                        <h2>Sách mới cập nhật</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tiêu đề</th>
                                    <th>Tác giả</th>
                                </tr>
                            </thead>
                            <tbody>
                                {newestBooks.slice(0, 3).map((book, index) => (
                                    <tr key={index}>
                                        <td>{book.id}</td>
                                        <td><a href={`/book/${book.id}`}>{book.title}</a></td>
                                        <td>{Array.isArray(book.authorNames) ? book.authorNames.join(", ") : book.authorNames}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <a href="/addbook">Xem thêm</a>
                    </div>
                </div>

                {/* Right Section */}
                <div className="right-section">
                    <div className="user-profile">
                        <div className="logo">
                            <img src={image} alt="logo" />
                            <h1>Đọc<span className='emphasized-text'>Sách</span>Đi</h1>
                            <p>React Web App</p>
                        </div>
                    </div>

                    <div className="reminders">
                        <div className="header">
                            <h2>Cập nhật</h2>
                            <span className="material-symbols-outlined">notifications</span>
                        </div>

                        {newestBooks.length > 1 && (
                            <div className="notification">
                                <div className="icon">
                                    <span className="material-symbols-outlined">edit</span>
                                </div>
                                <div className="content">
                                    <div className="info">
                                        <h3>Review mới</h3>
                                        <small className="text_muted">{newestBooks[1].title}</small>
                                    </div>
                                    <span className="material-symbols-outlined">more_vert</span>
                                </div>
                            </div>
                        )}

                        {newestBooks.length > 0 && (
                            <div className="notification deactive">
                                <div className="icon">
                                    <span className="material-symbols-outlined">star</span>
                                </div>
                                <div className="content">
                                    <div className="info">
                                        <h3>Rating mới</h3>
                                        <small className="text_muted">{newestBooks[0].title}</small>
                                    </div>
                                    <span className="material-symbols-outlined">more_vert</span>
                                </div>
                            </div>
                        )}

                        <div className="notification add-reminder">
                            <div>
                                <span className="material-symbols-outlined">notification_add</span>
                                <h3>Xem toàn bộ cập nhật</h3>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of Right Section */}
            </main>
            {/* End of Main Content */}
        </div>
    );
};

export default Dashboard;

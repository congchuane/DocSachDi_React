import React, { useState } from 'react';
import './Dashboard.css';
import { useBooks } from '../../contexts/BookContext';
import { BookOutlined, ReadOutlined, CheckOutlined } from '@ant-design/icons';
import { Progress, List, Avatar, message } from 'antd';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';
import { Link } from 'react-router-dom';

const conicColors = {
    '0%': '#87d068',
    '50%': '#ffe58f',
    '100%': '#ffccc7',
};

const ReadProgress = () => {
    const { booklists, getBookDetailsById, updateBookStatus } = useBooks();

    const wishlistCount = booklists.bookWishlist.length;
    const readingCount = booklists.bookReadingList.length;
    const readCount = booklists.bookReadList.length;

    const totalBooks = wishlistCount + readingCount + readCount;
    const readingProgress = totalBooks > 0 ? Math.round((readCount / totalBooks) * 100) : 0;

    const handleBookUpdate = async (bookId, status) => {
        const response = await updateBookStatus(bookId, status);
        message.info(response ? 'Cập nhật trạng thái đọc thành công.' : 'Lỗi cập nhật trạng thái sách.');
    }

    return (
        <div className="dashboard-container">
            <DashboardNav />

            <Sidebar />

            {/* Main Content */}
            <main className='dash-main'>
                <div className='main-content'>
                    <div className='dash-main-container'>
                        <div className='main-content'>
                            <div className="analyse">
                                <div className="book-count" href='/booklist'>
                                    <div className="progress">
                                        <BookOutlined />
                                    </div>
                                    <div className="book-count">
                                        <div className="info">
                                            <h3>Muốn đọc</h3>
                                            <Link to='/booklist'><h1>{wishlistCount}</h1></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="book-count" href='/booklist'>
                                    <div className="progress">
                                        <ReadOutlined />
                                    </div>
                                    <div className="status">
                                        <div className="info">
                                            <h3>Sách đang đọc</h3>
                                            <h1>{readingCount}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="book-count" href='/booklist'>
                                    <div className="progress">
                                        <CheckOutlined />
                                    </div>
                                    <div className="status">
                                        <div className="info">
                                            <h3>Sách đã đọc</h3>
                                            <h1>{readCount}</h1>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='large-content'>
                            <div className="progress-circle">
                                <h2>Tiến độ đọc hiện tại</h2>
                                <Progress
                                    type="dashboard"
                                    percent={readingProgress}
                                    strokeColor={conicColors}
                                    style={{ marginTop: '20px' }}
                                    size={200}
                                />
                            </div>
                            <div className="reading-list">
                                <p>Bạn đã đọc xong những cuốn sách này? Đánh dấu hoàn thành để cập nhật tiến độ.</p>
                                <List
                                    dataSource={booklists.bookReadingList}
                                    renderItem={(bookId) => {
                                        const book = getBookDetailsById(bookId);

                                        if (!book) {
                                            return (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title="Đang tải..."
                                                        description=""
                                                    />
                                                </List.Item>
                                            );
                                        }

                                        return (
                                            <List.Item
                                                className="book-list"
                                                actions={[<a onClick={() => handleBookUpdate(book.id, 2)}>Hoàn thành</a>]}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Avatar src={book.coverPath} />}
                                                    title={<a href={`/book/${book.id}`}>{book.title}</a>}
                                                    description={`${book.authorNames}`}
                                                />
                                            </List.Item>
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div >
            </main >

            {/* End of Main Content */}
        </div >
    );
};

export default ReadProgress;

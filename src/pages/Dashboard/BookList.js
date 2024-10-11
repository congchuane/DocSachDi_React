import React from 'react';
import './Dashboard.css';
import { useBooks } from '../../contexts/BookContext';
import { Avatar, List, Tabs, message } from 'antd';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const BookList = () => {

    const { booklists, getBookDetailsById, updateBookStatus } = useBooks();

    const handleBookUpdate = async (bookId, status) => {
        const response = await updateBookStatus(bookId, status);
        message.info(response ? 'Cập nhật trạng thái đọc thành công.' : 'Lỗi cập nhật trạng thái sách.');
    }

    const tabItems = [
        {
            label: 'MUỐN ĐỌC',
            key: '0',
            content: booklists?.bookWishlist || []
        },
        {
            label: 'ĐANG ĐỌC',
            key: '1',
            content: booklists?.bookReadingList || []
        },
        {
            label: 'ĐÃ ĐỌC',
            key: '2',
            content: booklists?.bookReadList || []
        }
    ];

    const renderBookList = (booklist) => (
        <List
            pagination={{ position: 'bottom', align: 'center' }}
            dataSource={booklist}
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
                        actions={[
                            <a onClick={() => handleBookUpdate(book.id, 1)}>Đang đọc</a>,
                            <a onClick={() => handleBookUpdate(book.id, 2)}>Đã đọc</a>,
                            <a key="delete" style={{ fontWeight: '500', color: 'red' }} onClick={() => handleBookUpdate(book.id, -1)}>Xoá</a>
                        ]}
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
    );

    return (
        <>
            <div className={`dashboard-container`}>
                <DashboardNav />

                <Sidebar />

                {/* Main Content */}
                <main className='dash-main'>
                    <div className='main-content'>
                        <div className='dash-main-container'>
                            <h1>Danh sách đọc</h1>
                            <Tabs defaultActiveKey="0" type="card">
                                {tabItems.map(tab => (
                                    <Tabs.TabPane tab={tab.label} key={tab.key}>
                                        {renderBookList(tab.content)}
                                    </Tabs.TabPane>
                                ))}
                            </Tabs>
                        </div>
                    </div>
                </main>
                {/* End of Main Content */}
            </div>

        </>
    );
};

export default BookList;

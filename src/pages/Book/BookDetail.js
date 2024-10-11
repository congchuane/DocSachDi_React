import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BookDetail.css';
import { BookOutlined, ReadOutlined, HomeOutlined, TeamOutlined, HeartFilled, LikeOutlined, MessageOutlined, StarOutlined, CheckOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Breadcrumb, Flex, Rate, Avatar, List, Space, Dropdown, Button, message } from 'antd';
import BookCard from '../../components/BookCard';
import { useNavigate } from "react-router-dom";
import { useBooks } from '../../contexts/BookContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../../components/SearchBar';
import HomeLogo from '../../components/HomeLogo';
import HomeNav from '../../components/HomeNav';

const data = Array.from({ length: 5 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `Reader ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    rating: Math.random() < 0.5 ? 4 : 5,
    content: [
        "Cuốn sách rất hay, dễ đọc và rất bổ ích.",
        "Tôi thực sự thích cách tác giả trình bày nội dung.",
        "Một cuốn sách đáng đọc, mang lại nhiều thông tin hữu ích.",
        "Sách viết rất dễ hiểu, phù hợp cho mọi đối tượng.",
        "Một tác phẩm xuất sắc, tôi sẽ giới thiệu cho bạn bè."
    ][Math.floor(Math.random() * 5)],
}));

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const BookDetail = () => {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const { books, updateBookStatus, selectedStatus, setSelectedStatus, checkBookStatus } = useBooks();
    const [relatedBooks, setRelatedBooks] = useState([]);

    useEffect(() => {
        const bookDetail = books.find(book => book.id == bookId);
        if (bookDetail) {
            setBook(bookDetail);
            updateRelatedBooks(bookDetail.tagNames);
            checkBookStatus(bookDetail.id);
        }
    }, [books, bookId]);


    const updateRelatedBooks = (tags) => {
        const filteredBooks = books.filter((b) =>
            b.tagNames.some((tag) => tags.includes(tag)) && b.id !== bookId
        );

        const randomBooks = filteredBooks.sort(() => 0.5 - Math.random()).slice(0, 10);
        setRelatedBooks(randomBooks);
    };


    if (!book) {
        return <div>Loading...</div>;
    }

    const handleMenuClick = async (e) => {
        const status = e.key;
        const response = await updateBookStatus(bookId, status);
        message.info(response ? 'Cập nhật trạng thái đọc thành công.' : 'Lỗi cập nhật trạng thái sách.');
    };

    const showStatusLabel = (selectedStatus) => {
        const item = items.find(item => item.key == selectedStatus);
        return item ? (
            <Space>
                {item.icon}
                {item.label}
            </Space>
        ) : (
            <Space>
                LƯU SÁCH
                <BookOutlined />
            </Space>
        );
    };

    const items = [
        {
            label: 'MUỐN ĐỌC',
            key: '0',
            icon: <BookOutlined />,
        },
        {
            label: 'ĐANG ĐỌC',
            key: '1',
            icon: <ReadOutlined />,
        },
        {
            label: 'ĐÃ ĐỌC',
            key: '2',
            icon: <CheckOutlined />,
        },
    ];

    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return (
        <div className='container'>
            <div className='glass-container'>
                <nav className="navbar">
                    <HomeLogo />
                    <SearchBar />
                    <HomeNav />
                </nav>
                <div className="home-content book-detail">
                    <div className='breadcrumb'>
                        <Breadcrumb
                            items={[
                                {
                                    href: '/library',
                                    title: <HomeOutlined />,
                                },
                                {
                                    title: book.tagNames[0],
                                },
                                {
                                    title: book.title,
                                },
                            ]}
                        />
                    </div>
                    <div className='row'>
                        <div className='col-2'>
                            <img src={book.coverPath} alt={book.title} />
                        </div>
                        <div className='col-2'>
                            <h1>{book.title}</h1>

                            <h3><TeamOutlined style={{ marginRight: '5px' }} />
                                <a href=''>{book.authorNames.join(', ')}</a>
                            </h3>

                            <div className="rating">
                                <Flex horizontal>
                                    <Rate
                                        value={book.rating}
                                        character={<HeartFilled />}
                                        className="custom-rate"
                                        allowHalf
                                    />
                                    <span className='book-rating'>{book.rating}</span>
                                    <span>/5</span>
                                </Flex>
                            </div>

                            <div className='tags'>
                                {book.tagNames.map((tag, index) => (
                                    <a key={index} href=''>{tag}</a>
                                ))}
                            </div>

                            <div className='desc'>
                                <p>{book.description}</p>
                            </div>

                            <div className='user-actions'>
                                <Dropdown menu={menuProps}>
                                    <Button>
                                        <Space>
                                            {showStatusLabel(selectedStatus)}
                                        </Space>
                                    </Button>
                                </Dropdown>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='home-content reviews'>
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            align: 'center',
                            onChange: (page) => {
                                console.log(page);
                            },
                            pageSize: 3,
                        }}
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                ]}
                                extra={
                                    <Rate
                                        value={item.rating}
                                        character={<HeartFilled />}
                                        className="custom-rate"
                                    />
                                }
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                />
                                {item.content}
                            </List.Item>
                        )}
                    />
                </div>
                <div className='page-title'>
                    <h2 style={{ marginTop: '15px', fontSize: '1.8rem' }}>&diams; Sách liên quan &diams;</h2>
                </div>
                <div className="wrapper">
                    {relatedBooks.map((relatedBook, index) => (
                        <BookCard key={index} book={relatedBook} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BookDetail;

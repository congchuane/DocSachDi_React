import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useBooks } from '../../contexts/BookContext';
import { useAuth } from '../../contexts/AuthContext';
import HomeLogo from '../../components/HomeLogo';

const Home = () => {
    const { books } = useBooks();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/library');
        }
    }, [isAuthenticated, navigate]);

    const randomBooks = [...books].sort(() => 0.5 - Math.random()).slice(0, 5);

    return (
        <div className='container'>
            <div className='glass-container home'>
                <nav className="navbar">
                    <HomeLogo />

                    <ul className="nav-links">
                        <li className="nav-link"><a href='/login'>Thư viện</a></li>
                        <li className="nav-link"><a href='/'>Hướng dẫn</a></li>
                        <li className="nav-link"><a href='/'>Blog</a></li>
                        <li className="nav-link"><a href='/login' className='active'>Đăng nhập</a></li>
                    </ul>
                </nav>

                <div className="home-content">
                    <div className="left-column">
                        <h1><em>Trợ lý đọc sách của bạn,</em><br />'Đọc <span className='emphasized-text'>Sách</span> Đi'</h1>
                        <p>
                            Chỉ cần tập trung vào việc đọc, chúng tôi sẽ hỗ trợ bạn quản lý mọi thứ khác
                            <br />
                            từ thư viện cá nhân đến tiến độ đọc, để bạn luôn tận hưởng trọn vẹn từng trang sách.
                        </p>
                        <button className='btn primary'><a href='/login'>Bắt đầu</a></button>
                        <button className='btn secondary'>Hướng dẫn</button>
                    </div>
                    <div className='right-column'>
                        {randomBooks.map((book, index) => {
                            const coverPath = book.coverPath.replace(/^\/Users\/vinguyen\/OneDrive\/GitHub\/docsachdi\/public/, '');
                            return (
                                <div
                                    key={index}
                                    className={`box box-${index}`}
                                    style={{ backgroundImage: `url(${coverPath})` }}
                                    data-text={``}
                                >
                                    <div className='info-text'>
                                        <h4>{book.title}</h4>
                                        <p>{book.authorNames}</p>
                                        <Link to={`/login`} className="want-to-read">
                                            <div className="icon">
                                                <FontAwesomeIcon icon={faBookmark} style={{ fontWeight: '100' }} />
                                            </div>
                                            <span>MUỐN ĐỌC</span>
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;

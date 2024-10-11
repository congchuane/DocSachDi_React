import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Library.css';
import BookCard from '../../components/BookCard';
import '../Home/Home.css';
import { useAuth } from '../../contexts/AuthContext';
import { Pagination } from 'antd';
import SearchBar from '../../components/SearchBar';
import { useBooks } from '../../contexts/BookContext';
import HomeLogo from '../../components/HomeLogo';

const SearchResult = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, logout } = useAuth();
    const { searchBooks, searchResults } = useBooks();
    const [currentPage, setCurrentPage] = useState(1);
    const searchTerm = location.state?.searchTerm || '';

    useEffect(() => {
        if (searchTerm) {
            searchBooks(searchTerm);
        }
    }, [searchTerm]);

    const onChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }

    return (
        <div className='container'>
            <div className='glass-container'>
                <nav className="navbar">
                    <HomeLogo />
                    <SearchBar />
                    <ul className="nav-links">
                        <li className="nav-link"><a href='/library'>Hướng dẫn</a></li>
                        <li className="nav-link"><a href='/library'>Blog</a></li>
                        <li className="nav-link"><a href='/' onClick={handleLogout} className='active'>Đăng xuất</a></li>
                        <li className="nav-link">Xin chào, <strong>{username}</strong>!</li>
                    </ul>
                </nav>
                <div className='page-title'>
                    <h2>Kết quả tìm kiếm cho: {searchTerm}</h2>
                </div>
                <div className="wrapper">
                    {searchResults.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </div>
                <Pagination
                    align='center'
                    current={currentPage}
                    onChange={onChange}
                    total={searchResults.length}
                />
            </div>
        </div>
    );
};

export default SearchResult;

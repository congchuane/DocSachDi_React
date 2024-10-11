import React, { useState } from 'react';
import './Library.css';
import BookCard from '../../components/BookCard';
import '../Home/Home.css';
import { useBooks } from '../../contexts/BookContext';
import { Pagination } from 'antd';
import SearchBar from '../../components/SearchBar';
import HomeLogo from '../../components/HomeLogo';
import HomeNav from '../../components/HomeNav';

const Library = () => {
    const { books } = useBooks();
    const [currentPage, setCurrentPage] = useState(1);

    const onChange = (page) => {
        console.log(page);
        setCurrentPage(page);
    };

    return (
        <div className='container'>
            <div className='glass-container'>
                <nav className="navbar">
                    <HomeLogo />
                    <SearchBar />
                    <HomeNav />
                </nav>

                <div className='page-title'>
                    <h2>Dạo thư viện</h2>
                </div>
                <div className="wrapper">
                    {books.map((book, index) => (
                        <BookCard key={index} book={book} />
                    ))}
                </div>
                <Pagination
                    align='center'
                    current={currentPage}
                    onChange={onChange}
                    total={books.length}
                />
            </div>
        </div>
    );
};

export default Library;

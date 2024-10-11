import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [newestBooks, setNewestBooks] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [booklists, setBooklists] = useState({
        uId: null,
        bookWishlist: [],
        bookReadingList: [],
        bookReadList: []
    });
    const [selectedStatus, setSelectedStatus] = useState(null);
    const { uId } = useAuth();

    useEffect(() => {
        const getAllBooks = async () => {
            const response = await axios.get('http://localhost:8080/api/books');
            const updatedBooks = response.data.map(book => {
                return {
                    ...book,
                    coverPath: book.coverPath.replace(/^\/Users\/vinguyen\/OneDrive\/GitHub\/docsachdi\/public/, '')
                };
            });
            setBooks(updatedBooks);
        };
        getAllBooks();
    }, []);

    useEffect(() => {
        const getNewestBooks = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books/newest');
                setNewestBooks(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách sách:', error);
            }
        };
        getNewestBooks();
    }, []);

    const searchBooks = async (searchTerm) => {
        try {
            const response = await axios.get('http://localhost:8080/api/books/search', {
                params: { query: searchTerm },
            });
            const filteredBooks = response.data.map(book => {
                return {
                    ...book,
                    coverPath: book.coverPath.replace(/^\/Users\/vinguyen\/OneDrive\/GitHub\/docsachdi\/public/, '')
                };
            });
            setSearchResults(filteredBooks);
        } catch (error) {
            console.error('Error searching books:', error);
        }
    };

    useEffect(() => {
        if (!uId) return;

        const getUserBooklists = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/user/get-user-books`, {
                    params: { uId: uId }
                });
                setBooklists(response.data);
            } catch (error) {
                console.error('Error fetching user books or book details:', error);
            }
        };
        getUserBooklists();
    }, [uId]);

    const updateBookStatus = async (bookId, status) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/user/update-status-book`, { uId, bookId, status });
            setSelectedStatus(status);
            return res.data;
        } catch (error) {
            console.error('Không thể update book status:', error);
        }
    };

    const checkBookStatus = async (bookId) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/user/check-book-status`, { uId, bookId });
            setSelectedStatus(res.data.bookStatus);
        } catch (error) {
            console.error('Không thể check book status:', error);
        }
    };

    const getBookDetailsById = (bookId) => {
        return books.find(book => book.id == bookId);
    };

    return (
        <BookContext.Provider value={{
            books,
            newestBooks,
            searchBooks,
            searchResults,
            booklists,
            selectedStatus,
            setSelectedStatus,
            updateBookStatus,
            getBookDetailsById,
            checkBookStatus
        }}>
            {children}
        </BookContext.Provider>
    );
};

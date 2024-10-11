import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            navigate('/search', { state: { searchTerm: debouncedSearchTerm } });
        }
    };

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div className="searchbar">
            <input
                className="search"
                placeholder="Tìm kiếm sách..."
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                spellCheck="false"
            />
        </div>
    );
};

export default SearchBar;

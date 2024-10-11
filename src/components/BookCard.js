import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import '../pages/Library/Library.css';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
    const navigate = useNavigate();

    const handleBookDetailClick = () => {
        navigate(`/book/${book.id}`);
    };

    return (
        <div className="card">
            <div className="cover">
                <img src={book.coverPath} alt={book.title} />
            </div>
            <div className="details">
                <h2>{book.title}</h2>
                <p>
                    {book.authorNames.map((author, index) => (
                        <a href='#' key={index} className="author">{author}</a>
                    ))}
                </p>
                <div className="rating">
                    {[...Array(5)].map((_, index) => (
                        <FontAwesomeIcon
                            key={index}
                            icon={
                                index < Math.floor(book.rating)
                                    ? faStar
                                    : index < book.rating
                                        ? faStarHalfAlt
                                        : faStarRegular
                            }
                        />
                    ))}
                    <span><strong>{book.rating}</strong></span>
                </div>
                {/* <div className="tags">
                    {book.tagNames.map((tag, index) => (
                        <a href='#' key={index} className="tag">{tag}</a>
                    ))}
                </div> */}
                <button onClick={handleBookDetailClick}>Chi tiết</button>
            </div>
        </div>
    );
};

export default BookCard;

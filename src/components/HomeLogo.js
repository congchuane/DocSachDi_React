import React from "react";
import image from '../images/image.png';

const HomeLogo = () => {

    return (
        <div className="home-logo">
            <img src={image} alt="image logo" />
            <a href='/' className="logo-link">Đọc<span className='emphasized-text'>Sách</span>Đi</a>
        </div>
    );
};

export default HomeLogo;
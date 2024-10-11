import React from "react";
import { useAuth } from "../contexts/AuthContext";
import pfp from '../images/profile-picture.png';
import adminpfp from '../images/adminpfp.png';
import image from '../images/image.png';

const DashboardNav = () => {
    const { isAdmin, username } = useAuth();

    return (
        <nav>
            <div className="toggle">
                <div className="home-logo">
                    <img src={image} alt="image logo" />
                    <a href="/" className="logo-link">Đọc<span className='emphasized-text'>Sách</span>Đi</a>
                </div>
                <div className="close" id="close-btn">
                    <span className="material-symbols-outlined">close</span>
                </div>
            </div>
            <div className="nav">
                <div className="profile">
                    <div className="info">
                        <p>Xin chào, <span style={{ color: '#db6776', fontWeight: '500', marginLeft: '3px' }}>{username}</span>!</p>
                        <small className="text-muted">
                            {isAdmin ? 'Admin' : 'Reader'}
                        </small>
                    </div>
                    <div className="profile-photo">
                        <img src={isAdmin ? adminpfp : pfp} alt="profile" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default DashboardNav;

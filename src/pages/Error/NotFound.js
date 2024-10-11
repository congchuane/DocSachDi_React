import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className='glass-container error'>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>404 | Not Found</h3>
                    <p>Không tìm thấy trang.</p>
                    <div className="btn primary home" onClick={() => navigate('/')}><HomeOutlined />Về trang chủ</div>
                </div>
            </div>
        </div>

    );
};

export default NotFound;

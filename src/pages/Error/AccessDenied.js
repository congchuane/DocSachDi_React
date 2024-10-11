import { HomeOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AccessDenied = () => {
    const navigate = useNavigate();

    return (
        <div className='container'>
            <div className='glass-container error'>
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                    <h3>Truy cập bị từ chối</h3>
                    <p>Có vẻ như bạn không có quyền hạn để truy cập trang này.</p>
                    <p>Hãy thử đăng nhập, hoặc quay về trang chủ.</p>
                    <div className="btn primary home" onClick={() => navigate('/login')}>Đăng nhập</div>
                    <div className="btn secondary home" onClick={() => navigate('/')}><HomeOutlined />Về trang chủ</div>
                </div>
            </div>
        </div>

    );
};

export default AccessDenied;

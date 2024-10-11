import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faTwitter, faGit } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faEnvelope, faUser, faLock, faKey } from '@fortawesome/free-solid-svg-icons';
import outline from "./assets/img/white-outline.png";
import dots from "./assets/img/dots.png";
import coin from "./assets/img/coin.png";
import spring from "./assets/img/spring.png";
import rocket from "../../images/image.png";
import cloud from "./assets/img/cloud.png";
import "./Login.css";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const col1Ref = useRef(null);
    const loginFormRef = useRef(null);
    const registerFormRef = useRef(null);

    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleLoginClick = () => {
        setIsLogin(true);
        if (col1Ref.current) {
            col1Ref.current.style.borderRadius = "0 30% 20% 0";
        }
    };

    const handleRegisterClick = () => {
        setIsLogin(false);
        if (col1Ref.current) {
            col1Ref.current.style.borderRadius = "0 20% 30% 0";
        }
    };

    const handleLoginRegister = () => {
        if (isRegistering) {
            if (!email.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
                message.error('Vui lòng nhập email hợp lệ');
                return;
            }
            if (!username.match(/^[A-Za-z0-9_]{3,16}$/)) {
                message.error('Tên tài khoản chỉ chứa chữ, số, dấu gạch dưới và có độ dài từ 3 đến 16 ký tự');
                return;
            }
            if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)) {
                message.error('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');
                return;
            }
            register({ email, username, password });
        } else {
            login({ username, password });
        }
        setEmail('');
        setUsername('');
        setPassword('');
        navigate('/');
    };


    return (
        <div className="container">
            <div className="login-form-container">
                <div className="col-1" ref={col1Ref}>
                    <div className="image-layer">
                        <img src={dots} className="form-image dots" alt="dots" />
                        <img src={coin} className="form-image coin" alt="coin" />
                        <img src={spring} className="form-image spring" alt="spring" />
                        <img src={cloud} className="form-image cloud" alt="cloud" />
                        <img src={outline} className="form-image-main" alt="outline" />
                        <img src={rocket} className="form-image rocket" alt="rocket" />
                    </div>
                    <p className="featured-words">
                        Tạo tài khoản miễn phí
                        <br />
                        hoặc đăng nhập để truy cập tốt nhất.
                    </p>
                </div>

                <div className="col-2">
                    <div className="btn-box">
                        <button
                            className={`btn ${isLogin ? "btn-1" : ""}`}
                            onClick={() => { handleLoginClick(); setIsRegistering(false); }}
                        >
                            Đăng nhập
                        </button>
                        <button
                            className={`btn ${!isLogin ? "btn-1" : ""}`}
                            onClick={() => { handleRegisterClick(); setIsRegistering(true); }}
                        >
                            Đăng ký
                        </button>
                    </div>

                    <div
                        className="login-form"
                        style={{
                            left: isLogin ? "50%" : "150%",
                            opacity: isLogin ? 1 : 0,
                            position: "absolute",
                        }}
                        ref={loginFormRef}
                    >
                        <div className="form-title">
                            <span>Đăng Nhập</span>
                        </div>
                        <div className="form-inputs">
                            <div className="input-box">
                                <input type="text" className="input-field" placeholder="" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                <label>Tên tài khoản</label>
                                <span className="icon"><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                            <div className="input-box">
                                <input type="password" className="input-field" placeholder="" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                <label>Mật khẩu</label>
                                <span className="icon"><FontAwesomeIcon icon={faKey} /></span>
                            </div>
                            <div className="forgot-pass">
                                <a href="#">Quên mật khẩu?</a>
                            </div>
                            <div className="input-box">
                                <button className="input-submit" onClick={handleLoginRegister}>
                                    <span>Đăng nhập</span>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ fontWeight: '100' }} />
                                </button>
                            </div>
                        </div>
                        <div className="social-login">
                            <a href="#"><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#"><FontAwesomeIcon icon={faGit} /></a>
                        </div>
                    </div>

                    <div
                        className="register-form"
                        style={{
                            left: isLogin ? "-50%" : "50%",
                            opacity: isLogin ? 0 : 1,
                            position: "absolute",
                        }}
                        ref={registerFormRef}
                    >
                        <div className="form-title">
                            <span>Tạo Tài Khoản</span>
                        </div>
                        <div className="form-inputs">
                            <div className="input-box">
                                <input
                                    type="email"
                                    className="input-field"
                                    placeholder=""
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                                />
                                <label>Email</label>
                                <span className="icon"><FontAwesomeIcon icon={faEnvelope} /></span>
                            </div>
                            <div className="input-box">
                                <input
                                    type="text"
                                    className="input-field"
                                    placeholder=""
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    pattern="^[A-Za-z0-9_]{3,16}$"
                                />
                                <label>Tên tài khoản</label>
                                <span className="icon"><FontAwesomeIcon icon={faUser} /></span>
                            </div>
                            <div className="input-box">
                                <input
                                    type="password"
                                    className="input-field"
                                    placeholder=""
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                                />
                                <label>Mật khẩu</label>
                                <span className="icon"><FontAwesomeIcon icon={faLock} /></span>
                            </div>
                            <div className="input-box">
                                <button className="input-submit" onClick={handleLoginRegister}>
                                    <span>Tạo tài khoản</span>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ fontWeight: '100' }} />
                                </button>
                            </div>
                        </div>
                        <div className="social-login">
                            <a href="#"><FontAwesomeIcon icon={faGoogle} /></a>
                            <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
                            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="#"><FontAwesomeIcon icon={faGit} /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

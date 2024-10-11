import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Sidebar = () => {
    const { isAdmin, logout } = useAuth();
    const location = useLocation();

    return (
        <aside className="sidebar-container">
            <div className="sidebar">
                {isAdmin && (<a href="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
                    <span className="material-symbols-outlined">dashboard</span>
                    <h3>Bảng điều khiển</h3>
                </a>
                )}

                <a href="/booklist" className={location.pathname === "/booklist" ? "active" : ""}>
                    <span className="material-symbols-outlined">bookmark</span>
                    <h3>Danh sách đọc</h3>
                </a>
                <a href="/progress" className={location.pathname === "/progress" ? "active" : ""}>
                    <span className="material-symbols-outlined">insights</span>
                    <h3>Tiến trình đọc</h3>
                </a>
                <a href="#" className={location.pathname === "/updates" ? "active" : ""}>
                    <span className="material-symbols-outlined">mail</span>
                    <h3>Cập nhật</h3>
                    <span className="message-count">28</span>
                </a>

                {isAdmin && (
                    <>
                        <a href="#" className={location.pathname === "/report" ? "active" : ""}>
                            <span className="material-symbols-outlined">report</span>
                            <h3>Báo cáo</h3>
                        </a>
                        <a href="/users" className={location.pathname === "/users" ? "active" : ""}>
                            <span className="material-symbols-outlined">person</span>
                            <h3>Thành viên</h3>
                        </a>
                        <a href="/addbook" className={location.pathname === "/addbook" ? "active" : ""}>
                            <span className="material-symbols-outlined">add</span>
                            <h3>Thêm sách</h3>
                        </a>
                    </>
                )}

                <a href="/" onClick={logout}>
                    <span className="material-symbols-outlined">logout</span>
                    <h3>Đăng xuất</h3>
                </a>
            </div>
        </aside>
    )
}

export default Sidebar;

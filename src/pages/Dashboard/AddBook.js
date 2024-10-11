import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useAuth } from '../../contexts/AuthContext';
import { useBooks } from '../../contexts/BookContext';
import { TeamOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal, Form, Input, Upload, TreeSelect, message } from 'antd';
import Sidebar from '../../components/Sidebar';
import DashboardNav from '../../components/DashboardNav';

const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};

const AddBook = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { newestBooks } = useBooks();
    const { authHeader } = useAuth();
    const [form] = Form.useForm();

    const [genreSelect, setGenreSelect] = useState([]);

    useEffect(() => {
        const getAllTags = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/books/tags');
                const tags = response.data.map((tag) => ({
                    title: tag.name,
                    value: tag.name,
                }));
                setGenreSelect(tags);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };
        getAllTags();
    }, []);

    const [formData, setFormData] = useState({
        title: '',
        authors: [],
        tags: [],
        description: '',
        file: null,
    });

    const onGenreChange = (value) => {
        setFormData((prev) => ({ ...prev, tags: value }));
    };

    const handleCreate = async (values) => {
        const { title, description, authors, file, tags } = formData;
        const data = new FormData();
        data.append('title', title);
        data.append('description', description);
        data.append('file', file);
        data.append('authors', JSON.stringify(authors));
        data.append('tags', JSON.stringify(tags));

        try {
            await axios.post('http://localhost:8080/api/books', data, {
                headers: { 'Content-Type': 'multipart/form-data' },
                'Authorization': authHeader,
            });
            message.success('Thêm sách thành công!');
        } catch (error) {
            message.error('Lỗi khi thêm sách:', error);
            console.error("Error details:", error);
        } finally {
            handleCancel();
        }
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({ ...prev, file: e.file }));
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
        setFormData({
            title: '',
            authors: [],
            tags: [],
            description: '',
            file: null,
        });
    };

    return (
        <>
            <div className="dashboard-container">
                <DashboardNav />

                <Sidebar />

                {/* Main Content */}
                <main className='dash-main'>
                    <div className='main-content'>
                        <div className='dash-main-container'>
                            <div className='btn add-book'>
                                <a onClick={() => setIsModalOpen(true)}>&#43; Thêm sách</a></div>
                            <div>
                                <h1>Sách Mới Cập Nhật</h1>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Tiêu đề</th>
                                        <th>Tác giả</th>
                                        <th>Thể loại</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newestBooks.map((book, index) => (
                                        <tr key={index}>
                                            <td>{book.id}</td>
                                            <td><a href={`/book/${book.id}`}>{book.title}</a></td>
                                            <td>{Array.isArray(book.authorNames) ? book.authorNames.join(", ") : book.authorNames}</td>
                                            <td>{Array.isArray(book.tagNames) ? book.tagNames.join(", ") : book.tagNames}</td>
                                            <td><a href={`/book/${book.id}`}>Chi tiết</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                {/* End of Main Content */}
            </div>

            <Modal
                className="custom-modal"
                title="Thêm Sách Mới"
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okText="Xác nhận"
                cancelText="Huỷ bỏ"
            >
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={handleCreate}
                    style={{ maxWidth: 600 }}
                >
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề!' }]}
                    >
                        <Input
                            value={formData.title}
                            onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                            placeholder="Nhập tiêu đề của sách"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tác giả"
                        name="authors"
                    >
                        <Input
                            type="text"
                            value={formData.authors.join(', ')}
                            onChange={(e) => setFormData((prev) => ({ ...prev, authors: e.target.value.split(',') }))}
                            placeholder="Nhập tên tác giả"
                            prefix={<TeamOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Thể loại"
                        name="tags"
                    >
                        <TreeSelect
                            showSearch
                            style={{ width: '100%' }}
                            value={formData.tags}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Nhập thể loại của sách"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={onGenreChange}
                            treeData={genreSelect}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                    >
                        <Input.TextArea
                            value={formData.description}
                            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                            placeholder="Nhập mô tả hoặc giới thiệu sách"
                            allowClear
                            showCount
                        />
                    </Form.Item>

                    <Form.Item
                        label="Ảnh bìa"
                        name="cover"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            listType="picture-card"
                            beforeUpload={() => false}
                            onChange={handleFileChange}
                        >
                            <div>
                                <PlusOutlined />
                                <div style={{ marginTop: 8 }}>Tải lên</div>
                            </div>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default AddBook;

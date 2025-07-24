import React, { useState } from 'react';
import { Form, Select, Button, DatePicker, Input, message } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import DocumentPreview from '../../components/DocumentPreview/index';

const { Option } = Select;

const UpdateDecisionClean = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      console.log('Form values:', values);
      message.success('Cập nhật quyết định thành công!');
      // Navigate back to case detail
      navigate(`/case/${id}`);
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật quyết định');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="case-detail-root">
      <div className="case-detail-header">
        <div className="case-detail-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img 
              src="/src/pages/image/header.png" 
              alt="VKSND Logo" 
              style={{ height: '60px' }}
            />
            <button
              onClick={() => navigate(`/case/${id}`)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#007bff'
              }}
            >
              ← Quay lại
            </button>
          </div>
        </div>
      </div>

      <div className="case-detail-container">
        <div className="case-detail-content">
          <div className="case-detail-case-header">
            <h2>Cập nhật Quyết định</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
            <div>
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ maxWidth: '600px' }}
              >
                <Form.Item
                  name="decisionType"
                  label="Loại quyết định"
                  rules={[{ required: true, message: 'Vui lòng chọn loại quyết định' }]}
                >
                  <Select placeholder="Chọn loại quyết định">
                    <Option value="khoi-to">Khởi tố vụ án</Option>
                    <Option value="dieu-tra">Điều tra</Option>
                    <Option value="truy-to">Truy tố</Option>
                    <Option value="dinh-chi">Đình chỉ</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  name="decisionNumber"
                  label="Số quyết định"
                  rules={[{ required: true, message: 'Vui lòng nhập số quyết định' }]}
                >
                  <Input placeholder="Nhập số quyết định" />
                </Form.Item>

                <Form.Item
                  name="decisionDate"
                  label="Ngày ra quyết định"
                  rules={[{ required: true, message: 'Vui lòng chọn ngày ra quyết định' }]}
                >
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                  name="description"
                  label="Mô tả"
                >
                  <Input.TextArea rows={4} placeholder="Nhập mô tả chi tiết" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    Cập nhật Quyết định
                  </Button>
                </Form.Item>
              </Form>
            </div>

            <div>
              <DocumentPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDecisionClean;

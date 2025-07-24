import React from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './styles.css';
import DocumentPreview from '../../components/DocumentPreview';

const UpdateDecisionClean = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(true);
  const [selectedDocType, setSelectedDocType] = React.useState(null);
  const [formData, setFormData] = React.useState(null);
  const [shouldAutoPreview, setShouldAutoPreview] = React.useState(false);

  console.log('UpdateDecision component rendered', { id, location });

  React.useEffect(() => {
    // TODO: Fetch case details using id
    console.log('Case ID:', id);
    setLoading(false);
    
    // Set default values for testing
    const defaultDocType = 'verdict';
    const defaultFormData = {
      decisionType: defaultDocType,
      decisionNumber: 'TEST-001',
      decisionDate: '01/07/2025',
      inspectionNumber: 'INS-001'
    };
    
    setSelectedDocType(defaultDocType);
    setFormData(defaultFormData);
    
    // Set form values
    form.setFieldsValue(defaultFormData);

    // Kiểm tra nếu có autoPreview parameter từ URL
    const searchParams = new URLSearchParams(location.search);
    const autoPreview = searchParams.get('autoPreview');
    if (autoPreview === 'true') {
      setShouldAutoPreview(true);
    }
  }, [id, location, form]);

  const handleDocTypeChange = (value) => {
    setSelectedDocType(value);
  };

  const handleFormValuesChange = (_, allValues) => {
    setFormData(allValues);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    
    // Lưu thông tin vào localStorage để sử dụng ở màn print-inspection
    const formData = {
      decisionType: values.decisionType || selectedDocType,
      decisionNumber: values.decisionNumber,
      decisionDate: values.decisionDate,
      inspectionNumber: values.inspectionNumber
    };
    
    localStorage.setItem(`case_${id}_decision_data`, JSON.stringify(formData));
    
    message.success('Đã lưu thông tin quyết định thành công');
    // Thêm timeout nhỏ để hiển thị message trước khi chuyển trang
    setTimeout(() => {
      navigate(`/case/${id}/print-inspection`);
    }, 1000);
  };

  return (
    <div className="update-decision-container">
      {loading && <div>Loading...</div>}
      <div className="header">
        <div className="back-button" onClick={() => navigate(-1)}>
          <ArrowLeftOutlined /> Quay lại chi tiết vụ việc
        </div>
        <h1>Cập nhật Quyết định Giải quyết & Kết thúc Hồ sơ</h1>
        <h2>Vụ việc: Tranh chấp hợp đồng vay tài sản</h2>
      </div>
      <div className="content-layout">

      <div className="form-section">
        <h3>Nhập thông tin Quyết định/Bản án</h3>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          onValuesChange={handleFormValuesChange}
        >
          <div className="form-row">
            <Form.Item
              name="decisionType"
              style={{ width: '48%' }}
            >
              <Select 
                placeholder="Chọn loại quyết định/bản án"
                onChange={handleDocTypeChange}
              >
                <Select.Option value="verdict">Bản án</Select.Option>
                <Select.Option value="dismissal">Quyết định đình chỉ</Select.Option>
                <Select.Option value="agreement">Quyết định công nhận sự thoả thuận</Select.Option>
                <Select.Option value="other">Quyết định khác</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="decisionNumber"
              style={{ width: '48%' }}
            >
              <Input placeholder="Số Quyết định/Bản án" />
            </Form.Item>
          </div>

          <div className="form-row">
            <Form.Item
              name="decisionDate"
              style={{ width: '48%' }}
            >
              <DatePicker 
                placeholder="Ngày Quyết định/Bản án (dd/mm/yyyy)"
                format="DD/MM/YYYY"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              name="inspectionNumber"
              style={{ width: '48%' }}
            >
              <Input placeholder="Số Phiếu kiểm sát QĐ/Bản án" />
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Lưu và In Phiếu kiểm sát
            </Button>
          </Form.Item>
        </Form>
      </div>
            <div className="preview-section">
        <DocumentPreview 
          documentType={selectedDocType} 
          formData={formData} 
          shouldAutoPreview={shouldAutoPreview}
        />
      </div>
    </div>
  </div>
  );
};

export default UpdateDecisionClean;

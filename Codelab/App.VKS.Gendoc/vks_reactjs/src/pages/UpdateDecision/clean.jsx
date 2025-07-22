import React from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const UpdateDecisionClean = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [selectedDocType, setSelectedDocType] = React.useState('verdict');
  const [showPreview, setShowPreview] = React.useState(false);

  React.useEffect(() => {
    console.log('UpdateDecision loaded for case:', id);
    // Set default values
    form.setFieldsValue({
      decisionType: 'verdict',
      decisionNumber: 'TEST-001',
      decisionDate: moment('2025-07-01'),
      inspectionNumber: 'INS-001'
    });
  }, [id, form]);

  const handleDocTypeChange = (value) => {
    setSelectedDocType(value);
    console.log('Selected doc type:', value);
  };

  const handlePreview = () => {
    setShowPreview(true);
    console.log('Preview clicked for type:', selectedDocType);
  };

  const onFinish = (values) => {
    console.log('Form values:', values);
    
    // Lưu dữ liệu vào localStorage
    const formData = {
      decisionType: values.decisionType,
      decisionNumber: values.decisionNumber,
      decisionDate: values.decisionDate ? values.decisionDate.format('DD/MM/YYYY') : '',
      inspectionNumber: values.inspectionNumber
    };
    
    localStorage.setItem(`case_${id}_decision_data`, JSON.stringify(formData));
    
    message.success('Đã lưu thông tin quyết định thành công');
    setTimeout(() => {
      navigate(`/case/${id}/print-inspection`);
    }, 1000);
  };

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 64px)',
      width: '100%',
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '0',
      background: '#fff'
    }}>
      {/* Header */}
      <div style={{ 
        width: '100%',
        marginBottom: '32px',
        padding: '0 40px',
        boxSizing: 'border-box'
      }}>
        <div 
          style={{
            color: '#1890ff',
            cursor: 'pointer',
            marginBottom: '16px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined /> Quay lại chi tiết vụ việc
        </div>
        <h1 style={{ textAlign: 'center' }}>Cập nhật Quyết định Giải quyết & Kết thúc Hồ sơ</h1>
        <h2 style={{ textAlign: 'center' }}>Vụ việc: Tranh chấp hợp đồng vay tài sản</h2>
      </div>

      {/* Content */}
      <div style={{ 
        display: 'flex',
        gap: '24px',
        padding: '0 24px'
      }}>
        {/* Form Section */}
        <div style={{ flex: 1, minWidth: '600px' }}>
          <h3>Nhập thông tin Quyết định/Bản án</h3>
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{
              width: '100%',
              background: '#ffffff',
              padding: '32px',
              borderRadius: '8px',
              boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
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

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
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
              <Button 
                type="primary" 
                htmlType="submit" 
                style={{
                  background: '#00B3B3',
                  borderColor: '#00B3B3',
                  height: '40px',
                  padding: '0 32px'
                }}
              >
                Lưu và In Phiếu kiểm sát
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* Preview Section */}
        <div style={{ 
          flex: 1, 
          minWidth: '600px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)'
        }}>
          <div style={{ padding: '20px' }}>
            <h3>Xem trước tài liệu</h3>
            <div style={{
              width: '100%',
              minHeight: '400px',
              border: '1px solid #d9d9d9',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {selectedDocType ? (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{
                    padding: '20px',
                    background: '#fafafa',
                    borderBottom: '1px solid #d9d9d9',
                    textAlign: 'center'
                  }}>
                    <h4 style={{ fontSize: '20px', color: '#262626', marginBottom: '8px' }}>
                      {selectedDocType === 'verdict' && 'Bản án'}
                      {selectedDocType === 'dismissal' && 'Quyết định đình chỉ'}
                      {selectedDocType === 'agreement' && 'Quyết định công nhận sự thoả thuận'}
                      {selectedDocType === 'other' && 'Quyết định khác'}
                    </h4>
                    <p style={{ color: '#595959', fontSize: '14px', marginBottom: '8px' }}>
                      Tài liệu của vụ việc
                    </p>
                  </div>
                  
                  <div style={{ 
                    flex: 1, 
                    minHeight: '300px', 
                    background: '#fff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {!showPreview ? (
                      <Button 
                        type="primary" 
                        onClick={handlePreview}
                        style={{ marginBottom: '16px' }}
                      >
                        Xem trước
                      </Button>
                    ) : (
                      <div style={{ 
                        width: '100%', 
                        height: '100%', 
                        padding: '16px',
                        textAlign: 'center'
                      }}>
                        <iframe
                          src={`https://docs.google.com/document/d/${
                            selectedDocType === 'verdict' ? '1D2hPI2AhosfRQWLHvIoAzvpndeeZkQIv' :
                            selectedDocType === 'dismissal' ? '1bBMdxbwO4-GXJIEINhhe8Ce_x_vxi2_F' :
                            selectedDocType === 'agreement' ? '1CM_aam-p3Om2XE-r2CqvmRfkfkPVLxsm' :
                            '1IxmT9wfrEfQ22_mVGf6Ie5A92rucR_43'
                          }/preview`}
                          width="100%"
                          height="400px"
                          frameBorder="0"
                          style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}
                          title="Document Preview"
                        />
                        <Button 
                          onClick={() => setShowPreview(false)}
                          style={{ marginTop: '16px' }}
                        >
                          Đóng xem trước
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ 
                  height: '100%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#999'
                }}>
                  <p>Vui lòng chọn loại quyết định/bản án để xem trước tài liệu</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDecisionClean;

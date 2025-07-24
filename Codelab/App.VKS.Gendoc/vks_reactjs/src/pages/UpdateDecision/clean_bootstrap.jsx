import React from 'react';
import { Form, Input, Select, DatePicker, Button, message } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';

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
    <div className="container-fluid" style={{ 
      padding: '20px',
      background: '#fff',
      minHeight: 'calc(100vh - 200px)'
    }}>
      {/* Page Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="text-center">
            <h2 style={{ color: '#4a6cf7', marginBottom: '8px' }}>
              Cập nhật Quyết định Giải quyết & Kết thúc Hồ sơ
            </h2>
            <h4 style={{ color: '#666', fontWeight: 'normal' }}>
              Vụ việc: Tranh chấp hợp đồng vay tài sản
            </h4>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="row">
        {/* Form Section */}
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Nhập thông tin Quyết định/Bản án</h5>
            </div>
            <div className="card-body">
              <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
              >
                <div className="row">
                  <div className="col-md-6">
                    <Form.Item name="decisionType">
                      <Select 
                        placeholder="Chọn loại quyết định/bản án"
                        onChange={handleDocTypeChange}
                        className="w-100"
                      >
                        <Select.Option value="verdict">Bản án</Select.Option>
                        <Select.Option value="dismissal">Quyết định đình chỉ</Select.Option>
                        <Select.Option value="agreement">Quyết định công nhận sự thoả thuận</Select.Option>
                        <Select.Option value="other">Quyết định khác</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  
                  <div className="col-md-6">
                    <Form.Item name="decisionNumber">
                      <Input placeholder="Số Quyết định/Bản án" />
                    </Form.Item>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <Form.Item name="decisionDate">
                      <DatePicker 
                        placeholder="Ngày Quyết định/Bản án (dd/mm/yyyy)"
                        format="DD/MM/YYYY"
                        className="w-100"
                      />
                    </Form.Item>
                  </div>
                  
                  <div className="col-md-6">
                    <Form.Item name="inspectionNumber">
                      <Input placeholder="Số Phiếu kiểm sát QĐ/Bản án" />
                    </Form.Item>
                  </div>
                </div>

                <Form.Item>
                  <Button 
                    type="primary" 
                    htmlType="submit" 
                    size="large"
                    style={{
                      background: '#4a6cf7',
                      borderColor: '#4a6cf7',
                      width: '100%'
                    }}
                  >
                    Lưu và In Phiếu kiểm sát
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="col-lg-6">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Xem trước tài liệu</h5>
            </div>
            <div className="card-body">
              <div className="border rounded p-3" style={{ minHeight: '400px', backgroundColor: '#f8f9fa' }}>
                {selectedDocType ? (
                  <div>
                    <div className="text-center mb-3">
                      <h6 style={{ color: '#4a6cf7' }}>
                        {selectedDocType === 'verdict' && 'Bản án'}
                        {selectedDocType === 'dismissal' && 'Quyết định đình chỉ'}
                        {selectedDocType === 'agreement' && 'Quyết định công nhận sự thoả thuận'}
                        {selectedDocType === 'other' && 'Quyết định khác'}
                      </h6>
                      <small className="text-muted">Tài liệu của vụ việc</small>
                    </div>
                    
                    <div className="text-center">
                      {!showPreview ? (
                        <button 
                          className="btn btn-outline-primary"
                          onClick={handlePreview}
                        >
                          👁️ Xem trước
                        </button>
                      ) : (
                        <div>
                          <div className="border rounded p-3 mb-3" style={{ backgroundColor: '#fff', height: '300px', overflow: 'auto' }}>
                            <iframe
                              src={`https://docs.google.com/document/d/${
                                selectedDocType === 'verdict' ? '1D2hPI2AhosfRQWLHvIoAzvpndeeZkQIv' :
                                selectedDocType === 'dismissal' ? '1bBMdxbwO4-GXJIEINhhe8Ce_x_vxi2_F' :
                                selectedDocType === 'agreement' ? '1CM_aam-p3Om2XE-r2CqvmRfkfkPVLxsm' :
                                '1IxmT9wfrEfQ22_mVGf6Ie5A92rucR_43'
                              }/preview`}
                              width="100%"
                              height="280px"
                              frameBorder="0"
                              title="Document Preview"
                            />
                          </div>
                          <button 
                            className="btn btn-secondary btn-sm"
                            onClick={() => setShowPreview(false)}
                          >
                            Đóng xem trước
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted">
                    <p>Vui lòng chọn loại quyết định/bản án để xem trước tài liệu</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDecisionClean;

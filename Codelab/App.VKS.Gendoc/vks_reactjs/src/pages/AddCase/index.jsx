import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CaseDetail/style.css';

const AddCase = () => {
  const navigate = useNavigate();

  const handleUploadFile = () => {
    navigate('/case/upload');
  };

  const handleManualEntry = () => {
    navigate('/case/manual-entry');
  };

  return (
    <div className="case-detail-root">
      <div className="case-detail-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
          <img 
            src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/ba/Ph%C3%B9_hi%E1%BB%87u_Vi%E1%BB%87n_ki%E1%BB%83m_s%C3%A1t_nh%C3%A2n_d%C3%A2n.svg/1004px-Ph%C3%B9_hi%E1%BB%87u_Vi%E1%BB%87n_ki%E1%BB%83m_s%C3%A1t_nh%C3%A2n_d%C3%A2n.svg.png"
            alt="Logo VKSND"
            style={{ height: '60px', marginRight: '16px' }}
          />
          <h1 className="case-detail-title">Hệ Thống Quản Lý Hồ Sơ Vụ Án</h1>
        </div>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              color: 'white', 
              textDecoration: 'none', 
              fontSize: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ← Quay lại danh sách vụ việc
          </button>
        </div>
      </div>

      <div className="case-detail-container">
        <div className="case-detail-content">
          <div className="text-center mb-5">
            <h2 className="mb-3" style={{ color: '#333', fontWeight: '600' }}>
              Chọn phương thức nhập liệu
            </h2>
            <p className="text-muted">
              Bạn muốn bắt đầu bằng cách tải lên văn bản có sẵn hay nhập thông tin từ đầu?
            </p>
          </div>

          <div className="row">
            {/* Tải lên văn bản */}
            <div className="col-md-6 mb-4">
              <div 
                className="card h-100 text-center"
                style={{ 
                  border: '2px solid #e9ecef', 
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleUploadFile}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#6c5ce7';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(108, 92, 231, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center" style={{ padding: '3rem 2rem' }}>
                  <div className="mb-4">
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        background: '#6c5ce7',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                      }}
                    >
                      <i className="fas fa-file-upload" style={{ fontSize: '32px', color: 'white' }}></i>
                    </div>
                  </div>
                  <h4 className="card-title mb-3" style={{ color: '#333', fontWeight: '600' }}>
                    Tải lên văn bản
                  </h4>
                  <p className="card-text text-muted">
                    Tự động trích xuất thông tin từ file PDF hoặc ảnh.
                  </p>
                </div>
              </div>
            </div>

            {/* Nhập liệu thủ công */}
            <div className="col-md-6 mb-4">
              <div 
                className="card h-100 text-center"
                style={{ 
                  border: '2px solid #e9ecef', 
                  borderRadius: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleManualEntry}
                onMouseOver={(e) => {
                  e.currentTarget.style.borderColor = '#00cec9';
                  e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 206, 201, 0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.borderColor = '#e9ecef';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="card-body d-flex flex-column justify-content-center" style={{ padding: '3rem 2rem' }}>
                  <div className="mb-4">
                    <div 
                      style={{
                        width: '80px',
                        height: '80px',
                        background: '#00cec9',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px'
                      }}
                    >
                      <i className="fas fa-keyboard" style={{ fontSize: '32px', color: 'white' }}></i>
                    </div>
                  </div>
                  <h4 className="card-title mb-3" style={{ color: '#333', fontWeight: '600' }}>
                    Nhập liệu thủ công
                  </h4>
                  <p className="card-text text-muted">
                    Tự điền tất cả thông tin vào biểu mẫu chi tiết.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCase;

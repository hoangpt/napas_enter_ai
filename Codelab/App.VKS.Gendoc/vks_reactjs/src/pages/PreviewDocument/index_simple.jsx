import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../CaseDetail/style.css';

const PreviewDocument = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData || {};
  const [activeTab, setActiveTab] = useState('thong-tin');

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
          <div className="case-detail-case-header">
            <h2 className="case-detail-case-title">Bước 3: Xem trước & Tạo văn bản</h2>
            <div className="case-detail-tabs">
              <button 
                className={`case-detail-tab ${activeTab === 'thong-tin' ? 'active' : ''}`}
                onClick={() => setActiveTab('thong-tin')}
              >
                Thông tin cơ bản
              </button>
              <button 
                className={`case-detail-tab ${activeTab === 'van-ban' ? 'active' : ''}`}
                onClick={() => setActiveTab('van-ban')}
              >
                Văn bản pháp lý
              </button>
              <button 
                className={`case-detail-tab ${activeTab === 'xem-truoc' ? 'active' : ''}`}
                onClick={() => setActiveTab('xem-truoc')}
              >
                Xem trước
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div style={{ padding: '20px' }}>
            {activeTab === 'thong-tin' && (
              <div>
                <h4>Thông tin vụ việc</h4>
                <p>Số KS: {formData.soKS || 'Chưa có'}</p>
                <p>Nguyên đơn: {formData.nguyenDon || 'Chưa có'}</p>
                <p>Bị đơn: {formData.biDon || 'Chưa có'}</p>
              </div>
            )}

            {activeTab === 'van-ban' && (
              <div>
                <h4>Văn bản pháp lý</h4>
                <p>Tạo và quản lý các văn bản pháp lý</p>
              </div>
            )}

            {activeTab === 'xem-truoc' && (
              <div>
                <h4>Xem trước văn bản</h4>
                <div style={{ border: '1px solid #ddd', padding: '20px', minHeight: '400px' }}>
                  <p>Preview nội dung văn bản ở đây</p>
                </div>
              </div>
            )}
          </div>

          <div style={{ textAlign: 'center', padding: '20px' }}>
            <button 
              className="btn btn-success me-3"
              onClick={() => alert('Tạo file thành công!')}
            >
              Tạo file
            </button>
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/')}
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDocument;

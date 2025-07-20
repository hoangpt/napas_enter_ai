import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import fixture from '../CaseList/fixture.js';
import './style.css';

function CaseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('info');

  // Handle action buttons
  const handleEdit = () => {
    alert('Chức năng chỉnh sửa sẽ được triển khai trong phiên bản tiếp theo');
  };

  const handleResolve = () => {
    navigate(`/case/${id}/update-decision`);
  };

  const handlePrint = () => {
    alert('Đang chuẩn bị in hồ sơ...');
    // Simulate printing process
    setTimeout(() => {
      alert('Hồ sơ đã được gửi đến máy in');
    }, 1000);
  };

  // Tìm hồ sơ theo ID từ fixture
  const hoSo = fixture.find(item => item.id === id) || fixture[0];

  if (!hoSo) {
    return (
      <div className="case-detail-root">
        <div className="case-detail-container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: 18, color: '#666' }}>Không tìm thấy hồ sơ</div>
          <Link to="/" style={{ marginTop: 16, display: 'inline-block' }}>← Quay lại danh sách</Link>
        </div>
      </div>
    );
  }

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
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>
            ← Quay lại danh sách vụ việc
          </Link>
        </div>
      </div>
      
      <div className="case-detail-container">
        <div className="case-detail-content">
          {/* Header với số vụ án */}
          <div className="case-detail-case-header">
            <h2 className="case-detail-case-title">Chi Tiết Vụ Việc: {hoSo.soKS}</h2>
            <div className="case-detail-tabs">
              <button 
                className={`case-detail-tab ${activeTab === 'info' ? 'active' : ''}`}
                onClick={() => setActiveTab('info')}
              >
                Thông tin chi tiết
              </button>
              <button 
                className={`case-detail-tab ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                Lịch sử thay đổi
              </button>
            </div>
          </div>

          <div className="case-detail-body">
            {activeTab === 'info' ? (
              <>
                {/* Cột trái - Thông tin chi tiết */}
                <div className="case-detail-left">
                  <div className="case-detail-section">
                    <h3 className="case-detail-section-title">Thông tin chung</h3>
                    
                    <div className="case-detail-info-grid">
                      <div className="case-detail-info-row">
                        <span className="case-detail-label">Địa điểm:</span>
                        <span className="case-detail-value">{hoSo.diaDiem}</span>
                      </div>
                      <div className="case-detail-info-row">
                        <span className="case-detail-label">Ngày thụ lý:</span>
                        <span className="case-detail-value">{hoSo.ngayThuLy}</span>
                      </div>
                      <div className="case-detail-info-row">
                        <span className="case-detail-label">Thời gian:</span>
                        <span className="case-detail-value">{hoSo.thoiGian}</span>
                      </div>
                    </div>

                    <div className="case-detail-description">
                      <span className="case-detail-label">Nội dung tranh chấp:</span>
                      <div className="case-detail-content-text">
                        {hoSo.noiDungTranh}
                      </div>
                    </div>
                  </div>

                  <div className="case-detail-section">
                    <h3 className="case-detail-section-title">Các bên liên quan</h3>
                    
                    {/* Nguyên đơn */}
                    <div className="case-detail-party nguyen-don">
                      <div className="case-detail-party-header">
                        <span className="case-detail-party-type">Nguyên Đơn</span>
                      </div>
                      <div className="case-detail-party-info">
                        <div className="case-detail-info-row">
                          <span className="case-detail-label">Họ và tên:</span>
                          <span className="case-detail-value">{hoSo.nguyenDonInfo?.hoTen || hoSo.nguyenDon}</span>
                        </div>
                        <div className="case-detail-info-row">
                          <span className="case-detail-label">Tuổi:</span>
                          <span className="case-detail-value">{hoSo.nguyenDonInfo?.tuoi || 'N/A'}</span>
                        </div>
                        <div className="case-detail-info-row">
                          <span className="case-detail-label">Địa chỉ:</span>
                          <span className="case-detail-value">{hoSo.nguyenDonInfo?.diaChi || 'Chưa cập nhật'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bị đơn */}
                    <div className="case-detail-party bi-don">
                      <div className="case-detail-party-header">
                        <span className="case-detail-party-type">Bị Đơn</span>
                      </div>
                      <div className="case-detail-party-info">
                        <div className="case-detail-info-row">
                          <span className="case-detail-label">Họ và tên:</span>
                          <span className="case-detail-value">{hoSo.biDonInfo?.hoTen || hoSo.biDon}</span>
                        </div>
                        <div className="case-detail-info-row">
                          <span className="case-detail-label">Tuổi:</span>
                          <span className="case-detail-value">{hoSo.biDonInfo?.tuoi || 'N/A'}</span>
                        </div>
                        <div className="case-detail-info-row">
                          <span className="case-detail-label">Địa chỉ:</span>
                          <span className="case-detail-value">{hoSo.biDonInfo?.diaChi || 'Chưa cập nhật'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cột phải - Ảnh hồ sơ gốc và Hành động */}
                <div className="case-detail-right">
                  {/* Actions Section */}
                  <div className="case-detail-section case-detail-actions-section">
                    <h3 className="case-detail-section-title">Hành động</h3>
                    <div className="case-detail-actions">
                      <button className="case-detail-btn btn-edit" onClick={handleEdit}>
                        <span className="btn-icon">✏️</span>
                        Chỉnh sửa
                      </button>
                      <button className="case-detail-btn btn-resolve" onClick={handleResolve}>
                        <span className="btn-icon">✅</span>
                        Giải quyết
                      </button>
                      <button className="case-detail-btn btn-print" onClick={handlePrint}>
                        <span className="btn-icon">🖨️</span>
                        In lại bộ hồ sơ
                      </button>
                    </div>
                  </div>

                  <div className="case-detail-section">
                    <h3 className="case-detail-section-title">Ảnh hồ sơ gốc</h3>
                    <div className="case-detail-document-preview">
                      <div className="document-placeholder">
                        <div className="document-icon">📄</div>
                        <div className="document-title">Hồ Sơ Gốc 1</div>
                        <div className="document-subtitle">Click để xem chi tiết</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="case-detail-history">
                <div className="case-detail-section">
                  <h3 className="case-detail-section-title">Lịch sử thay đổi</h3>
                  <div className="history-timeline">
                    <div className="history-item">
                      <div className="history-date">15/05/2024 08:30</div>
                      <div className="history-action">Tạo mới hồ sơ vụ việc</div>
                      <div className="history-user">Người thực hiện: Admin</div>
                    </div>
                    <div className="history-item">
                      <div className="history-date">15/05/2024 09:15</div>
                      <div className="history-action">Cập nhật thông tin nguyên đơn</div>
                      <div className="history-user">Người thực hiện: Văn thư</div>
                    </div>
                    <div className="history-item">
                      <div className="history-date">16/05/2024 14:20</div>
                      <div className="history-action">Thêm tài liệu bổ sung</div>
                      <div className="history-user">Người thực hiện: Thẩm phán</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseDetail;

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../CaseDetail/style.css';
import './styles.css';

const UpdateDecisionFinal = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [formData, setFormData] = useState({
    loaiQuyetDinh: '',
    ngayQuyetDinh: '',
    soQuyetDinh: '',
    noiDungQuyetDinh: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Handle form submission logic here
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="case-detail-root">
      {/* Header */}
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
            onClick={handleBack}
            style={{
              color: 'white',
              textDecoration: 'none',
              fontSize: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ← Quay lại chi tiết vụ việc
          </button>
        </div>
      </div>

      <div className="case-detail-container">
        <div className="case-detail-content">
          <div className="card-body p-4">
            {/* Title */}
            <div className="text-center mb-4">
              <h2 style={{ 
                color: '#4472C4', 
                fontWeight: '700', 
                fontSize: '28px',
                marginBottom: '30px'
              }}>
                Cập nhật Quyết định Giải quyết & Kết thúc Hồ sơ
              </h2>
            </div>

            {/* Main Form Container */}
            <div className="main-form-container">
              {/* Left Side - Form Input */}
              <div className="form-section">
                <div className="form-header">
                  <h4 style={{ 
                    color: '#6c5ce7', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    Nhập thông tin Quyết định/Bản án
                  </h4>
                </div>

                <div className="form-content">
                  {/* Loại Quyết định - Combobox */}
                  <div className="mb-3">
                    <label className="form-label">Loại Quyết định</label>
                    <select
                      className="form-select"
                      name="loaiQuyetDinh"
                      value={formData.loaiQuyetDinh}
                      onChange={handleInputChange}
                    >
                      <option value="">Chọn loại quyết định</option>
                      <option value="ban-an">Bản án</option>
                      <option value="quyet-dinh-dinh-chi">Quyết định đình chỉ</option>
                      <option value="quyet-dinh-cong-nhan-thoa-thuan">Quyết định công nhận sự thoả thuận</option>
                      <option value="quyet-dinh-khac">Quyết định khác</option>
                    </select>
                  </div>

                  {/* Ngày Quyết định - Date Input */}
                  <div className="mb-3">
                    <label className="form-label">Ngày Quyết định</label>
                    <input
                      type="date"
                      className="form-control"
                      name="ngayQuyetDinh"
                      value={formData.ngayQuyetDinh}
                      onChange={handleInputChange}
                    />
                  </div>

                  {/* Số Quyết định - Text Input */}
                  <div className="mb-3">
                    <label className="form-label">Số Quyết định</label>
                    <input
                      type="text"
                      className="form-control"
                      name="soQuyetDinh"
                      value={formData.soQuyetDinh}
                      onChange={handleInputChange}
                      placeholder="Nhập số quyết định"
                    />
                  </div>

                  {/* Nội dung Quyết định - Text Input */}
                  <div className="mb-3">
                    <label className="form-label">Nội dung Quyết định</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      name="noiDungQuyetDinh"
                      value={formData.noiDungQuyetDinh}
                      onChange={handleInputChange}
                      placeholder="Nhập nội dung quyết định"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center mt-4">
                    <button 
                      type="button"
                      className="btn btn-primary px-4 py-2"
                      style={{
                        backgroundColor: '#6c5ce7',
                        border: 'none',
                        borderRadius: '25px',
                        fontSize: '16px',
                        fontWeight: '600'
                      }}
                      onClick={handleSubmit}
                    >
                      Cập nhật Quyết định & In
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side - Image Display */}
              <div className="image-section">
                <div className="image-header">
                  <h4 style={{ 
                    color: '#e17055', 
                    fontWeight: '600',
                    marginBottom: '20px',
                    padding: '10px',
                    backgroundColor: '#fff5f5',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    Xem trước tài liệu
                  </h4>
                </div>

                <div className="image-content">
                  <div className="image-container">
                    <img 
                      src="https://via.placeholder.com/400x500/f8f9fa/666666?text=T%C3%A0i+li%E1%BB%87u+Quy%E1%BA%BFt+%C4%91%E1%BB%8Bnh"
                      alt="Preview Document"
                      className="preview-image"
                    />
                    <div className="image-caption">
                      <p style={{ 
                        color: '#666', 
                        fontSize: '14px', 
                        textAlign: 'center',
                        marginTop: '10px'
                      }}>
                        Xem trước tài liệu quyết định
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateDecisionFinal;

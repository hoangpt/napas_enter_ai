import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CaseDetail/style.css';

const ManualEntry = () => {
  const navigate = useNavigate();
  
  // Tạo danh sách năm sinh từ 1930 đến hiện tại
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear; year >= 1930; year--) {
    years.push(year);
  }
  
  const [formData, setFormData] = useState({
    soTBTL: '',
    ngayTBTL: '',
    danSu: '',
    viViec: '',
    nguyenDonTen: '',
    nguyenDonNamSinh: '',
    nguyenDonDiaChi: '',
    biDonTen: '',
    biDonNamSinh: '',
    biDonDiaChi: '',
    ngayLapPhieu: '',
    nguoiVanA: '',
    soPhieuKiemSat: '',
    soQDPhanCong: '',
    soQDLapHoSo: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContinue = () => {
    navigate('/document-preview/0', { state: { formData } });
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
          <div className="text-center mb-4">
            <h2 className="mb-3" style={{ color: '#333', fontWeight: '600' }}>
              Nhập thông tin vụ việc
            </h2>
            <p className="text-muted">
              Vui lòng điền đầy đủ thông tin để tạo hồ sơ vụ việc
            </p>
          </div>

          <div className="card" style={{ borderRadius: '15px', border: '1px solid #e9ecef' }}>
            <div className="card-body p-4">
              {/* Thông tin tự Thông báo Thu lý */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: '#4472C4', fontWeight: '600' }}>
                  Thông tin tự Thông báo Thu lý
                </h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Số TBTL</label>
                    <input
                      type="text"
                      className="form-control"
                      name="soTBTL"
                      value={formData.soTBTL}
                      onChange={handleInputChange}
                      placeholder="Số TBTL"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ngày TBTL</label>
                    <input
                      type="date"
                      className="form-control"
                      name="ngayTBTL"
                      value={formData.ngayTBTL}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Dân sự (DS)</label>
                    <select 
                      className="form-select"
                      name="danSu"
                      value={formData.danSu}
                      onChange={handleInputChange}
                    >
                      <option value="">Dân sự (DS)</option>
                      <option value="DS">Dân sự</option>
                      <option value="HS">Hình sự</option>
                      <option value="HC">Hành chính</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Về việc (Nội dung chính)</label>
                    <input
                      type="text"
                      className="form-control"
                      name="viViec"
                      value={formData.viViec}
                      onChange={handleInputChange}
                      placeholder="Về việc (Nội dung chính)"
                    />
                  </div>
                </div>
              </div>

              {/* Nguyên đơn */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ color: '#6c5ce7', fontWeight: '600', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
                  Nguyên đơn
                </h6>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="nguyenDonTen"
                      value={formData.nguyenDonTen}
                      onChange={handleInputChange}
                      placeholder="Tên"
                      style={{ height: '58px' }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <select
                      className="form-select"
                      name="nguyenDonNamSinh"
                      value={formData.nguyenDonNamSinh}
                      onChange={handleInputChange}
                      style={{ height: '58px' }}
                    >
                      <option value="">Năm sinh</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <textarea
                      className="form-control"
                      name="nguyenDonDiaChi"
                      value={formData.nguyenDonDiaChi}
                      onChange={handleInputChange}
                      placeholder="Địa chỉ"
                      style={{ height: '58px', resize: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Bị đơn */}
              <div className="mb-4">
                <h6 className="mb-3" style={{ color: '#e17055', fontWeight: '600', backgroundColor: '#fff5f5', padding: '10px', borderRadius: '8px' }}>
                  Bị đơn
                </h6>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="biDonTen"
                      value={formData.biDonTen}
                      onChange={handleInputChange}
                      placeholder="Tên"
                      style={{ height: '58px' }}
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <select
                      className="form-select"
                      name="biDonNamSinh"
                      value={formData.biDonNamSinh}
                      onChange={handleInputChange}
                      style={{ height: '58px' }}
                    >
                      <option value="">Năm sinh</option>
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <textarea
                      className="form-control"
                      name="biDonDiaChi"
                      value={formData.biDonDiaChi}
                      onChange={handleInputChange}
                      placeholder="Địa chỉ"
                      style={{ height: '58px', resize: 'none' }}
                    />
                  </div>
                </div>
              </div>

              {/* Thông tin Lập phiếu & Quyết định VKS */}
              <div className="mb-4">
                <h5 className="mb-3" style={{ color: '#4472C4', fontWeight: '600' }}>
                  Thông tin Lập phiếu & Quyết định VKS
                </h5>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Ngày lập phiếu</label>
                    <input
                      type="date"
                      className="form-control"
                      name="ngayLapPhieu"
                      value={formData.ngayLapPhieu}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Người Văn A</label>
                    <select 
                      className="form-select"
                      name="nguoiVanA"
                      value={formData.nguoiVanA}
                      onChange={handleInputChange}
                    >
                      <option value="">Người Văn A</option>
                      <option value="Nguyễn Văn A">Nguyễn Văn A</option>
                      <option value="Trần Văn B">Trần Văn B</option>
                      <option value="Lê Thị C">Lê Thị C</option>
                    </select>
                  </div>
                  <div className="col-md-4 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="soPhieuKiemSat"
                      value={formData.soPhieuKiemSat}
                      onChange={handleInputChange}
                      placeholder="Số Phiều kiểm sát thụ lý"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="soQDPhanCong"
                      value={formData.soQDPhanCong}
                      onChange={handleInputChange}
                      placeholder="Số QD phân công"
                    />
                  </div>
                  <div className="col-md-4 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="soQDLapHoSo"
                      value={formData.soQDLapHoSo}
                      onChange={handleInputChange}
                      placeholder="Số QD lập hồ sơ"
                    />
                  </div>
                </div>
              </div>

              {/* Button */}
              <div className="text-center mt-4">
                <button 
                  type="button"
                  className="btn btn-primary px-5 py-2"
                  style={{
                    backgroundColor: '#6c5ce7',
                    border: 'none',
                    borderRadius: '25px',
                    fontSize: '16px',
                    fontWeight: '600'
                  }}
                  onClick={handleContinue}
                >
                  Tiếp tục & Tạo văn bản
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualEntry;

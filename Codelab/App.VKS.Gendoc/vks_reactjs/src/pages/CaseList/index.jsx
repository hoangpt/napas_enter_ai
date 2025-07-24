import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import '../CaseDetail/style.css';
import { useHoSo } from '../../providers/HoSoProvider.jsx';

function CaseList() {
  const { hoSoList: data, loading, error } = useHoSo();

  if (loading) {
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
        </div>
        <div className="case-detail-container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: 18, color: '#666' }}>Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (error) {
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
        </div>
        <div className="case-detail-container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: 18, color: '#e74c3c' }}>Lỗi: {error}</div>
        </div>
      </div>
    );
  }

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
      </div>
      
      <div className="case-detail-container">
        <div className="case-detail-content">
          <div className="casel-titlebar">
            <h2 className="casel-title">Danh sách vụ việc</h2>
            <Link to="/add-case">
              <button className="casel-add-btn">Thêm vụ việc mới</button>
            </Link>
          </div>
          <div className="table-wrapper">
            <table className="casel-table">
          <thead>
            <tr>
              <th>SỐ THỤ LÝ</th>
              <th>NGUYÊN ĐƠN</th>
              <th>BỊ ĐƠN</th>
              <th>NGÀY THỤ LÝ</th>
              <th>TÌNH TRẠNG</th>
              <th>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '32px', color: '#666', fontSize: 18 }}>
                  Không có dữ liệu. Sử dụng button upload
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={idx}>
                  <td>{row.soKS}</td>
                  <td>{row.nguyenDon}</td>
                  <td>{row.biDon}</td>
                  <td>{row.ngayThuLy}</td>
                  <td>
                    <span className={row.tinhTrangType === 'processing' ? 'casel-status-processing' : 'casel-status-done'}>
                      {row.tinhTrang}
                    </span>
                  </td>
                  <td>
                    <Link to={`/case/${row.id || idx}`} className="casel-link">Xem chi tiết</Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseList;

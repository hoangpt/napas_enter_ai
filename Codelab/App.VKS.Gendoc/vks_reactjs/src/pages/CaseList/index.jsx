import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { useHoSo } from '../../providers/HoSoProvider.jsx';

function CaseList() {
  const { hoSoList: data, loading, error } = useHoSo();

  if (loading) {
    return (
      <div className="casel-root">
        <div className="casel-container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: 18, color: '#666' }}>Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="casel-root">
        <div className="casel-container" style={{ textAlign: 'center', padding: '100px 0' }}>
          <div style={{ fontSize: 18, color: '#e74c3c' }}>Lỗi: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="casel-root">
      <h1 className="casel-header">Hệ Thống Quản Lý Hồ Sơ Vụ Án</h1>
      <div className="casel-container">
        <div className="casel-titlebar">
          <h2 className="casel-title">Danh sách vụ việc</h2>
          <Link to="/upload">
            <button className="casel-add-btn">Thêm vụ việc mới</button>
          </Link>
        </div>
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
            {data.map((row, idx) => (
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
                  <Link to="#" className="casel-link">Xem chi tiết</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CaseList;

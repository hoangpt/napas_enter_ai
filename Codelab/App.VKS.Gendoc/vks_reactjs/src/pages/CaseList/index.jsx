import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

function CaseList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('./pages/CaseList/fixture.json')
      .then((res) => res.json())
      .then(setData);
  }, []);

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

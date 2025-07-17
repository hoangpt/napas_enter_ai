import React from 'react';
import { Link } from 'react-router-dom';

const mockData = [
  {
    soKS: '155/TB-TLVA',
    nguyenDon: 'Ông Nguyễn Văn A',
    biDon: 'Bà Trần Thị B',
    ngayThuLy: '15/05/2024',
    tinhTrang: 'Đang xử lý',
    tinhTrangType: 'processing',
  },
  {
    soKS: '156/TB-TLVA',
    nguyenDon: 'Công ty Cổ phần X',
    biDon: 'Công ty TNHH Y',
    ngayThuLy: '20/05/2024',
    tinhTrang: 'Đã hoàn tất',
    tinhTrangType: 'done',
  },
];

function CaseList() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', padding: '32px 0' }}>
      <h1 style={{ textAlign: 'center', color: '#2563eb', fontWeight: 700, fontSize: 40, marginBottom: 32, letterSpacing: 1 }}>
        Hệ Thống Quản Lý Hồ Sơ Vụ Án
      </h1>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 2px 16px #e0e7ef' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: '#222' }}>Danh sách vụ việc</h2>
          <Link to="/upload">
            <button style={{ background: '#2563eb', color: '#fff', fontWeight: 600, fontSize: 20, border: 'none', borderRadius: 10, padding: '12px 32px', cursor: 'pointer' }}>
              Thêm vụ việc mới
            </button>
          </Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 18, background: '#fff', borderRadius: 12, overflow: 'hidden' }}>
          <thead style={{ background: '#f5f6fa', fontWeight: 700 }}>
            <tr>
              <th style={{ padding: 16, textAlign: 'left', color: '#222' }}>SỐ THỤ LÝ</th>
              <th style={{ padding: 16, textAlign: 'left', color: '#222' }}>NGUYÊN ĐƠN</th>
              <th style={{ padding: 16, textAlign: 'left', color: '#222' }}>BỊ ĐƠN</th>
              <th style={{ padding: 16, textAlign: 'left', color: '#222' }}>NGÀY THỤ LÝ</th>
              <th style={{ padding: 16, textAlign: 'left', color: '#222' }}>TÌNH TRẠNG</th>
              <th style={{ padding: 16, textAlign: 'left', color: '#222' }}>THAO TÁC</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: 16 }}>{row.soKS}</td>
                <td style={{ padding: 16 }}>{row.nguyenDon}</td>
                <td style={{ padding: 16 }}>{row.biDon}</td>
                <td style={{ padding: 16 }}>{row.ngayThuLy}</td>
                <td style={{ padding: 16 }}>
                  {row.tinhTrangType === 'processing' ? (
                    <span style={{ background: '#f7f6e7', color: '#b59d1b', padding: '4px 16px', borderRadius: 16, fontWeight: 600, fontSize: 16 }}>
                      {row.tinhTrang}
                    </span>
                  ) : (
                    <span style={{ background: '#e6f7ed', color: '#1aaf5d', padding: '4px 16px', borderRadius: 16, fontWeight: 600, fontSize: 16 }}>
                      {row.tinhTrang}
                    </span>
                  )}
                </td>
                <td style={{ padding: 16 }}>
                  <Link to="#" style={{ color: '#2563eb', fontWeight: 600, fontSize: 18, textDecoration: 'underline' }}>
                    Xem chi tiết
                  </Link>
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

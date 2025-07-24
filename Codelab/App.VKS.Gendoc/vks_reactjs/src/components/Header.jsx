import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Kiểm tra xem có phải đang ở trang chủ không
  const isHomePage = location.pathname === '/';
  
  const handleBack = () => {
    navigate(-1); // Quay lại trang trước đó
  };

  return (
    <header style={{
      background: '#4472C4',
      color: 'white',
      padding: '15px 0',
      marginBottom: '0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div className="container-fluid">
        <div className="d-flex align-items-center justify-content-start" style={{ minHeight: '70px' }}>
          <div style={{ marginRight: '20px', marginLeft: '20px' }}>
            <img 
              src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/ba/Ph%C3%B9_hi%E1%BB%87u_Vi%E1%BB%87n_ki%E1%BB%83m_s%C3%A1t_nh%C3%A2n_d%C3%A2n.svg/1004px-Ph%C3%B9_hi%E1%BB%87u_Vi%E1%BB%87n_ki%E1%BB%83m_s%C3%A1t_nh%C3%A2n_d%C3%A2n.svg.png"
              alt="Logo VKSND"
              style={{
                width: '60px',
                height: '60px',
                objectFit: 'contain'
              }}
            />
          </div>
          <div className="text-center flex-grow-1">
            <h1 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '0 0 8px 0',
              color: 'white'
            }}>
              Hệ Thống Quản Lý Hồ Sơ Vụ Án
            </h1>
            {!isHomePage && (
              <div style={{
                fontSize: '14px',
                color: 'white',
                cursor: 'pointer',
                textDecoration: 'none'
              }}
              onClick={handleBack}
              onMouseOver={(e) => {
                e.target.style.textDecoration = 'underline';
              }}
              onMouseOut={(e) => {
                e.target.style.textDecoration = 'none';
              }}>
                ← Quay lại danh sách vụ việc
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

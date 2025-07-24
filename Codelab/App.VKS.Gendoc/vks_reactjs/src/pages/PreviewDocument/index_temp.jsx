import React from 'react';
import { useNavigate } from 'react-router-dom';

const PreviewDocument = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Preview Document Page</h1>
      <p>This is the preview document page.</p>
      <button onClick={() => navigate('/')}>
        Quay lại trang chủ
      </button>
    </div>
  );
};

export default PreviewDocument;

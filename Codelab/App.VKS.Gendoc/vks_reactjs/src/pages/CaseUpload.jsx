import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CaseDetail/style.css';

function CaseUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extractedData, setExtractedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isExtracted, setIsExtracted] = useState(false); // Track if extraction is completed

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    setFile(f);
    if (f) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(f);
    } else {
      setPreview(null);
    }
    // Reset extracted data when file changes
    setExtractedData(null);
    setError(null);
    setIsExtracted(false); // Reset extraction status
  };

  const handleExtractInfo = async () => {
    if (!file) {
      setError('Vui lòng chọn file trước khi bóc tách thông tin');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('use_fixtures', 'true');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/upload/extract-only`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setExtractedData(result.extracted_data);
      setIsExtracted(true); // Mark extraction as completed
    } catch (err) {
      console.error('Error extracting data:', err);
      setError(err.message || 'Có lỗi xảy ra khi bóc tách thông tin');
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = () => {
    // Navigate to document preview with ID = 1
    navigate('/document-preview/1');
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
          <Link to="/" style={{ color: 'white', textDecoration: 'none', fontSize: '14px' }}>
            ← Quay lại danh sách vụ việc
          </Link>
        </div>
      </div>

      <div className="case-detail-container">
        <div className="case-detail-content">
          <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h2 style={{ color: '#2563eb', fontWeight: 700, fontSize: 32, textAlign: 'center', marginBottom: 32, letterSpacing: 1 }}>
              Thêm Vụ Việc Mới & Bóc Tách Thông Tin
            </h2>
        <label htmlFor="file-upload" style={{ display: 'block', border: '2px dashed #b3b3b3', borderRadius: 12, padding: 36, textAlign: 'center', cursor: 'pointer', marginBottom: 32, background: '#fafbfc', fontSize: 20, color: '#2563eb', fontWeight: 600, width: '60vw', maxWidth: 800 }}>
          Nhấn để chọn file ảnh
          <div style={{ color: '#888', fontSize: 15, fontWeight: 400, marginTop: 8 }}>PNG, JPG, JPEG</div>
          <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
        </label>
        {preview && (
          <div style={{ display: 'flex', gap: '32px', margin: '32px 0', width: '90vw', maxWidth: 1200, alignItems: 'flex-start' }}>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 12 }}>Ảnh xem trước:</div>
              <img src={preview} alt="preview" style={{ maxWidth: '100%', maxHeight: 420, border: '1px solid #eee', borderRadius: 10, boxShadow: '0 2px 8px #e0e7ef', width: 'auto' }} />
            </div>
            {extractedData && (
              <div style={{ flex: 1, padding: '20px', background: '#f8f9fa', borderRadius: 10, border: '1px solid #e5e7eb' }}>
                <h3 style={{ color: '#2563eb', marginBottom: 16, fontSize: 20, fontWeight: 600 }}>Thông tin bóc tách:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {extractedData.ho_so?.ma && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ minWidth: 120, color: '#374151' }}>Mã số:</strong>
                      <span style={{ color: '#6b7280' }}>{extractedData.ho_so.ma}</span>
                    </div>
                  )}
                  {extractedData.nguyen_don?.ten && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ minWidth: 120, color: '#374151' }}>Nguyên đơn:</strong>
                      <span style={{ color: '#6b7280' }}>{extractedData.nguyen_don.ten}</span>
                    </div>
                  )}
                  {extractedData.nguyen_don?.dia_chi && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ minWidth: 120, color: '#374151' }}>Địa chỉ ND:</strong>
                      <span style={{ color: '#6b7280' }}>{extractedData.nguyen_don.dia_chi}</span>
                    </div>
                  )}
                  {extractedData.bi_don?.ten && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ minWidth: 120, color: '#374151' }}>Bị đơn:</strong>
                      <span style={{ color: '#6b7280' }}>{extractedData.bi_don.ten}</span>
                    </div>
                  )}
                  {extractedData.bi_don?.dia_chi && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ minWidth: 120, color: '#374151' }}>Địa chỉ BĐ:</strong>
                      <span style={{ color: '#6b7280' }}>{extractedData.bi_don.dia_chi}</span>
                    </div>
                  )}
                  {extractedData.ho_so?.ngay_gio && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ minWidth: 120, color: '#374151' }}>Ngày giờ:</strong>
                      <span style={{ color: '#6b7280' }}>{new Date(extractedData.ho_so.ngay_gio).toLocaleString('vi-VN')}</span>
                    </div>
                  )}
                  {extractedData.ho_so?.dia_diem && (
                    <div style={{ display: 'flex', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ minWidth: 120, color: '#374151' }}>Địa điểm:</strong>
                      <span style={{ color: '#6b7280' }}>{extractedData.ho_so.dia_diem}</span>
                    </div>
                  )}
                  {extractedData.ho_so?.noi_dung_vu_viec && (
                    <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #e5e7eb', paddingBottom: 8 }}>
                      <strong style={{ color: '#374151', marginBottom: 4 }}>Nội dung vụ việc:</strong>
                      <span style={{ color: '#6b7280', lineHeight: 1.5 }}>{extractedData.ho_so.noi_dung_vu_viec}</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        {error && (
          <div style={{ color: '#dc2626', background: '#fef2f2', padding: '12px 16px', borderRadius: 8, margin: '16px 0', border: '1px solid #fecaca', width: '60vw', maxWidth: 800 }}>
            {error}
          </div>
        )}
        <div style={{ display: 'flex', gap: '16px', marginTop: 16, justifyContent: 'center' }}>
          <button 
            onClick={handleExtractInfo}
            disabled={loading || !file}
            style={{ 
              background: loading || !file ? '#9ca3af' : '#2563eb', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 10, 
              padding: '16px 32px', 
              fontWeight: 700, 
              fontSize: 18, 
              boxShadow: '0 2px 8px #e0e7ef', 
              letterSpacing: 1,
              cursor: loading || !file ? 'not-allowed' : 'pointer',
              minWidth: '200px'
            }}
          >
            {loading ? 'Đang bóc tách...' : 'Bóc tách thông tin'}
          </button>
          
          <button 
            onClick={handleContinue}
            disabled={!isExtracted || !extractedData} // Enable only when extraction is successful AND data is available
            style={{ 
              background: (!isExtracted || !extractedData) ? '#9ca3af' : '#10b981', 
              color: '#fff', 
              border: 'none', 
              borderRadius: 10, 
              padding: '16px 32px', 
              fontWeight: 700, 
              fontSize: 18, 
              boxShadow: '0 2px 8px #e0e7ef', 
              letterSpacing: 1,
              cursor: (!isExtracted || !extractedData) ? 'not-allowed' : 'pointer',
              minWidth: '200px'
            }}
          >
            Tiếp tục
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaseUpload;

import React, { useState } from 'react';

function CaseUpload() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f6fa', padding: '32px 0' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', background: '#fff', borderRadius: 16, padding: 40, boxShadow: '0 2px 16px #e0e7ef' }}>
        <h1 style={{ color: '#2563eb', fontWeight: 700, fontSize: 32, textAlign: 'center', marginBottom: 32, letterSpacing: 1 }}>
          Thêm Vụ Việc Mới & Bóc Tách Thông Tin
        </h1>
        <label htmlFor="file-upload" style={{ display: 'block', border: '2px dashed #b3b3b3', borderRadius: 12, padding: 36, textAlign: 'center', cursor: 'pointer', marginBottom: 32, background: '#fafbfc', fontSize: 20, color: '#2563eb', fontWeight: 600 }}>
          Nhấn để chọn file ảnh
          <div style={{ color: '#888', fontSize: 15, fontWeight: 400, marginTop: 8 }}>PNG, JPG, JPEG</div>
          <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
        </label>
        {preview && (
          <div style={{ margin: '32px 0', textAlign: 'center' }}>
            <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 12 }}>Ảnh xem trước:</div>
            <img src={preview} alt="preview" style={{ maxWidth: 350, maxHeight: 420, border: '1px solid #eee', borderRadius: 10, boxShadow: '0 2px 8px #e0e7ef' }} />
          </div>
        )}
        <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 0', fontWeight: 700, fontSize: 22, marginTop: 16, width: '100%', boxShadow: '0 2px 8px #e0e7ef', letterSpacing: 1 }}>
          Bóc tách thông tin
        </button>
      </div>
    </div>
  );
}

export default CaseUpload;

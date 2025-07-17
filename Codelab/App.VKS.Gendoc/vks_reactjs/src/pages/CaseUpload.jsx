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
      <div style={{ width: '100vw', margin: 0, background: '#fff', borderRadius: 0, padding: '40px 0', boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ color: '#2563eb', fontWeight: 700, fontSize: 32, textAlign: 'center', marginBottom: 32, letterSpacing: 1, width: '100vw' }}>
          Thêm Vụ Việc Mới & Bóc Tách Thông Tin
        </h1>
        <label htmlFor="file-upload" style={{ display: 'block', border: '2px dashed #b3b3b3', borderRadius: 12, padding: 36, textAlign: 'center', cursor: 'pointer', marginBottom: 32, background: '#fafbfc', fontSize: 20, color: '#2563eb', fontWeight: 600, width: '60vw', maxWidth: 800 }}>
          Nhấn để chọn file ảnh
          <div style={{ color: '#888', fontSize: 15, fontWeight: 400, marginTop: 8 }}>PNG, JPG, JPEG</div>
          <input id="file-upload" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
        </label>
        {preview && (
          <div style={{ margin: '32px 0', textAlign: 'center', width: '100vw' }}>
            <div style={{ fontWeight: 500, fontSize: 18, marginBottom: 12 }}>Ảnh xem trước:</div>
            <img src={preview} alt="preview" style={{ maxWidth: 600, maxHeight: 420, border: '1px solid #eee', borderRadius: 10, boxShadow: '0 2px 8px #e0e7ef', width: 'auto' }} />
          </div>
        )}
        <button style={{ background: '#2563eb', color: '#fff', border: 'none', borderRadius: 10, padding: '16px 0', fontWeight: 700, fontSize: 22, marginTop: 16, width: '60vw', maxWidth: 800, boxShadow: '0 2px 8px #e0e7ef', letterSpacing: 1 }}>
          Bóc tách thông tin
        </button>
      </div>
    </div>
  );
}

export default CaseUpload;

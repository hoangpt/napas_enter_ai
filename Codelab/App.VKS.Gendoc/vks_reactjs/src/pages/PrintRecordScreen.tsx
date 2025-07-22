import React, { useState } from "react";
import { TextField, Typography } from "@mui/material";
import './CaseDetail/style.css';

const PrintRecordScreen: React.FC = () => {
  const [form, setForm] = useState({
    thoiHan: "",
    hinhThuc: "",
    noiDung: "",
    viPhamKhac: "",
  });
  const [showDocx, setShowDocx] = useState(false);
  const [selectedDocumentType, setSelectedDocumentType] = useState("phieu-kiem-sat-thu-ly");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreviewDocx = () => {
    setShowDocx(true);
  };

  const handleDocumentTypeChange = (docType: string) => {
    setSelectedDocumentType(docType);
    setShowDocx(false); // Reset preview when changing document type
  };

  const getDocumentTitle = () => {
    switch (selectedDocumentType) {
      case "phieu-kiem-sat-thu-ly":
        return "Tạo Phiếu Kiểm Sát Thu Lý";
      case "quyet-dinh-phan-cong-ksv":
        return "Tạo Quyết Định Phân Công KSV";
      case "quyet-dinh-lap-ho-so":
        return "Tạo Quyết Định Lập Hồ Sơ";
      default:
        return "Tạo Phiếu Kiểm Sát";
    }
  };

  return (
    <div className="case-detail-root">
      {/* Header */}
      <div className="case-detail-header">
        <h1 className="case-detail-title">{getDocumentTitle()}</h1>
      </div>

      {/* Document Type Selection */}
      <div className="case-detail-container">
        <div className="case-detail-content">
          <div className="case-detail-section" style={{ marginBottom: '20px' }}>
            <h3 className="case-detail-section-title">Chọn văn bản:</h3>
            <div className="document-type-selection">
              <button 
                className={`document-type-btn ${selectedDocumentType === "phieu-kiem-sat-thu-ly" ? "active" : ""}`}
                onClick={() => handleDocumentTypeChange("phieu-kiem-sat-thu-ly")}
              >
                Phiếu Kiểm sát Thu lý
              </button>
              <button 
                className={`document-type-btn ${selectedDocumentType === "quyet-dinh-phan-cong-ksv" ? "active" : ""}`}
                onClick={() => handleDocumentTypeChange("quyet-dinh-phan-cong-ksv")}
              >
                Quyết định Phân công KSV
              </button>
              <button 
                className={`document-type-btn ${selectedDocumentType === "quyet-dinh-lap-ho-so" ? "active" : ""}`}
                onClick={() => handleDocumentTypeChange("quyet-dinh-lap-ho-so")}
              >
                Quyết định Lập hồ sơ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="case-detail-container">
        <div className="case-detail-content">
          {/* Content Body */}
          <div className="case-detail-body">
            {/* Left Column - Form Input */}
            <div className="case-detail-left">
              <div className="case-detail-section">
                <h3 className="case-detail-section-title">Nhập nội dung hồ sơ</h3>
                <div className="case-detail-info-grid">
                  <TextField
                    label="Thời hạn"
                    name="thoiHan"
                    value={form.thoiHan}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Hình thức"
                    name="hinhThuc"
                    value={form.hinhThuc}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                  />
                  <TextField
                    label="Nội dung"
                    name="noiDung"
                    value={form.noiDung}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={3}
                  />
                  <TextField
                    label="Vi phạm khác"
                    name="viPhamKhac"
                    value={form.viPhamKhac}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={2}
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="case-detail-right">
              <div className="case-detail-section">
                <h3 className="case-detail-section-title">Preview hồ sơ</h3>
                <div className="case-detail-actions" style={{ marginBottom: '16px' }}>
                  <button 
                    className="case-detail-btn btn-print" 
                    onClick={handlePreviewDocx}
                  >
                    <span className="btn-icon">📄</span>
                    Xem trước DOCX
                  </button>
                </div>
                
                {!showDocx ? (
                  <div className="case-detail-content-text">
                    {selectedDocumentType === "phieu-kiem-sat-thu-ly" && (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>VIỆN KSND TỈNH HÒA BÌNH</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>VIỆN KSND THÀNH PHỐ HÒA BÌNH</Typography>
                        <Typography sx={{ mb: 1 }}>Số: {'{SQD}'} /PKS-VKS-HNGĐ</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
                        <Typography sx={{ mb: 2 }}>Độc lập – Tự do – Hạnh phúc</Typography>
                        <Typography sx={{ mb: 1 }}>TP. Hòa Bình, {'{NgayQD}'}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>PHIẾU KIỂM SÁT</Typography>
                        <Typography sx={{ mb: 2 }}>Quyết định của Tòa án cấp sơ thẩm</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mt: 2, mb: 2 }}>Phần I: Dùng cho Viện kiểm sát cấp sơ thẩm</Typography>
                        <Typography sx={{ mb: 2, lineHeight: 1.6 }}>
                          Ngày 10 Tháng Sáu 2025 Viện kiểm sát nhân dân thành phố Hòa Bình nhận được Quyết định công nhận thuận tình ly hôn và sự thỏa thuận của các đương sự số:  35 ngày 24 tháng 01 năm 2025 của Tòa án nhân dân thành phố Hòa Bình giải quyết vụ án hôn nhân gia đình về việc K.I.Y ly hôn giữa các đương sự:
                        </Typography>
                        <Typography sx={{ mb: 1 }}><strong>Nguyên đơn:</strong> {form.noiDung}</Typography>
                        <Typography sx={{ mb: 1 }}>Trụ tại: Tổ 18, phường Tân Thịnh, thành phố Hòa Bình, tỉnh Hòa Bình</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Bị đơn:</strong> anh Vũ Đình Tài, sinh năm 1995</Typography>
                        <Typography sx={{ mb: 2 }}>Địa chỉ: thôn Nhân Trạch, xã Yên Thắng, Ý Yên, Nam Định</Typography>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Kiểm sát Quyết định nêu trên thấy:</Typography>
                        <Typography sx={{ mb: 1 }}>1. Về thời hạn Tòa án gửi Quyết định</Typography>
                        <Typography sx={{ mb: 1, pl: 2, color: '#4472c4', fontWeight: 'bold' }}>{form.thoiHan}</Typography>
                        <Typography sx={{ mb: 1 }}>2. Về hình thức của Quyết định</Typography>
                        <Typography sx={{ mb: 1, pl: 2, color: '#4472c4', fontWeight: 'bold' }}>{form.hinhThuc}</Typography>
                        <Typography sx={{ mb: 1 }}>3. Về nội dung của Quyết định: Đảm bảo.</Typography>
                        <Typography sx={{ mb: 1 }}>4. Vi phạm khác: <span style={{color: '#e74c3c', fontWeight: 'bold'}}>{form.viPhamKhac}</span></Typography>
                        <Typography sx={{ mb: 1 }}>5. Đề xuất của Kiểm sát viên/Kiểm tra viên Đồng ý nội dung quyết định. Đã tổng hợp vi phạm ban hành kiến nghị về việc gửi chậm QĐ</Typography>
                        <Typography sx={{ mb: 1 }}>6. Ý kiến của lãnh đạo đơn vị</Typography>
                        <Typography sx={{ mb: 3 }}>……………………………………………………………………….</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'right' }}>Ngày 18 Tháng Sáu 2025</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'right', fontWeight: 'bold' }}>LÃNH ĐẠO ĐƠN VỊ</Typography>
                        <Typography sx={{ mb: 2, textAlign: 'right' }}>Nguyễn Thị Ước</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'right', fontWeight: 'bold' }}>KIỂM SÁT VIÊN (Signature)</Typography>
                        <Typography sx={{ textAlign: 'right' }}>Nguyễn Văn A</Typography>
                      </>
                    )}

                    {selectedDocumentType === "quyet-dinh-phan-cong-ksv" && (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>VIỆN KSND TỈNH HÒA BÌNH</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>VIỆN KSND THÀNH PHỐ HÒA BÌNH</Typography>
                        <Typography sx={{ mb: 1 }}>Số: {'{SQD}'} /QĐ-VKS-PC</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
                        <Typography sx={{ mb: 2 }}>Độc lập – Tự do – Hạnh phúc</Typography>
                        <Typography sx={{ mb: 1 }}>TP. Hòa Bình, {'{NgayQD}'}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>QUYẾT ĐỊNH</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Về việc phân công Kiểm sát viên</Typography>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Căn cứ:</Typography>
                        <Typography sx={{ mb: 1 }}>- Luật Tổ chức Viện kiểm sát nhân dân;</Typography>
                        <Typography sx={{ mb: 1 }}>- Quy chế làm việc của Viện kiểm sát nhân dân;</Typography>
                        <Typography sx={{ mb: 2 }}>- Nhu cầu công việc của đơn vị;</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>QUYẾT ĐỊNH:</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Điều 1:</strong> Phân công đồng chí {form.noiDung} làm Kiểm sát viên phụ trách vụ việc</Typography>
                        <Typography sx={{ mb: 1, pl: 2, color: '#4472c4', fontWeight: 'bold' }}>{form.hinhThuc}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Điều 2:</strong> Thời hạn thực hiện: {form.thoiHan}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Điều 3:</strong> Ghi chú: {form.viPhamKhac}</Typography>
                        <Typography sx={{ mb: 3 }}>Quyết định này có hiệu lực kể từ ngày ký.</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'right' }}>Ngày 18 Tháng Sáu 2025</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'right', fontWeight: 'bold' }}>VIỆN TRƯỞNG</Typography>
                        <Typography sx={{ textAlign: 'right' }}>Nguyễn Văn Minh</Typography>
                      </>
                    )}

                    {selectedDocumentType === "quyet-dinh-lap-ho-so" && (
                      <>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>VIỆN KSND TỈNH HÒA BÌNH</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>VIỆN KSND THÀNH PHỐ HÒA BÌNH</Typography>
                        <Typography sx={{ mb: 1 }}>Số: {'{SQD}'} /QĐ-VKS-HS</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</Typography>
                        <Typography sx={{ mb: 2 }}>Độc lập – Tự do – Hạnh phúc</Typography>
                        <Typography sx={{ mb: 1 }}>TP. Hòa Bình, {'{NgayQD}'}</Typography>
                        <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 3, mb: 2 }}>QUYẾT ĐỊNH</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>Về việc lập hồ sơ vụ việc</Typography>
                        <Typography sx={{ mb: 1, fontWeight: 'bold' }}>Căn cứ:</Typography>
                        <Typography sx={{ mb: 1 }}>- Luật Tổ chức Viện kiểm sát nhân dân;</Typography>
                        <Typography sx={{ mb: 1 }}>- Bộ luật Tố tụng dân sự;</Typography>
                        <Typography sx={{ mb: 2 }}>- Đơn thư khiếu nại, tố cáo được tiếp nhận;</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>QUYẾT ĐỊNH:</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Điều 1:</strong> Lập hồ sơ vụ việc có nội dung: {form.noiDung}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Điều 2:</strong> Hình thức xử lý: {form.hinhThuc}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Điều 3:</strong> Thời hạn giải quyết: {form.thoiHan}</Typography>
                        <Typography sx={{ mb: 1 }}><strong>Điều 4:</strong> Yêu cầu đặc biệt: {form.viPhamKhac}</Typography>
                        <Typography sx={{ mb: 3 }}>Quyết định này có hiệu lực kể từ ngày ký.</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'right' }}>Ngày 18 Tháng Sáu 2025</Typography>
                        <Typography sx={{ mb: 1, textAlign: 'right', fontWeight: 'bold' }}>PHÓ VIỆN TRƯỞNG</Typography>
                        <Typography sx={{ textAlign: 'right' }}>Trần Thị Lan</Typography>
                      </>
                    )}
                  </div>
                ) : (
                  <div style={{ 
                    width: '100%',
                    height: 'calc(100vh - 400px)',
                    border: '1px solid #e1e5e9',
                    borderRadius: '8px',
                    overflow: 'hidden'
                  }}>
                    <iframe
                      src="https://docs.google.com/document/d/1O-yS6ytYMszFIi07XTygV1zj-xO7YkMKGi-zrNongUU/preview"
                      style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                      }}
                      title="Google Docs Preview"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintRecordScreen;

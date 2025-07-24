import React, { useState } from "react";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePreviewDocx = () => {
    setShowDocx(true);
  };

  const handleDocumentTypeChange = (value: string) => {
    setSelectedDocumentType(value);
    setShowDocx(false);
  };

  const getDocumentTitle = () => {
    switch (selectedDocumentType) {
      case "phieu-kiem-sat-thu-ly":
        return "Phiếu kiểm sát thụ lý, giao hồ sơ vụ việc dân sự";
      case "phieu-kiem-sat-quyet-dinh":
        return "Phiếu kiểm sát Quyết định";
      default:
        return "Tài liệu";
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-4">
            <h1>In phiếu kiểm sát</h1>
            <div className="text-muted">
              Vụ việc: Tranh chấp hợp đồng vay tài sản
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Left Column - Form Input */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title mb-0">Nhập thông tin hồ sơ</h3>
            </div>
            <div className="card-body">
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Thời hạn"
                name="thoiHan"
                value={form.thoiHan}
                onChange={handleChange}
              />
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Hình thức"
                name="hinhThuc"
                value={form.hinhThuc}
                onChange={handleChange}
              />
              <textarea
                className="form-control mb-3"
                placeholder="Nội dung"
                name="noiDung"
                value={form.noiDung}
                onChange={handleChange}
                rows={3}
              />
              <input
                className="form-control mb-3"
                type="text"
                placeholder="Vi phạm khác"
                name="viPhamKhac"
                value={form.viPhamKhac}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title mb-0">Preview hồ sơ</h3>
            </div>
            <div className="card-body">
              <select
                className="form-select mb-3"
                value={selectedDocumentType}
                onChange={(e) => handleDocumentTypeChange(e.target.value)}
              >
                <option value="phieu-kiem-sat-thu-ly">Phiếu kiểm sát thụ lý</option>
                <option value="phieu-kiem-sat-quyet-dinh">Phiếu kiểm sát Quyết định</option>
              </select>
              <button 
                className="btn btn-primary mb-3"
                onClick={handlePreviewDocx}
              >
                Preview DOCX
              </button>
              
              {showDocx && (
                <div className="border rounded p-3" style={{ backgroundColor: '#fafafa', minHeight: '400px' }}>
                  <h4 className="text-center mb-3">
                    {getDocumentTitle()}
                  </h4>
                  
                  <div className="text-center" style={{ lineHeight: '1.6' }}>
                    <div className="fw-bold mb-2">
                      VIỆN KSND TỈNH HÒA BÌNH
                    </div>
                    <div className="fw-bold mb-2">
                      VIỆN KSND THÀNH PHỐ HÒA BÌNH
                    </div>
                    <div className="mb-2">
                      Số: {'{SQD}'} /PKS-VKS-HNGĐ
                    </div>
                    <div className="fw-bold mb-2">
                      CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                    </div>
                    <div className="mb-3">
                      Độc lập – Tự do – Hạnh phúc
                    </div>
                    <div className="mb-2">
                      TP. Hòa Bình, {'{NgayQD}'}
                    </div>
                    
                    <h3 className="fw-bold my-4">
                      PHIẾU KIỂM SÁT
                    </h3>
                    <div className="mb-3">
                      Quyết định của Tòa án cấp sơ thẩm
                    </div>
                    
                    <div className="text-start mt-4">
                      <div className="fw-bold mb-3">
                        Phần I: Dùng cho Viện kiểm sát cấp sơ thẩm
                      </div>
                      
                      <div className="mb-3" style={{ lineHeight: '1.6' }}>
                        Căn cứ Bộ luật Tố tụng dân sự năm 2015; Thông tư số 01/2018/TT-VKSNDTC 
                        ngày 26/02/2018 của Viện kiểm sát nhân dân tối cao hướng dẫn hoạt động 
                        kiểm sát việc giải quyết các vụ việc dân sự của Tòa án.
                      </div>
                      
                      <div className="mb-2">
                        <strong>Nguyên đơn:</strong> {form.noiDung}
                      </div>
                      <div className="mb-2">
                        Trụ tại: Tổ 18, phường Tân Thịnh, thành phố Hòa Bình, tỉnh Hòa Bình
                      </div>
                      <div className="mb-2">
                        <strong>Bị đơn:</strong> anh Vũ Đình Tài, sinh năm 1995
                      </div>
                      <div className="mb-3">
                        Địa chỉ: thôn Nhân Trạch, xã Yên Thắng, Ý Yên, Nam Định
                      </div>
                      
                      <div className="fw-bold mb-2">
                        Kiểm sát Quyết định nêu trên thấy:
                      </div>
                      
                      <div className="mb-2">
                        1. Về thời hạn Tòa án gửi Quyết định
                      </div>
                      <div className="mb-2 ms-3 fw-bold text-primary">
                        {form.thoiHan}
                      </div>
                      
                      <div className="mb-2">
                        2. Về hình thức của Quyết định
                      </div>
                      <div className="mb-2 ms-3 fw-bold text-primary">
                        {form.hinhThuc}
                      </div>
                      
                      <div className="mb-2">
                        3. Về nội dung của Quyết định: Đảm bảo.
                      </div>
                      
                      <div className="mb-2">
                        4. Vi phạm khác (nếu có):
                      </div>
                      <div className="mb-3 ms-3 fw-bold text-primary">
                        {form.viPhamKhac}
                      </div>
                      
                      <div className="mt-5 text-end">
                        <div className="fw-bold">
                          KIỂM SÁT VIÊN
                        </div>
                        <div style={{ marginTop: '60px' }}>
                          Lâm Văn Huy
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintRecordScreen;

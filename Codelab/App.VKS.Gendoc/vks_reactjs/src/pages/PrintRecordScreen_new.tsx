import React, { useState } from "react";
import { Input, Button, Select } from "antd";
import './CaseDetail/style.css';

const { TextArea } = Input;
const { Option } = Select;

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
    <div className="case-detail-container">
      <div className="case-detail-header">
        <h1>In phiếu kiểm sát</h1>
        <div className="case-detail-subtitle">
          Vụ việc: Tranh chấp hợp đồng vay tài sản
        </div>
      </div>

      <div className="case-detail-body">
        {/* Left Column - Form Input */}
        <div className="case-detail-left">
          <div className="case-detail-section">
            <h3 className="case-detail-section-title">Nhập thông tin hồ sơ</h3>
            <div className="case-detail-info-grid">
              <Input
                placeholder="Thời hạn"
                name="thoiHan"
                value={form.thoiHan}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
              />
              <Input
                placeholder="Hình thức"
                name="hinhThuc"
                value={form.hinhThuc}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
              />
              <TextArea
                placeholder="Nội dung"
                name="noiDung"
                value={form.noiDung}
                onChange={handleChange}
                rows={3}
                style={{ marginBottom: '16px' }}
              />
              <Input
                placeholder="Vi phạm khác"
                name="viPhamKhac"
                value={form.viPhamKhac}
                onChange={handleChange}
                style={{ marginBottom: '16px' }}
              />
            </div>
          </div>
        </div>

        {/* Right Column - Preview */}
        <div className="case-detail-right">
          <div className="case-detail-section">
            <h3 className="case-detail-section-title">Preview hồ sơ</h3>
            <div className="case-detail-actions" style={{ marginBottom: '16px' }}>
              <Select
                value={selectedDocumentType}
                onChange={handleDocumentTypeChange}
                style={{ width: '100%', marginBottom: '16px' }}
              >
                <Option value="phieu-kiem-sat-thu-ly">Phiếu kiểm sát thụ lý</Option>
                <Option value="phieu-kiem-sat-quyet-dinh">Phiếu kiểm sát Quyết định</Option>
              </Select>
              <Button type="primary" onClick={handlePreviewDocx}>
                Preview DOCX
              </Button>
            </div>
            
            {showDocx && (
              <div style={{ 
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: '#fafafa',
                minHeight: '400px'
              }}>
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>
                  {getDocumentTitle()}
                </h4>
                
                <div style={{ textAlign: 'center', lineHeight: '1.6' }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    VIỆN KSND TỈNH HÒA BÌNH
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    VIỆN KSND THÀNH PHỐ HÒA BÌNH
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    Số: {'{SQD}'} /PKS-VKS-HNGĐ
                  </div>
                  <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                    CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                  </div>
                  <div style={{ marginBottom: '16px' }}>
                    Độc lập – Tự do – Hạnh phúc
                  </div>
                  <div style={{ marginBottom: '8px' }}>
                    TP. Hòa Bình, {'{NgayQD}'}
                  </div>
                  
                  <h3 style={{ fontWeight: 'bold', margin: '24px 0 16px', fontSize: '18px' }}>
                    PHIẾU KIỂM SÁT
                  </h3>
                  <div style={{ marginBottom: '16px' }}>
                    Quyết định của Tòa án cấp sơ thẩm
                  </div>
                  
                  <div style={{ textAlign: 'left', marginTop: '20px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                      Phần I: Dùng cho Viện kiểm sát cấp sơ thẩm
                    </div>
                    
                    <div style={{ marginBottom: '16px', lineHeight: '1.6' }}>
                      Căn cứ Bộ luật Tố tụng dân sự năm 2015; Thông tư số 01/2018/TT-VKSNDTC 
                      ngày 26/02/2018 của Viện kiểm sát nhân dân tối cao hướng dẫn hoạt động 
                      kiểm sát việc giải quyết các vụ việc dân sự của Tòa án.
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Nguyên đơn:</strong> {form.noiDung}
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      Trụ tại: Tổ 18, phường Tân Thịnh, thành phố Hòa Bình, tỉnh Hòa Bình
                    </div>
                    <div style={{ marginBottom: '8px' }}>
                      <strong>Bị đơn:</strong> anh Vũ Đình Tài, sinh năm 1995
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                      Địa chỉ: thôn Nhân Trạch, xã Yên Thắng, Ý Yên, Nam Định
                    </div>
                    
                    <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                      Kiểm sát Quyết định nêu trên thấy:
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      1. Về thời hạn Tòa án gửi Quyết định
                    </div>
                    <div style={{ 
                      marginBottom: '8px', 
                      paddingLeft: '16px', 
                      color: '#4472c4', 
                      fontWeight: 'bold' 
                    }}>
                      {form.thoiHan}
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      2. Về hình thức của Quyết định
                    </div>
                    <div style={{ 
                      marginBottom: '8px', 
                      paddingLeft: '16px', 
                      color: '#4472c4', 
                      fontWeight: 'bold' 
                    }}>
                      {form.hinhThuc}
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      3. Về nội dung của Quyết định: Đảm bảo.
                    </div>
                    
                    <div style={{ marginBottom: '8px' }}>
                      4. Vi phạm khác (nếu có):
                    </div>
                    <div style={{ 
                      marginBottom: '16px', 
                      paddingLeft: '16px', 
                      color: '#4472c4', 
                      fontWeight: 'bold' 
                    }}>
                      {form.viPhamKhac}
                    </div>
                    
                    <div style={{ marginTop: '32px', textAlign: 'right' }}>
                      <div style={{ fontWeight: 'bold' }}>
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
  );
};

export default PrintRecordScreen;

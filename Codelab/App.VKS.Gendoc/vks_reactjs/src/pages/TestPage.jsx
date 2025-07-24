import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CaseDetail/style.css';

const TestPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('phieu-kiem-sat-thu-ly');
  const [formInputs, setFormInputs] = useState({
    thoiHan: '',
    hinhThuc: '',
    noiDung: '',
    viPhamKhac: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInputs(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateFile = () => {
    alert('File đã được tạo thành công!');
  };

  const handleFinish = () => {
    alert('Hoàn tất!');
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
          <button
            onClick={() => navigate('/case/manual-entry')}
            style={{
              color: 'white', 
              textDecoration: 'none', 
              fontSize: '14px',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            ← Quay lại danh sách vụ việc
          </button>
        </div>
      </div>

      <div className="case-detail-container">
        <div className="case-detail-content">
          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 10px 0' }}>
              Bước 3: Xem trước & Tạo văn bản
            </h2>
            <p style={{ color: '#6c757d', fontSize: '14px', margin: 0 }}>
              Chọn văn bản bên dưới, điền thông tin (nếu có) và nhấn "Tạo file" để tải về.
            </p>
          </div>

          {/* Tab Navigation */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '30px',
            gap: '0'
          }}>
            <div 
              style={{ 
                padding: '12px 20px',
                border: '1px solid #dee2e6',
                backgroundColor: '#f8f9fa',
                color: '#333',
                fontSize: '14px',
                borderRadius: '4px 0 0 4px',
                borderRight: '0'
              }}
            >
              Chọn văn bản
            </div>
            <button 
              onClick={() => setActiveTab('phieu-kiem-sat-thu-ly')}
              style={{ 
                padding: '12px 20px',
                border: '1px solid #dee2e6',
                backgroundColor: activeTab === 'phieu-kiem-sat-thu-ly' ? '#007bff' : 'white',
                color: activeTab === 'phieu-kiem-sat-thu-ly' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                borderRadius: '0',
                borderRight: '0',
                borderLeft: '0'
              }}
            >
              Phiếu kiểm sát Thụ lý
            </button>
            <button 
              onClick={() => setActiveTab('quyet-dinh-phan-cong-ksv')}
              style={{ 
                padding: '12px 20px',
                border: '1px solid #dee2e6',
                backgroundColor: activeTab === 'quyet-dinh-phan-cong-ksv' ? '#007bff' : 'white',
                color: activeTab === 'quyet-dinh-phan-cong-ksv' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                borderRadius: '0',
                borderRight: '0',
                borderLeft: '0'
              }}
            >
              Quyết định Phân công KSV
            </button>
            <button 
              onClick={() => setActiveTab('quyet-dinh-lap-hs-so')}
              style={{ 
                padding: '12px 20px',
                border: '1px solid #dee2e6',
                backgroundColor: activeTab === 'quyet-dinh-lap-hs-so' ? '#007bff' : 'white',
                color: activeTab === 'quyet-dinh-lap-hs-so' ? 'white' : '#333',
                cursor: 'pointer',
                fontSize: '14px',
                borderRadius: '0 4px 4px 0',
                borderLeft: '0'
              }}
            >
              Quyết định Lập hồ sơ
            </button>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', gap: '20px', maxWidth: '1200px', margin: '0 auto', alignItems: 'stretch' }}>
            {/* Left Panel - Form or Message */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                border: '1px solid #dee2e6', 
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '20px',
                height: '600px',
                display: 'flex',
                flexDirection: 'column'
              }}>
                {activeTab === 'phieu-kiem-sat-thu-ly' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <h4 style={{ margin: '0 0 20px 0', fontSize: '16px', fontWeight: 'bold' }}>
                      Nhập nội dung Phiếu Kiểm sát
                    </h4>
                    
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div>
                        <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block', fontSize: '14px' }}>
                          Thời hạn
                        </label>
                        <input
                          type="text"
                          name="thoiHan"
                          value={formInputs.thoiHan}
                          onChange={handleInputChange}
                          style={{ 
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '14px',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block', fontSize: '14px' }}>
                          Hình thức
                        </label>
                        <textarea
                          name="hinhThuc"
                          rows="4"
                          value={formInputs.hinhThuc}
                          onChange={handleInputChange}
                          style={{ 
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '14px',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block', fontSize: '14px' }}>
                          Nội dung
                        </label>
                        <textarea
                          name="noiDung"
                          rows="4"
                          value={formInputs.noiDung}
                          onChange={handleInputChange}
                          style={{ 
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '14px',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block', fontSize: '14px' }}>
                          Vi phạm khác
                        </label>
                        <textarea
                          name="viPhamKhac"
                          rows="4"
                          value={formInputs.viPhamKhac}
                          onChange={handleInputChange}
                          style={{ 
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid #ced4da',
                            borderRadius: '4px',
                            fontSize: '14px',
                            resize: 'vertical',
                            boxSizing: 'border-box'
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ 
                    textAlign: 'center', 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    color: '#6c757d',
                    fontSize: '16px',
                    lineHeight: '1.5'
                  }}>
                    <div>
                      <p style={{ margin: '0 0 10px 0' }}>
                        Văn bản này không yêu cầu nhập liệu thêm.
                      </p>
                      <p style={{ margin: 0 }}>
                        Nhấn "Tạo file" để xuất văn bản.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Preview */}
            <div style={{ flex: 1 }}>
              <div style={{ 
                border: '1px solid #dee2e6', 
                borderRadius: '4px',
                backgroundColor: 'white',
                padding: '20px',
                height: '600px',
                overflow: 'auto'
              }}>
                <div style={{ 
                  fontFamily: 'Times New Roman, serif',
                  fontSize: '13px',
                  lineHeight: '1.5'
                }}>
                  {activeTab === 'phieu-kiem-sat-thu-ly' && (
                    <div>
                      {/* Header */}
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                          VIỆN KIỂM SÁT NHÂN DÂN<br/>
                          THÀNH PHỐ HẢI PHÒNG
                        </div>
                        <div style={{ fontSize: '13px', marginTop: '8px' }}>
                          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
                          Độc lập - Tự do - Hạnh phúc
                        </div>
                        <div style={{ margin: '20px 0', borderBottom: '1px solid #000', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}></div>
                      </div>

                      {/* Document info */}
                      <div style={{ fontSize: '12px', marginBottom: '20px' }}>
                        <div style={{ textAlign: 'right' }}>Số: 25/PKS-TBLL</div>
                        <div style={{ fontWeight: 'bold', margin: '15px 0', textAlign: 'center', fontSize: '14px' }}>
                          PHIẾU KIỂM SÁT THÔNG BÁO THỤ LÝ
                        </div>
                        <div>Loại việc: Dân sự</div>
                        <div>Ngày, tháng, năm tạo phiếu: 25/02/2025</div>
                        <div>Số TBLL và Ngày, tháng, năm TBLL: 25/TBLL-DS ngày 25/02/2025</div>
                        <div>Thời hạn giải quyết: 45 ngày, kể từ ngày thụ lý</div>
                      </div>

                      {/* Content */}
                      <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                        <div style={{ marginBottom: '15px' }}>
                          <strong>1. Hình thức:</strong> Tranh chấp về quyền sở hữu, quyền sử dụng tài sản
                        </div>
                        
                        <div style={{ marginBottom: '15px' }}>
                          <strong>2. Nội dung:</strong> Ông/Bà Nguyễn Văn A có đơn đề nghị giải quyết tranh chấp dân sự về quyền sở hữu đối với thửa đất số 125, tờ bản đồ số 05, diện tích 200m², tại xã Thạch Bàn, huyện Long Biên, thành phố Hà Nội với ông/bà Trần Thị B.
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <strong>3. Vi phạm khác:</strong> Không có
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <strong>4. Kiến nghị của Viện kiểm sát:</strong> Đề nghị Tòa án nhân dân thành phố Hải Phòng thụ lý giải quyết vụ việc theo quy định của pháp luật.
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                          <strong>5. Căn cứ pháp lý:</strong>
                          <div style={{ marginLeft: '20px', marginTop: '8px' }}>
                            - Điều 192 Bộ luật Tố tụng Dân sự năm 2015;<br/>
                            - Điều 21, 22 Luật Tổ chức Viện kiểm sát nhân dân năm 2014.
                          </div>
                        </div>

                        <div style={{ marginBottom: '20px' }}>
                          <strong>6. Đề xuất xử lý:</strong> Thụ lý giải quyết theo thẩm quyền và tiến hành các hoạt động tố tụng theo quy định của Bộ luật Tố tụng Dân sự.
                        </div>
                      </div>

                      {/* Signature */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', fontSize: '13px' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div><strong>Nơi nhận:</strong></div>
                          <div>- Tòa án nhân dân TP Hải Phòng;</div>
                          <div>- Người đề nghị;</div>
                          <div>- Lưu VKS.</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            Ngày 25 tháng 02 năm 2025<br/>
                            KIỂM SÁT VIÊN
                          </div>
                          <div style={{ marginTop: '60px' }}>
                            Nguyễn Văn Minh<br/>
                            (Ký tên, đóng dấu)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'quyet-dinh-phan-cong-ksv' && (
                    <div>
                      {/* Header */}
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                          VIỆN KIỂM SÁT NHÂN DÂN<br/>
                          HUYỆN ABC
                        </div>
                        <div style={{ fontSize: '13px', marginTop: '8px' }}>
                          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
                          Độc lập - Tự do - Hạnh phúc
                        </div>
                        <div style={{ margin: '20px 0', borderBottom: '1px solid #000', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}></div>
                      </div>

                      {/* Document info */}
                      <div style={{ fontSize: '12px', marginBottom: '20px' }}>
                        <div style={{ textAlign: 'right' }}>Số: __/QĐ-VKS</div>
                        <div style={{ fontWeight: 'bold', margin: '15px 0', textAlign: 'center', fontSize: '14px' }}>
                          QUYẾT ĐỊNH<br/>
                          Phân công Kiểm sát viên thực hiện việc kiểm sát
                        </div>
                        <div style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '15px' }}>
                          (Ban hành theo Điều 21 Luật Tổ chức Viện kiểm sát nhân dân)
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                        <div style={{ marginBottom: '15px' }}>
                          <strong>VIỆN TRƯỞNG VIỆN KIỂM SÁT NHÂN DÂN HUYỆN ABC</strong>
                        </div>
                        
                        <div style={{ marginBottom: '12px' }}>
                          Căn cứ Luật Tổ chức Viện kiểm sát nhân dân năm 2014;
                        </div>
                        
                        <div style={{ marginBottom: '12px' }}>
                          Căn cứ Nghị định số 53/2017/NĐ-CP ngày 08/5/2017 của Chính phủ quy định chi tiết thi hành một số điều của Luật Tổ chức Viện kiểm sát nhân dân;
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          Căn cứ đơn đề nghị giải quyết tranh chấp dân sự của _______;
                        </div>

                        <div style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
                          QUYẾT ĐỊNH:
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          <strong>Điều 1.</strong> Phân công Kiểm sát viên <strong>Nguyễn Văn A</strong> thực hiện việc kiểm sát đối với vụ việc:
                        </div>

                        <div style={{ marginLeft: '20px', marginBottom: '12px' }}>
                          - Nguyên đơn: ________________<br/>
                          - Bị đơn: ________________<br/>
                          - Nội dung tranh chấp: ________________
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          <strong>Điều 2.</strong> Quyết định này có hiệu lực kể từ ngày ký.
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          <strong>Điều 3.</strong> Kiểm sát viên được phân công có trách nhiệm thực hiện đúng quy định của pháp luật.
                        </div>
                      </div>

                      {/* Signature */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', fontSize: '13px' }}>
                        <div style={{ textAlign: 'center' }}>
                          <div>Nơi nhận:</div>
                          <div>- Lưu VKS</div>
                          <div>- KSV được phân công</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            Ngày __ tháng __ năm 2025<br/>
                            VIỆN TRƯỞNG
                          </div>
                          <div style={{ marginTop: '60px' }}>
                            (Ký tên, đóng dấu)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'quyet-dinh-lap-hs-so' && (
                    <div>
                      {/* Header */}
                      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                          VIỆN KIỂM SÁT NHÂN DÂN<br/>
                          HUYỆN ABC
                        </div>
                        <div style={{ fontSize: '13px', marginTop: '8px' }}>
                          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM<br/>
                          Độc lập - Tự do - Hạnh phúc
                        </div>
                        <div style={{ margin: '20px 0', borderBottom: '1px solid #000', width: '200px', marginLeft: 'auto', marginRight: 'auto' }}></div>
                      </div>

                      {/* Document info */}
                      <div style={{ fontSize: '12px', marginBottom: '20px' }}>
                        <div style={{ textAlign: 'right' }}>Số: __/QĐ-VKS</div>
                        <div style={{ fontWeight: 'bold', margin: '15px 0', textAlign: 'center', fontSize: '14px' }}>
                          QUYẾT ĐỊNH<br/>
                          Lập hồ sơ giải quyết tranh chấp dân sự
                        </div>
                        <div style={{ textAlign: 'center', fontStyle: 'italic', marginBottom: '15px' }}>
                          (Ban hành theo khoản 1 Điều 192 Bộ luật Tố tụng Dân sự)
                        </div>
                      </div>

                      {/* Content */}
                      <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                        <div style={{ marginBottom: '15px' }}>
                          <strong>VIỆN TRƯỞNG VIỆN KIỂM SÁT NHÂN DÂN HUYỆN ABC</strong>
                        </div>
                        
                        <div style={{ marginBottom: '12px' }}>
                          Căn cứ khoản 1 Điều 192 Bộ luật Tố tụng Dân sự năm 2015;
                        </div>
                        
                        <div style={{ marginBottom: '12px' }}>
                          Căn cứ Nghị định số 24/2018/NĐ-CP ngày 23/02/2018 của Chính phủ quy định chi tiết thi hành một số điều của Bộ luật Tố tụng Dân sự;
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          Căn cứ đơn đề nghị giải quyết tranh chấp dân sự ngày __ tháng __ năm 2025 của _______;
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          Xét thấy đơn đề nghị có đủ điều kiện theo quy định tại Điều 191 Bộ luật Tố tụng Dân sự;
                        </div>

                        <div style={{ textAlign: 'center', fontWeight: 'bold', margin: '20px 0' }}>
                          QUYẾT ĐỊNH:
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          <strong>Điều 1.</strong> Lập hồ sơ giải quyết tranh chấp dân sự theo đơn đề nghị của:
                        </div>

                        <div style={{ marginLeft: '20px', marginBottom: '12px' }}>
                          <strong>Người đề nghị:</strong> ________________<br/>
                          Địa chỉ: ________________<br/>
                          <strong>Đối tượng bị đề nghị:</strong> ________________<br/>
                          Địa chỉ: ________________<br/>
                          <strong>Nội dung đề nghị:</strong> ________________
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          <strong>Điều 2.</strong> Phân công Kiểm sát viên <strong>Nguyễn Văn A</strong> được giao nhiệm vụ tiến hành các hoạt động tố tụng trong giai đoạn chuẩn bị.
                        </div>

                        <div style={{ marginBottom: '12px' }}>
                          <strong>Điều 3.</strong> Quyết định này có hiệu lực kể từ ngày ký.
                        </div>
                      </div>

                      {/* Signature */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', fontSize: '13px' }}>
                        <div style={{ textAlign: 'left' }}>
                          <div><strong>Nơi nhận:</strong></div>
                          <div>- Người đề nghị;</div>
                          <div>- Đối tượng bị đề nghị;</div>
                          <div>- KSV được giao nhiệm vụ;</div>
                          <div>- Lưu VKS.</div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                          <div style={{ fontWeight: 'bold' }}>
                            Ngày __ tháng __ năm 2025<br/>
                            VIỆN TRƯỞNG
                          </div>
                          <div style={{ marginTop: '60px' }}>
                            (Ký tên, đóng dấu)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '30px',
            paddingBottom: '30px'
          }}>
            <button 
              onClick={handleCreateFile}
              style={{
                backgroundColor: '#17a2b8',
                color: 'white',
                padding: '12px 25px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '4px',
                border: 'none',
                marginRight: '15px',
                cursor: 'pointer',
                minWidth: '100px'
              }}
            >
              📁 Tạo file
            </button>
            <button 
              onClick={handleFinish}
              style={{
                backgroundColor: '#28a745',
                color: 'white',
                padding: '12px 25px',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '4px',
                border: 'none',
                cursor: 'pointer',
                minWidth: '100px'
              }}
            >
              ✓ Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;

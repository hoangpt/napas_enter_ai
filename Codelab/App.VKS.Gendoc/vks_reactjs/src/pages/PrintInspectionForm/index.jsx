import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, message } from 'antd';
import { getDocumentEditUrl, getDocumentTypeName } from '../../services/DocumentService';
import './styles.css';

const PrintInspectionForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [decisionData, setDecisionData] = useState(null);

  useEffect(() => {
    // Đọc dữ liệu quyết định đã lưu từ localStorage
    const savedData = localStorage.getItem(`case_${id}_decision_data`);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setDecisionData(parsedData);
      console.log('Loaded decision data:', parsedData);
    }
  }, [id]);

  const handlePrintInspection = () => {
    if (!decisionData || !decisionData.decisionType) {
      message.error('Không tìm thấy thông tin loại quyết định. Vui lòng quay lại màn trước để chọn.');
      return;
    }

    const documentUrl = getDocumentEditUrl(decisionData.decisionType);
    if (!documentUrl) {
      message.error('Không tìm thấy URL tài liệu tương ứng.');
      return;
    }

    console.log('Opening document URL:', documentUrl);
    console.log('For decision type:', decisionData.decisionType);
    
    // Mở tài liệu Google Docs trong tab mới
    window.open(documentUrl, '_blank');
    
    message.success(`Đã mở tài liệu: ${getDocumentTypeName(decisionData.decisionType)}`);
  };

  return (
    <div className="print-form-container">
      <div className="print-form-header">
        <img 
          src="https://upload.wikimedia.org/wikipedia/vi/thumb/b/ba/Ph%C3%B9_hi%E1%BB%87u_Vi%E1%BB%87n_ki%E1%BB%83m_s%C3%A1t_nh%C3%A2n_d%C3%A2n.svg/1004px-Ph%C3%B9_hi%E1%BB%87u_Vi%E1%BB%87n_ki%E1%BB%83m_s%C3%A1t_nh%C3%A2n_d%C3%A2n.svg.png" 
          alt="Logo VKSND" 
          className="logo" 
          style={{ height: '60px' }}
        />
        <h1>Hệ thống Quản lý Vụ việc - Viện Kiểm sát Nhân dân khu vực 12 - tỉnh Phú Thọ</h1>
      </div>

      <div className="print-form-content">
        <h2>In Phiếu kiểm sát Quyết định/Bản án</h2>
        <p className="success-message">✅ Thông tin đã được cập nhật thành công!</p>
        
        {decisionData && (
          <div className="decision-info">
            <h3>Thông tin quyết định đã chọn:</h3>
            <div className="info-item">
              <strong>Loại:</strong> {getDocumentTypeName(decisionData.decisionType)}
            </div>
            {decisionData.decisionNumber && (
              <div className="info-item">
                <strong>Số quyết định:</strong> {decisionData.decisionNumber}
              </div>
            )}
            {decisionData.inspectionNumber && (
              <div className="info-item">
                <strong>Số phiếu kiểm sát:</strong> {decisionData.inspectionNumber}
              </div>
            )}
          </div>
        )}
        
        <p className="instruction">Nhấn nút bên dưới để mở và in phiếu kiểm sát:</p>
        
        <div className="action-buttons">
          <Button 
            type="primary"
            size="large"
            icon={<span role="img" aria-label="print">🖨️</span>}
            onClick={handlePrintInspection}
            className="print-button"
            disabled={!decisionData}
          >
            In Phiếu kiểm sát {decisionData ? getDocumentTypeName(decisionData.decisionType) : 'Bản án'}
          </Button>
        </div>

        <div className="secondary-actions">
          <Button 
            type="default"
            onClick={() => navigate(`/case/${id}/update-decision`)}
            style={{ marginRight: '16px' }}
          >
            Quay lại chỉnh sửa
          </Button>
          <Button 
            type="primary"
            className="complete-button"
            onClick={() => navigate('/')}
          >
            Hoàn tất và về trang chính
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrintInspectionForm;

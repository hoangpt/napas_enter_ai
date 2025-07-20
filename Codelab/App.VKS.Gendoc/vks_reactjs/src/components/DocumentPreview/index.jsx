import React from 'react';
import { Card, Spin, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import './styles.css';

const DocumentPreview = ({ documentType, formData, shouldAutoPreview }) => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [showPreview, setShowPreview] = React.useState(false);
  const [currentPreviewId, setCurrentPreviewId] = React.useState(null);
  const [previewUrl, setPreviewUrl] = React.useState(null);
  const [previewId, setPreviewId] = React.useState(null);
  
  console.log('DocumentPreview rendering with:', { documentType, formData, showPreview, shouldAutoPreview });
  
  // URL của Google Apps Script web app
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

  const getDocumentInfo = () => {
    switch (documentType) {
      case 'verdict':
        return {
          title: 'Bản án',
          fileName: 'ban-an.docx',
          fileId: '1D2hPI2AhosfRQWLHvIoAzvpndeeZkQIv',
          description: 'Tài liệu bản án của vụ việc'
        };
      case 'dismissal':
        return {
          title: 'Quyết định đình chỉ',
          fileName: 'quyet-dinh-dinh-chi.docx',
          fileId: '1bBMdxbwO4-GXJIEINhhe8Ce_x_vxi2_F',
          description: 'Quyết định đình chỉ giải quyết vụ việc'
        };
      case 'agreement':
        return {
          title: 'Quyết định công nhận sự thoả thuận',
          fileName: 'quyet-dinh-cong-nhan-thoa-thuan.docx',
          fileId: '1CM_aam-p3Om2XE-r2CqvmRfkfkPVLxsm',
          description: 'Quyết định công nhận sự thoả thuận của các bên'
        };
      case 'other':
        return {
          title: 'Quyết định khác',
          fileName: 'quyet-dinh-khac.docx',
          fileId: '1IxmT9wfrEfQ22_mVGf6Ie5A92rucR_43',
          description: 'Các loại quyết định khác'
        };
      default:
        return null;
    }
  };

  const replaceContent = (content) => {
    if (!formData) return content;
    
    // Replace placeholders with form data
    let modifiedContent = content;
    if (formData.decisionNumber) {
      modifiedContent = modifiedContent.replace(/\{SoQuyetDinh\}/g, formData.decisionNumber);
    }
    if (formData.decisionDate) {
      const date = formData.decisionDate.format('DD/MM/YYYY');
      modifiedContent = modifiedContent.replace(/\{NgayQuyetDinh\}/g, date);
    }
    if (formData.inspectionNumber) {
      modifiedContent = modifiedContent.replace(/\{SoPhieuKiemSat\}/g, formData.inspectionNumber);
    }
    return modifiedContent;
  };

  const handlePreviewClick = () => {
    if (!documentType) return;
    
    const info = getDocumentInfo();
    if (!info) return;

    console.log('Preview clicked for:', info);
    setLoading(true);
    
    // Tạo URL preview từ Google Drive file ID
    const previewUrl = `https://docs.google.com/document/d/${info.fileId}/preview`;
    setPreviewUrl(previewUrl);
    setShowPreview(true);
    setLoading(false);
  };

  // Auto preview khi có shouldAutoPreview flag
  React.useEffect(() => {
    if (shouldAutoPreview && documentType && !showPreview) {
      console.log('Auto triggering preview...');
      setTimeout(() => {
        handlePreviewClick();
      }, 1000);
    }
  }, [shouldAutoPreview, documentType, showPreview]);

  // Cleanup khi component unmount
  React.useEffect(() => {
    return () => {
      if (currentPreviewId) {
        fetch(`/api/preview/${currentPreviewId}`, { method: 'DELETE' })
          .catch(err => console.error('Error cleaning up preview:', err));
      }
    };
  }, []);

  const getPreviewUrl = () => {
    if (!previewId) return null;
    return `https://docs.google.com/document/d/${previewId}/preview`;
  };

  const getDownloadUrl = () => {
    const info = getDocumentInfo();
    return info ? `https://docs.google.com/document/d/${info.fileId}/export?format=docx` : null;
  };

  return (
    <div className="document-preview">
      <h3>Xem trước tài liệu</h3>
      <div className="preview-container">
        {documentType ? (
          <div className="document-view">
            <div className="document-header">
              <h4>{getDocumentInfo().title}</h4>
              <p className="description">{getDocumentInfo().description}</p>
              <p className="filename">Tên file: {getDocumentInfo().fileName}</p>
            </div>
            <div className="document-content">
              {!showPreview ? (
                <div className="preview-button-container">
                  <Button 
                    type="primary" 
                    icon={<EyeOutlined />} 
                    onClick={handlePreviewClick}
                    loading={loading}
                  >
                    Xem trước
                  </Button>
                </div>
              ) : loading ? (
                <div className="loading-container">
                  <Spin size="large" />
                  <p>Đang tải tài liệu...</p>
                </div>
              ) : (
                <div className="iframe-container">
                  <iframe
                    src={previewUrl}
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    style={{ border: '1px solid #d9d9d9', borderRadius: '6px' }}
                    title="Document Preview"
                  />
                  <div className="preview-actions" style={{ marginTop: '16px', textAlign: 'center' }}>
                    <Button 
                      onClick={() => setShowPreview(false)}
                      style={{ marginRight: '8px' }}
                    >
                      Đóng xem trước
                    </Button>
                    <Button 
                      type="primary" 
                      onClick={handlePreviewClick}
                    >
                      Tải lại
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="no-document">
            <p>Vui lòng chọn loại quyết định/bản án để xem trước tài liệu</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;

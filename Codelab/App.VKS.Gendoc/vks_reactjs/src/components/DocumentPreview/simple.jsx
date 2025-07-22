import React from 'react';
import { Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const DocumentPreviewSimple = ({ documentType, formData, shouldAutoPreview }) => {
  const [showPreview, setShowPreview] = React.useState(false);
  
  console.log('DocumentPreview props:', { documentType, formData, shouldAutoPreview });
  
  const handlePreviewClick = () => {
    setShowPreview(true);
  };
  
  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
      <h3>Xem trước tài liệu</h3>
      <p>Loại: {documentType || 'Chưa chọn'}</p>
      {documentType && (
        <Button 
          type="primary" 
          icon={<EyeOutlined />} 
          onClick={handlePreviewClick}
        >
          Xem trước
        </Button>
      )}
      {showPreview && (
        <div style={{ marginTop: '16px', padding: '16px', background: '#fff', borderRadius: '4px' }}>
          Preview content would go here...
        </div>
      )}
    </div>
  );
};

export default DocumentPreviewSimple;

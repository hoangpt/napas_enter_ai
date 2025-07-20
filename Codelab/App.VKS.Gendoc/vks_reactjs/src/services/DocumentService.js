// Helper function để map loại quyết định với URL Google Docs
export const getDocumentEditUrl = (documentType) => {
  const urlMap = {
    'verdict': 'https://docs.google.com/document/d/1D2hPI2AhosfRQWLHvIoAzvpndeeZkQIv/edit?usp=drive_link&ouid=112881659321326950435&rtpof=true&sd=true',
    'dismissal': 'https://docs.google.com/document/d/1bBMdxbwO4-GXJIEINhhe8Ce_x_vxi2_F/edit?usp=drive_link&ouid=112881659321326950435&rtpof=true&sd=true',
    'agreement': 'https://docs.google.com/document/d/1CM_aam-p3Om2XE-r2CqvmRfkfkPVLxsm/edit?usp=drive_link&ouid=112881659321326950435&rtpof=true&sd=true',
    'other': 'https://docs.google.com/document/d/1IxmT9wfrEfQ22_mVGf6Ie5A92rucR_43/edit?usp=drive_link&ouid=112881659321326950435&rtpof=true&sd=true'
  };
  
  return urlMap[documentType] || null;
};

export const getDocumentTypeName = (documentType) => {
  const nameMap = {
    'verdict': 'Bản án',
    'dismissal': 'Quyết định đình chỉ',
    'agreement': 'Quyết định công nhận sự thoả thuận',
    'other': 'Quyết định khác'
  };
  
  return nameMap[documentType] || 'Tài liệu';
};

export const replaceDocumentPlaceholders = (content, data) => {
  const currentYear = new Date().getFullYear();
  
  const replacements = {
    // Thông tin Nguyên đơn
    '{HoTenNguyenDon}': data.nguyenDon?.hoTen || '',
    '{NamSinhNguyenDon}': data.nguyenDon?.tuoi ? (currentYear - data.nguyenDon.tuoi).toString() : '',
    '{DiaChiNguyenDon}': data.nguyenDon?.diaChi || '',

    // Thông tin Bị đơn
    '{HoTenBiDon}': data.biDon?.hoTen || '',
    '{NamSinhBiDon}': data.biDon?.tuoi ? (currentYear - data.biDon.tuoi).toString() : '',
    '{DiaChiBiDon}': data.biDon?.diaChi || '',

    // Thông tin Quyết định
    '{SoQuyetDinh}': data.quyetDinh?.soQuyetDinh || '',
    '{NgayQuyetDinh}': data.quyetDinh?.ngayQuyetDinh || '',
    '{SoPhieuKiemSat}': data.quyetDinh?.soPhieuKiemSat || '',
  };

  let updatedContent = content;
  Object.entries(replacements).forEach(([placeholder, value]) => {
    updatedContent = updatedContent.replace(new RegExp(placeholder, 'g'), value);
  });

  return updatedContent;
};

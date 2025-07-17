// HoSo model class for data mapping
class HoSo {
  constructor(apiData = {}) {
    this.soKS = apiData.ma || apiData.soThuLy || '';
    this.nguyenDon = apiData.nguyen_don?.ten || apiData.nguyenDon || '';
    this.biDon = apiData.bi_don?.ten || apiData.biDon || '';
    this.ngayThuLy = apiData.ngay_gio || apiData.ngayThuLy || '';
    this.tinhTrang = apiData.status || apiData.tinhTrang || 'Chưa xử lý';
  }

  mapStatusType(status) {
    if (!status) return 'processing';
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes('hoàn tất') || statusLower.includes('completed') || statusLower.includes('done')) {
      return 'done';
    }
    return 'processing';
  }

  // Static method to create array of HoSo from API response
  static fromApiArray(apiDataArray) {
    if (!Array.isArray(apiDataArray)) return [];
    return apiDataArray.map(item => new HoSo(item));
  }
}

export default HoSo;

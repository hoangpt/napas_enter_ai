from hosothuly.services.nguyen_don_service import NguyenDonService
from hosothuly.services.bi_don_service import BiDonService
from hosothuly.services.ho_so_thu_ly_service import HoSoThuLyService
from datetime import datetime
import json

class DocumentProcessingService:
    
    @staticmethod
    def process_extracted_data(extracted_data):
        """
        Xử lý dữ liệu đã extract và lưu vào database
        """
        try:
            result = {
                'nguyen_don_id': None,
                'bi_don_id': None,
                'ho_so_id': None,
                'created_records': []
            }
            
            # 1. Tạo Nguyên đơn nếu có thông tin
            if extracted_data.get('nguyen_don') and extracted_data['nguyen_don'].get('ten'):
                nguyen_don_data = extracted_data['nguyen_don']
                if nguyen_don_data.get('ten') and nguyen_don_data.get('dia_chi'):
                    nguyen_don = NguyenDonService.create({
                        'ten': nguyen_don_data['ten'],
                        'dia_chi': nguyen_don_data['dia_chi']
                    })
                    result['nguyen_don_id'] = nguyen_don.id
                    result['created_records'].append({
                        'type': 'nguyen_don',
                        'id': nguyen_don.id,
                        'data': nguyen_don.to_dict()
                    })
            
            # 2. Tạo Bị đơn nếu có thông tin
            if extracted_data.get('bi_don') and extracted_data['bi_don'].get('ten'):
                bi_don_data = extracted_data['bi_don']
                if bi_don_data.get('ten') and bi_don_data.get('dia_chi'):
                    bi_don = BiDonService.create({
                        'ten': bi_don_data['ten'],
                        'dia_chi': bi_don_data['dia_chi']
                    })
                    result['bi_don_id'] = bi_don.id
                    result['created_records'].append({
                        'type': 'bi_don',
                        'id': bi_don.id,
                        'data': bi_don.to_dict()
                    })
            
            # 3. Tạo Hồ sơ nếu có đủ thông tin
            if (extracted_data.get('ho_so') and 
                result['nguyen_don_id'] and 
                result['bi_don_id']):
                
                ho_so_data = extracted_data['ho_so']
                
                # Parse ngày giờ
                ngay_gio = None
                if ho_so_data.get('ngay_gio'):
                    try:
                        ngay_gio = datetime.fromisoformat(ho_so_data['ngay_gio'].replace('Z', '+00:00'))
                    except:
                        ngay_gio = datetime.now()
                else:
                    ngay_gio = datetime.now()
                
                ho_so_create_data = {
                    'ma': ho_so_data.get('ma') or f"HS_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    'dia_diem': ho_so_data.get('dia_diem') or 'Chưa xác định',
                    'ngay_gio': ngay_gio,
                    'noi_dung_vu_viec': ho_so_data.get('noi_dung_vu_viec') or 'Nội dung từ OCR',
                    'nguyen_don_id': result['nguyen_don_id'],
                    'bi_don_id': result['bi_don_id']
                }
                
                ho_so = HoSoThuLyService.create(ho_so_create_data)
                result['ho_so_id'] = ho_so.id
                result['created_records'].append({
                    'type': 'ho_so',
                    'id': ho_so.id,
                    'data': ho_so.to_dict()
                })
            
            return {
                'success': True,
                'message': f"Đã tạo thành công {len(result['created_records'])} bản ghi",
                'data': result
            }
            
        except Exception as e:
            return {
                'success': False,
                'error': f"Lỗi xử lý dữ liệu: {str(e)}"
            }
    
    @staticmethod
    def search_existing_records(extracted_data):
        """
        Tìm kiếm các bản ghi đã tồn tại để tránh duplicate
        """
        existing = {
            'nguyen_don': [],
            'bi_don': [],
            'ho_so': []
        }
        
        try:
            # Tìm nguyên đơn theo tên
            if extracted_data.get('nguyen_don', {}).get('ten'):
                nguyen_don_name = extracted_data['nguyen_don']['ten']
                existing_nguyen_don = NguyenDonService.search_by_name(nguyen_don_name)
                existing['nguyen_don'] = [nd.to_dict() for nd in existing_nguyen_don]
            
            # Tìm bị đơn theo tên  
            if extracted_data.get('bi_don', {}).get('ten'):
                bi_don_name = extracted_data['bi_don']['ten']
                existing_bi_don = BiDonService.search_by_name(bi_don_name)
                existing['bi_don'] = [bd.to_dict() for bd in existing_bi_don]
            
            # Tìm hồ sơ theo mã
            if extracted_data.get('ho_so', {}).get('ma'):
                ho_so_ma = extracted_data['ho_so']['ma']
                existing_ho_so = HoSoThuLyService.search_by_ma(ho_so_ma)
                if existing_ho_so:
                    existing['ho_so'] = [existing_ho_so.to_dict()]
            
            return existing
            
        except Exception as e:
            print(f"Lỗi tìm kiếm bản ghi: {str(e)}")
            return existing

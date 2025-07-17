from models import HoSoThuLy, NguyenDon, BiDon, db
from datetime import datetime

class HoSoThuLyService:
    
    @staticmethod
    def get_all():
        """Lấy tất cả hồ sơ thụ lý"""
        return HoSoThuLy.query.all()
    
    @staticmethod
    def get_by_id(ho_so_id):
        """Lấy hồ sơ thụ lý theo ID"""
        return HoSoThuLy.query.get(ho_so_id)
    
    @staticmethod
    def get_by_ma(ma):
        """Lấy hồ sơ thụ lý theo mã"""
        return HoSoThuLy.query.filter_by(ma=ma).first()
    
    @staticmethod
    def create(data):
        """Tạo hồ sơ thụ lý mới"""
        try:
            # Kiểm tra mã hồ sơ đã tồn tại
            existing_ho_so = HoSoThuLy.query.filter_by(ma=data['ma']).first()
            if existing_ho_so:
                raise ValueError("Mã hồ sơ đã tồn tại")
            
            # Kiểm tra nguyên đơn và bị đơn tồn tại
            nguyen_don = NguyenDon.query.get(data['nguyen_don_id'])
            if not nguyen_don:
                raise ValueError("Nguyên đơn không tồn tại")
            
            bi_don = BiDon.query.get(data['bi_don_id'])
            if not bi_don:
                raise ValueError("Bị đơn không tồn tại")
            
            # Parse datetime
            ngay_gio = datetime.fromisoformat(data['ngay_gio'].replace('Z', '+00:00'))
            
            ho_so = HoSoThuLy(
                ma=data['ma'],
                dia_diem=data['dia_diem'],
                ngay_gio=ngay_gio,
                noi_dung_vu_viec=data['noi_dung_vu_viec'],
                nguyen_don_id=data['nguyen_don_id'],
                bi_don_id=data['bi_don_id']
            )
            db.session.add(ho_so)
            db.session.commit()
            return ho_so
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def update(ho_so_id, data):
        """Cập nhật hồ sơ thụ lý"""
        try:
            ho_so = HoSoThuLy.query.get(ho_so_id)
            if not ho_so:
                return None
            
            # Kiểm tra mã hồ sơ nếu được cập nhật
            if 'ma' in data and data['ma'] != ho_so.ma:
                existing_ho_so = HoSoThuLy.query.filter_by(ma=data['ma']).first()
                if existing_ho_so:
                    raise ValueError("Mã hồ sơ đã tồn tại")
                ho_so.ma = data['ma']
            
            if 'dia_diem' in data:
                ho_so.dia_diem = data['dia_diem']
            
            if 'ngay_gio' in data:
                ho_so.ngay_gio = datetime.fromisoformat(data['ngay_gio'].replace('Z', '+00:00'))
            
            if 'noi_dung_vu_viec' in data:
                ho_so.noi_dung_vu_viec = data['noi_dung_vu_viec']
            
            if 'nguyen_don_id' in data:
                nguyen_don = NguyenDon.query.get(data['nguyen_don_id'])
                if not nguyen_don:
                    raise ValueError("Nguyên đơn không tồn tại")
                ho_so.nguyen_don_id = data['nguyen_don_id']
            
            if 'bi_don_id' in data:
                bi_don = BiDon.query.get(data['bi_don_id'])
                if not bi_don:
                    raise ValueError("Bị đơn không tồn tại")
                ho_so.bi_don_id = data['bi_don_id']
            
            ho_so.updated_at = datetime.utcnow()
            db.session.commit()
            return ho_so
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def delete(ho_so_id):
        """Xóa hồ sơ thụ lý"""
        try:
            ho_so = HoSoThuLy.query.get(ho_so_id)
            if not ho_so:
                return False
            
            db.session.delete(ho_so)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def search_by_ma(ma):
        """Tìm kiếm hồ sơ theo mã"""
        return HoSoThuLy.query.filter(HoSoThuLy.ma.ilike(f'%{ma}%')).all()
    
    @staticmethod
    def search_by_nguyen_don(nguyen_don_id):
        """Tìm kiếm hồ sơ theo nguyên đơn"""
        return HoSoThuLy.query.filter_by(nguyen_don_id=nguyen_don_id).all()
    
    @staticmethod
    def search_by_bi_don(bi_don_id):
        """Tìm kiếm hồ sơ theo bị đơn"""
        return HoSoThuLy.query.filter_by(bi_don_id=bi_don_id).all()
    
    @staticmethod
    def search_by_date_range(start_date, end_date):
        """Tìm kiếm hồ sơ theo khoảng thời gian"""
        return HoSoThuLy.query.filter(
            HoSoThuLy.ngay_gio >= start_date,
            HoSoThuLy.ngay_gio <= end_date
        ).all()

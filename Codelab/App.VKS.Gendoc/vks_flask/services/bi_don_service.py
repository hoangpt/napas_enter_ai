from models import BiDon, db
from datetime import datetime

class BiDonService:
    
    @staticmethod
    def get_all():
        """Lấy tất cả bị đơn"""
        return BiDon.query.all()
    
    @staticmethod
    def get_by_id(bi_don_id):
        """Lấy bị đơn theo ID"""
        return BiDon.query.get(bi_don_id)
    
    @staticmethod
    def create(data):
        """Tạo bị đơn mới"""
        try:
            bi_don = BiDon(
                ten=data['ten'],
                dia_chi=data['dia_chi']
            )
            db.session.add(bi_don)
            db.session.commit()
            return bi_don
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def update(bi_don_id, data):
        """Cập nhật bị đơn"""
        try:
            bi_don = BiDon.query.get(bi_don_id)
            if not bi_don:
                return None
            
            if 'ten' in data:
                bi_don.ten = data['ten']
            if 'dia_chi' in data:
                bi_don.dia_chi = data['dia_chi']
            
            bi_don.updated_at = datetime.utcnow()
            db.session.commit()
            return bi_don
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def delete(bi_don_id):
        """Xóa bị đơn"""
        try:
            bi_don = BiDon.query.get(bi_don_id)
            if not bi_don:
                return False
            
            db.session.delete(bi_don)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def search_by_name(name):
        """Tìm kiếm bị đơn theo tên"""
        return BiDon.query.filter(BiDon.ten.ilike(f'%{name}%')).all()

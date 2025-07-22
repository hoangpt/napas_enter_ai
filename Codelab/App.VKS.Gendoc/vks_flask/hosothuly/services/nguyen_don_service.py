from hosothuly.repos import NguyenDon, db
from datetime import datetime

class NguyenDonService:
    
    @staticmethod
    def get_all():
        """Lấy tất cả nguyên đơn"""
        return NguyenDon.query.all()
    
    @staticmethod
    def get_by_id(nguyen_don_id):
        """Lấy nguyên đơn theo ID"""
        return NguyenDon.query.get(nguyen_don_id)
    
    @staticmethod
    def create(data):
        """Tạo nguyên đơn mới"""
        try:
            nguyen_don = NguyenDon(
                ten=data['ten'],
                dia_chi=data['dia_chi']
            )
            db.session.add(nguyen_don)
            db.session.commit()
            return nguyen_don
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def update(nguyen_don_id, data):
        """Cập nhật nguyên đơn"""
        try:
            nguyen_don = NguyenDon.query.get(nguyen_don_id)
            if not nguyen_don:
                return None
            
            if 'ten' in data:
                nguyen_don.ten = data['ten']
            if 'dia_chi' in data:
                nguyen_don.dia_chi = data['dia_chi']
            
            nguyen_don.updated_at = datetime.utcnow()
            db.session.commit()
            return nguyen_don
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def delete(nguyen_don_id):
        """Xóa nguyên đơn"""
        try:
            nguyen_don = NguyenDon.query.get(nguyen_don_id)
            if not nguyen_don:
                return False
            
            db.session.delete(nguyen_don)
            db.session.commit()
            return True
        except Exception as e:
            db.session.rollback()
            raise e
    
    @staticmethod
    def search_by_name(name):
        """Tìm kiếm nguyên đơn theo tên"""
        return NguyenDon.query.filter(NguyenDon.ten.ilike(f'%{name}%')).all()

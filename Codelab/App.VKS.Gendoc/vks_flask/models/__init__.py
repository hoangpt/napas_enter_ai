from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class NguyenDon(db.Model):
    __tablename__ = 'nguyen_don'
    
    id = db.Column(db.Integer, primary_key=True)
    ten = db.Column(db.String(200), nullable=False)
    dia_chi = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    ho_so_list = db.relationship('HoSoThuLy', backref='nguyen_don_ref', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'ten': self.ten,
            'dia_chi': self.dia_chi,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class BiDon(db.Model):
    __tablename__ = 'bi_don'
    
    id = db.Column(db.Integer, primary_key=True)
    ten = db.Column(db.String(200), nullable=False)
    dia_chi = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship
    ho_so_list = db.relationship('HoSoThuLy', backref='bi_don_ref', lazy=True)
    
    def to_dict(self):
        return {
            'id': self.id,
            'ten': self.ten,
            'dia_chi': self.dia_chi,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

class HoSoThuLy(db.Model):
    __tablename__ = 'ho_so_thu_ly'
    
    id = db.Column(db.Integer, primary_key=True)
    ma = db.Column(db.String(50), unique=True, nullable=False)
    dia_diem = db.Column(db.String(200), nullable=False)
    ngay_gio = db.Column(db.DateTime, nullable=False)
    noi_dung_vu_viec = db.Column(db.Text, nullable=False)
    
    # Foreign Keys
    nguyen_don_id = db.Column(db.Integer, db.ForeignKey('nguyen_don.id'), nullable=False)
    bi_don_id = db.Column(db.Integer, db.ForeignKey('bi_don.id'), nullable=False)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'ma': self.ma,
            'dia_diem': self.dia_diem,
            'ngay_gio': self.ngay_gio.isoformat() if self.ngay_gio else None,
            'noi_dung_vu_viec': self.noi_dung_vu_viec,
            'nguyen_don_id': self.nguyen_don_id,
            'bi_don_id': self.bi_don_id,
            'nguyen_don': self.nguyen_don_ref.to_dict() if self.nguyen_don_ref else None,
            'bi_don': self.bi_don_ref.to_dict() if self.bi_don_ref else None,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }
    
    def to_dict_simple(self):
        """Return simple dict without nested objects"""
        return {
            'id': self.id,
            'ma': self.ma,
            'dia_diem': self.dia_diem,
            'ngay_gio': self.ngay_gio.isoformat() if self.ngay_gio else None,
            'noi_dung_vu_viec': self.noi_dung_vu_viec,
            'nguyen_don_id': self.nguyen_don_id,
            'bi_don_id': self.bi_don_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

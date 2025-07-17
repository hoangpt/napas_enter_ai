from flask import Flask, jsonify
from models import db, NguyenDon, BiDon, HoSoThuLy
from controllers.nguyen_don_controller import nguyen_don_bp
from controllers.bi_don_controller import bi_don_bp
from controllers.ho_so_thu_ly_controller import ho_so_bp
import os

def create_app():
    app = Flask(__name__)
    
    # Cấu hình database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vks_app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Khởi tạo database
    db.init_app(app)
    
    # Đăng ký blueprints
    app.register_blueprint(nguyen_don_bp)
    app.register_blueprint(bi_don_bp)
    app.register_blueprint(ho_so_bp)
    
    # Route trang chủ
    @app.route('/')
    def index():
        return jsonify({
            'message': 'VKS Flask API - Hệ thống quản lý vụ việc', 
            'version': '2.0',
            'endpoints': {
                'nguyen_don': '/api/nguyen-don',
                'bi_don': '/api/bi-don',
                'ho_so_thu_ly': '/api/ho-so'
            }
        })
    
    # Route thống kê
    @app.route('/api/statistics')
    def get_statistics():
        try:
            with app.app_context():
                nguyen_don_count = NguyenDon.query.count()
                bi_don_count = BiDon.query.count()
                ho_so_count = HoSoThuLy.query.count()
                
                return jsonify({
                    'tong_nguyen_don': nguyen_don_count,
                    'tong_bi_don': bi_don_count,
                    'tong_ho_so': ho_so_count
                })
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Không tìm thấy resource'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Lỗi server nội bộ'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        db.create_all()
        print("Database đã được tạo thành công!")
    
    print("Đang khởi động VKS Flask API...")
    print("API endpoints:")
    print("- GET /api/nguyen-don (Danh sách nguyên đơn)")
    print("- POST /api/nguyen-don (Tạo nguyên đơn)")
    print("- GET /api/bi-don (Danh sách bị đơn)")
    print("- POST /api/bi-don (Tạo bị đơn)")
    print("- GET /api/ho-so (Danh sách hồ sơ)")
    print("- POST /api/ho-so (Tạo hồ sơ)")
    print("- GET /api/statistics (Thống kê)")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

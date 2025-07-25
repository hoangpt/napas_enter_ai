import os
from dotenv import load_dotenv

# Load environment variables FIRST
load_dotenv()

from flask import Flask
from flask_restx import Api, Resource
from flask_cors import CORS
from hosothuly.repos import db, NguyenDon, BiDon, HoSoThuLy
from swagger_models import get_swagger_models
from hosothuly.controllers.nguyen_don_controller import nguyen_don_ns, init_models as init_nguyen_don_models
from hosothuly.controllers.bi_don_controller import bi_don_ns, init_models as init_bi_don_models
from hosothuly.controllers.ho_so_thu_ly_controller import ho_so_ns, init_models as init_ho_so_models
from hosothuly.controllers.upload_controller import upload_ns, init_models as init_upload_models
from config import Config

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_object(Config)
    
    # Cấu hình CORS cho tất cả các endpoint
    CORS(app, 
         origins="*",  # Cho phép tất cả các origin
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],  # Cho phép tất cả HTTP methods
         allow_headers=["Content-Type", "Authorization", "Accept", "Origin", "X-Requested-With"]
    )
    
    # Cấu hình database
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///vks_app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # Khởi tạo database
    db.init_app(app)
    
    # Cấu hình Swagger
    api = Api(
        app,
        version='2.0',
        title='VKS Flask API - Hệ thống quản lý vụ việc',
        description='''
        API quản lý vụ việc của Viện Kiểm sát với đầy đủ tính năng CRUD cho:
        - Nguyên đơn (người khởi kiện)
        - Bị đơn (người bị kiện) 
        - Hồ sơ thụ lý (vụ việc)
        
        Hệ thống hỗ trợ tìm kiếm, lọc và thống kê dữ liệu.
        ''',
        contact='VKS Development Team',
        contact_email='dev@vks.gov.vn',
        doc='/swagger/',
        prefix='/api'
    )
    
    # Tạo và đăng ký Swagger repos
    swagger_models = get_swagger_models(api)
    
    # Inject repos vào controllers
    init_nguyen_don_models(swagger_models)
    init_bi_don_models(swagger_models)
    init_ho_so_models(swagger_models)
    init_upload_models(swagger_models)
    
    # Đăng ký namespaces
    api.add_namespace(nguyen_don_ns, path='/nguyen-don')
    api.add_namespace(bi_don_ns, path='/bi-don')
    api.add_namespace(ho_so_ns, path='/ho-so')
    api.add_namespace(upload_ns, path='/upload')
    
    # Namespace cho thống kê
    stats_ns = api.namespace('statistics', description='API thống kê tổng quan')
    
    @stats_ns.route('')
    class Statistics(Resource):
        @stats_ns.doc('get_statistics')
        @stats_ns.marshal_with(swagger_models['statistics_model'])
        @stats_ns.response(200, 'Thành công')
        @stats_ns.response(500, 'Lỗi server', swagger_models['error_model'])
        def get(self):
            """Lấy thống kê tổng quan hệ thống"""
            try:
                with app.app_context():
                    nguyen_don_count = NguyenDon.query.count()
                    bi_don_count = BiDon.query.count()
                    ho_so_count = HoSoThuLy.query.count()
                    
                    return {
                        'tong_nguyen_don': nguyen_don_count,
                        'tong_bi_don': bi_don_count,
                        'tong_ho_so': ho_so_count
                    }
            except Exception as e:
                return {'error': str(e)}, 500
    
    # Route trang chủ (ngoài API)
    @app.route('/')
    def index():
        return {
            'message': 'VKS Flask API - Hệ thống quản lý vụ việc', 
            'version': '2.0',
            'swagger_docs': '/swagger/',
            'api_endpoints': {
                'nguyen_don': '/api/nguyen-don',
                'bi_don': '/api/bi-don',
                'ho_so_thu_ly': '/api/ho-so',
                'statistics': '/api/statistics'
            }
        }
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return {'error': 'Không tìm thấy resource'}, 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return {'error': 'Lỗi server nội bộ'}, 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        db.create_all()
        print("Database đã được tạo thành công!")
    
    print("Đang khởi động VKS Flask API với Swagger Documentation...")
    print("API Documentation: http://localhost:5000/swagger/")
    print("API endpoints:")
    print("- GET /api/nguyen-don (Danh sách nguyên đơn)")
    print("- POST /api/nguyen-don (Tạo nguyên đơn)")
    print("- GET /api/bi-don (Danh sách bị đơn)")
    print("- POST /api/bi-don (Tạo bị đơn)")
    print("- GET /api/ho-so (Danh sách hồ sơ)")
    print("- POST /api/ho-so (Tạo hồ sơ)")
    print("- GET /api/statistics (Thống kê)")
    
    app.run(debug=True, host='0.0.0.0', port=5000)

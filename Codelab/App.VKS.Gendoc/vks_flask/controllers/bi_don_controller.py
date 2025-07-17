from flask import request
from flask_restx import Resource, Namespace
from services.bi_don_service import BiDonService

# Tạo namespace cho Swagger
bi_don_ns = Namespace('bi-don', description='API quản lý bị đơn (người bị kiện)')

# Models sẽ được inject từ app
models = {}

def init_models(swagger_models):
    global models
    models.update(swagger_models)

@bi_don_ns.route('')
class BiDonList(Resource):
    @bi_don_ns.doc('get_bi_don_list')
    @bi_don_ns.param('search', 'Tìm kiếm theo tên bị đơn', type='string', required=False)
    @bi_don_ns.response(200, 'Thành công')
    @bi_don_ns.response(500, 'Lỗi server')
    def get(self):
        """Lấy danh sách bị đơn"""
        try:
            search_name = request.args.get('search')
            
            if search_name:
                bi_don_list = BiDonService.search_by_name(search_name)
            else:
                bi_don_list = BiDonService.get_all()
            
            return [bi_don.to_dict() for bi_don in bi_don_list], 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @bi_don_ns.doc('create_bi_don')
    @bi_don_ns.expect(models.get('bi_don_input'))
    @bi_don_ns.response(201, 'Tạo thành công')
    @bi_don_ns.response(400, 'Dữ liệu không hợp lệ')
    @bi_don_ns.response(500, 'Lỗi server')
    def post(self):
        """Tạo bị đơn mới"""
        try:
            data = request.get_json()
            
            # Validate dữ liệu
            if not data or 'ten' not in data or 'dia_chi' not in data:
                return {'error': 'Tên và địa chỉ là bắt buộc'}, 400
            
            if not data['ten'].strip():
                return {'error': 'Tên không được để trống'}, 400
            
            if not data['dia_chi'].strip():
                return {'error': 'Địa chỉ không được để trống'}, 400
            
            bi_don = BiDonService.create(data)
            return bi_don.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 500

@bi_don_ns.route('/<int:bi_don_id>')
@bi_don_ns.param('bi_don_id', 'ID của bị đơn')
class BiDonDetail(Resource):
    @bi_don_ns.doc('get_bi_don')
    @bi_don_ns.response(200, 'Thành công')
    @bi_don_ns.response(404, 'Không tìm thấy')
    @bi_don_ns.response(500, 'Lỗi server')
    def get(self, bi_don_id):
        """Lấy thông tin bị đơn theo ID"""
        try:
            bi_don = BiDonService.get_by_id(bi_don_id)
            if not bi_don:
                return {'error': 'Bị đơn không tồn tại'}, 404
            
            return bi_don.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @bi_don_ns.doc('update_bi_don')
    @bi_don_ns.expect(models.get('bi_don_input'))
    @bi_don_ns.response(200, 'Cập nhật thành công')
    @bi_don_ns.response(400, 'Dữ liệu không hợp lệ')
    @bi_don_ns.response(404, 'Không tìm thấy')
    @bi_don_ns.response(500, 'Lỗi server')
    def put(self, bi_don_id):
        """Cập nhật bị đơn"""
        try:
            data = request.get_json()
            
            if not data:
                return {'error': 'Dữ liệu cập nhật là bắt buộc'}, 400
            
            # Validate dữ liệu nếu có
            if 'ten' in data and not data['ten'].strip():
                return {'error': 'Tên không được để trống'}, 400
            
            if 'dia_chi' in data and not data['dia_chi'].strip():
                return {'error': 'Địa chỉ không được để trống'}, 400
            
            bi_don = BiDonService.update(bi_don_id, data)
            if not bi_don:
                return {'error': 'Bị đơn không tồn tại'}, 404
            
            return bi_don.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @bi_don_ns.doc('delete_bi_don')
    @bi_don_ns.response(200, 'Xóa thành công')
    @bi_don_ns.response(404, 'Không tìm thấy')
    @bi_don_ns.response(500, 'Lỗi server')
    def delete(self, bi_don_id):
        """Xóa bị đơn"""
        try:
            success = BiDonService.delete(bi_don_id)
            if not success:
                return {'error': 'Bị đơn không tồn tại'}, 404
            
            return {'message': 'Xóa bị đơn thành công'}, 200
        except Exception as e:
            return {'error': str(e)}, 500

from flask import request
from flask_restx import Resource, Namespace
from services.nguyen_don_service import NguyenDonService

# Tạo namespace cho Swagger
nguyen_don_ns = Namespace('nguyen-don', description='API quản lý nguyên đơn (người khởi kiện)')

# Models sẽ được inject từ app
models = {}

def init_models(swagger_models):
    global models
    models.update(swagger_models)

@nguyen_don_ns.route('')
class NguyenDonList(Resource):
    @nguyen_don_ns.doc('get_nguyen_don_list')
    @nguyen_don_ns.param('search', 'Tìm kiếm theo tên nguyên đơn', type='string', required=False)
    @nguyen_don_ns.response(200, 'Thành công')
    @nguyen_don_ns.response(500, 'Lỗi server')
    def get(self):
        """Lấy danh sách nguyên đơn"""
        try:
            search_name = request.args.get('search')
            
            if search_name:
                nguyen_don_list = NguyenDonService.search_by_name(search_name)
            else:
                nguyen_don_list = NguyenDonService.get_all()
            
            return [nguyen_don.to_dict() for nguyen_don in nguyen_don_list], 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @nguyen_don_ns.doc('create_nguyen_don')
    @nguyen_don_ns.expect(models.get('nguyen_don_input'))
    @nguyen_don_ns.response(201, 'Tạo thành công')
    @nguyen_don_ns.response(400, 'Dữ liệu không hợp lệ')
    @nguyen_don_ns.response(500, 'Lỗi server')
    def post(self):
        """Tạo nguyên đơn mới"""
        try:
            data = request.get_json()
            
            # Validate dữ liệu
            if not data or 'ten' not in data or 'dia_chi' not in data:
                return {'error': 'Tên và địa chỉ là bắt buộc'}, 400
            
            if not data['ten'].strip():
                return {'error': 'Tên không được để trống'}, 400
            
            if not data['dia_chi'].strip():
                return {'error': 'Địa chỉ không được để trống'}, 400
            
            nguyen_don = NguyenDonService.create(data)
            return nguyen_don.to_dict(), 201
        except Exception as e:
            return {'error': str(e)}, 500

@nguyen_don_ns.route('/<int:nguyen_don_id>')
@nguyen_don_ns.param('nguyen_don_id', 'ID của nguyên đơn')
class NguyenDonDetail(Resource):
    @nguyen_don_ns.doc('get_nguyen_don')
    @nguyen_don_ns.response(200, 'Thành công')
    @nguyen_don_ns.response(404, 'Không tìm thấy')
    @nguyen_don_ns.response(500, 'Lỗi server')
    def get(self, nguyen_don_id):
        """Lấy thông tin nguyên đơn theo ID"""
        try:
            nguyen_don = NguyenDonService.get_by_id(nguyen_don_id)
            if not nguyen_don:
                return {'error': 'Nguyên đơn không tồn tại'}, 404
            
            return nguyen_don.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @nguyen_don_ns.doc('update_nguyen_don')
    @nguyen_don_ns.expect(models.get('nguyen_don_input'))
    @nguyen_don_ns.response(200, 'Cập nhật thành công')
    @nguyen_don_ns.response(400, 'Dữ liệu không hợp lệ')
    @nguyen_don_ns.response(404, 'Không tìm thấy')
    @nguyen_don_ns.response(500, 'Lỗi server')
    def put(self, nguyen_don_id):
        """Cập nhật nguyên đơn"""
        try:
            data = request.get_json()
            
            if not data:
                return {'error': 'Dữ liệu cập nhật là bắt buộc'}, 400
            
            # Validate dữ liệu nếu có
            if 'ten' in data and not data['ten'].strip():
                return {'error': 'Tên không được để trống'}, 400
            
            if 'dia_chi' in data and not data['dia_chi'].strip():
                return {'error': 'Địa chỉ không được để trống'}, 400
            
            nguyen_don = NguyenDonService.update(nguyen_don_id, data)
            if not nguyen_don:
                return {'error': 'Nguyên đơn không tồn tại'}, 404
            
            return nguyen_don.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @nguyen_don_ns.doc('delete_nguyen_don')
    @nguyen_don_ns.response(200, 'Xóa thành công')
    @nguyen_don_ns.response(404, 'Không tìm thấy')
    @nguyen_don_ns.response(500, 'Lỗi server')
    def delete(self, nguyen_don_id):
        """Xóa nguyên đơn"""
        try:
            success = NguyenDonService.delete(nguyen_don_id)
            if not success:
                return {'error': 'Nguyên đơn không tồn tại'}, 404
            
            return {'message': 'Xóa nguyên đơn thành công'}, 200
        except Exception as e:
            return {'error': str(e)}, 500

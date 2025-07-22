from flask import request
from flask_restx import Resource, Namespace
from hosothuly.services.ho_so_thu_ly_service import HoSoThuLyService
from datetime import datetime

# Tạo namespace cho Swagger
ho_so_ns = Namespace('ho-so', description='API quản lý hồ sơ thụ lý')

# Models sẽ được inject từ app
models = {}

def init_models(swagger_models):
    global models
    models.update(swagger_models)

@ho_so_ns.route('')
class HoSoList(Resource):
    @ho_so_ns.doc('get_ho_so_list')
    @ho_so_ns.param('ma', 'Tìm kiếm theo mã hồ sơ', type='string', required=False)
    @ho_so_ns.param('nguyen_don_id', 'Tìm kiếm theo ID nguyên đơn', type='integer', required=False)
    @ho_so_ns.param('bi_don_id', 'Tìm kiếm theo ID bị đơn', type='integer', required=False)
    @ho_so_ns.param('start_date', 'Ngày bắt đầu (ISO format)', type='string', required=False)
    @ho_so_ns.param('end_date', 'Ngày kết thúc (ISO format)', type='string', required=False)
    @ho_so_ns.response(200, 'Thành công')
    @ho_so_ns.response(500, 'Lỗi server')
    def get(self):
        """Lấy danh sách hồ sơ thụ lý với các tùy chọn tìm kiếm"""
        try:
            # Kiểm tra các tham số tìm kiếm
            search_ma = request.args.get('ma')
            nguyen_don_id = request.args.get('nguyen_don_id')
            bi_don_id = request.args.get('bi_don_id')
            start_date = request.args.get('start_date')
            end_date = request.args.get('end_date')
            
            if search_ma:
                ho_so_list = HoSoThuLyService.search_by_ma(search_ma)
            elif nguyen_don_id:
                ho_so_list = HoSoThuLyService.search_by_nguyen_don(int(nguyen_don_id))
            elif bi_don_id:
                ho_so_list = HoSoThuLyService.search_by_bi_don(int(bi_don_id))
            elif start_date and end_date:
                start = datetime.fromisoformat(start_date)
                end = datetime.fromisoformat(end_date)
                ho_so_list = HoSoThuLyService.search_by_date_range(start, end)
            else:
                ho_so_list = HoSoThuLyService.get_all()
            
            return [ho_so.to_dict() for ho_so in ho_so_list], 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @ho_so_ns.doc('create_ho_so')
    @ho_so_ns.expect(models.get('ho_so_input'))
    @ho_so_ns.response(201, 'Tạo thành công')
    @ho_so_ns.response(400, 'Dữ liệu không hợp lệ')
    @ho_so_ns.response(500, 'Lỗi server')
    def post(self):
        """Tạo hồ sơ thụ lý mới"""
        try:
            data = request.get_json()
            
            # Validate dữ liệu
            required_fields = ['ma', 'dia_diem', 'ngay_gio', 'noi_dung_vu_viec', 'nguyen_don_id', 'bi_don_id']
            for field in required_fields:
                if field not in data:
                    return {'error': f'{field} là bắt buộc'}, 400
            
            # Validate dữ liệu không rỗng
            if not data['ma'].strip():
                return {'error': 'Mã hồ sơ không được để trống'}, 400
            
            if not data['dia_diem'].strip():
                return {'error': 'Địa điểm không được để trống'}, 400
            
            if not data['noi_dung_vu_viec'].strip():
                return {'error': 'Nội dung vụ việc không được để trống'}, 400
            
            # Validate datetime format
            try:
                datetime.fromisoformat(data['ngay_gio'].replace('Z', '+00:00'))
            except ValueError:
                return {'error': 'Định dạng ngày giờ không hợp lệ (ISO format required)'}, 400
            
            ho_so = HoSoThuLyService.create(data)
            return ho_so.to_dict(), 201
        except ValueError as e:
            return {'error': str(e)}, 400
        except Exception as e:
            return {'error': str(e)}, 500

@ho_so_ns.route('/<int:ho_so_id>')
@ho_so_ns.param('ho_so_id', 'ID của hồ sơ')
class HoSoDetail(Resource):
    @ho_so_ns.doc('get_ho_so')
    @ho_so_ns.response(200, 'Thành công')
    @ho_so_ns.response(404, 'Không tìm thấy')
    @ho_so_ns.response(500, 'Lỗi server')
    def get(self, ho_so_id):
        """Lấy thông tin hồ sơ thụ lý theo ID"""
        try:
            ho_so = HoSoThuLyService.get_by_id(ho_so_id)
            if not ho_so:
                return {'error': 'Hồ sơ không tồn tại'}, 404
            
            return ho_so.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 500
    
    @ho_so_ns.doc('update_ho_so')
    @ho_so_ns.expect(models.get('ho_so_input'))
    @ho_so_ns.response(200, 'Cập nhật thành công')
    @ho_so_ns.response(400, 'Dữ liệu không hợp lệ')
    @ho_so_ns.response(404, 'Không tìm thấy')
    @ho_so_ns.response(500, 'Lỗi server')
    def put(self, ho_so_id):
        """Cập nhật hồ sơ thụ lý"""
        try:
            data = request.get_json()
            
            if not data:
                return {'error': 'Dữ liệu cập nhật là bắt buộc'}, 400
            
            # Validate dữ liệu nếu có
            if 'ma' in data and not data['ma'].strip():
                return {'error': 'Mã hồ sơ không được để trống'}, 400
            
            if 'dia_diem' in data and not data['dia_diem'].strip():
                return {'error': 'Địa điểm không được để trống'}, 400
            
            if 'noi_dung_vu_viec' in data and not data['noi_dung_vu_viec'].strip():
                return {'error': 'Nội dung vụ việc không được để trống'}, 400
            
            # Validate datetime format nếu có
            if 'ngay_gio' in data:
                try:
                    datetime.fromisoformat(data['ngay_gio'].replace('Z', '+00:00'))
                except ValueError:
                    return {'error': 'Định dạng ngày giờ không hợp lệ (ISO format required)'}, 400
            
            ho_so = HoSoThuLyService.update(ho_so_id, data)
            if not ho_so:
                return {'error': 'Hồ sơ không tồn tại'}, 404
            
            return ho_so.to_dict(), 200
        except ValueError as e:
            return {'error': str(e)}, 400
        except Exception as e:
            return {'error': str(e)}, 500
    
    @ho_so_ns.doc('delete_ho_so')
    @ho_so_ns.response(200, 'Xóa thành công')
    @ho_so_ns.response(404, 'Không tìm thấy')
    @ho_so_ns.response(500, 'Lỗi server')
    def delete(self, ho_so_id):
        """Xóa hồ sơ thụ lý"""
        try:
            success = HoSoThuLyService.delete(ho_so_id)
            if not success:
                return {'error': 'Hồ sơ không tồn tại'}, 404
            
            return {'message': 'Xóa hồ sơ thành công'}, 200
        except Exception as e:
            return {'error': str(e)}, 500

@ho_so_ns.route('/ma/<string:ma>')
@ho_so_ns.param('ma', 'Mã hồ sơ')
class HoSoByMa(Resource):
    @ho_so_ns.doc('get_ho_so_by_ma')
    @ho_so_ns.response(200, 'Thành công')
    @ho_so_ns.response(404, 'Không tìm thấy')
    @ho_so_ns.response(500, 'Lỗi server')
    def get(self, ma):
        """Lấy thông tin hồ sơ thụ lý theo mã"""
        try:
            ho_so = HoSoThuLyService.get_by_ma(ma)
            if not ho_so:
                return {'error': 'Hồ sơ không tồn tại'}, 404
            
            return ho_so.to_dict(), 200
        except Exception as e:
            return {'error': str(e)}, 500

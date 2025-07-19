from flask_restx import fields

def get_swagger_models(api):
    """Định nghĩa các model cho Swagger documentation"""
    
    # Model cho NguyenDon
    nguyen_don_model = api.model('NguyenDon', {
        'id': fields.Integer(description='ID nguyên đơn', example=1),
        'ten': fields.String(required=True, description='Tên nguyên đơn', example='Nguyễn Văn A'),
        'dia_chi': fields.String(required=True, description='Địa chỉ nguyên đơn', example='123 Đường ABC, Quận 1, TP.HCM'),
        'created_at': fields.DateTime(description='Ngày tạo', example='2025-01-17T14:30:00'),
        'updated_at': fields.DateTime(description='Ngày cập nhật', example='2025-01-17T14:30:00')
    })
    
    nguyen_don_input = api.model('NguyenDonInput', {
        'ten': fields.String(required=True, description='Tên nguyên đơn', example='Nguyễn Văn A'),
        'dia_chi': fields.String(required=True, description='Địa chỉ nguyên đơn', example='123 Đường ABC, Quận 1, TP.HCM')
    })
    
    # Model cho BiDon
    bi_don_model = api.model('BiDon', {
        'id': fields.Integer(description='ID bị đơn', example=1),
        'ten': fields.String(required=True, description='Tên bị đơn', example='Trần Thị B'),
        'dia_chi': fields.String(required=True, description='Địa chỉ bị đơn', example='456 Đường XYZ, Quận 2, TP.HCM'),
        'created_at': fields.DateTime(description='Ngày tạo', example='2025-01-17T14:30:00'),
        'updated_at': fields.DateTime(description='Ngày cập nhật', example='2025-01-17T14:30:00')
    })
    
    bi_don_input = api.model('BiDonInput', {
        'ten': fields.String(required=True, description='Tên bị đơn', example='Trần Thị B'),
        'dia_chi': fields.String(required=True, description='Địa chỉ bị đơn', example='456 Đường XYZ, Quận 2, TP.HCM')
    })
    
    # Model cho HoSoThuLy
    ho_so_model = api.model('HoSoThuLy', {
        'id': fields.Integer(description='ID hồ sơ', example=1),
        'ma': fields.String(required=True, description='Mã hồ sơ', example='HS001-2025'),
        'dia_diem': fields.String(required=True, description='Địa điểm xử lý', example='Tòa án Nhân dân Quận 1'),
        'ngay_gio': fields.DateTime(required=True, description='Ngày giờ xử lý', example='2025-01-17T14:30:00'),
        'noi_dung_vu_viec': fields.String(required=True, description='Nội dung vụ việc', example='Vụ tranh chấp hợp đồng mua bán nhà đất'),
        'nguyen_don_id': fields.Integer(required=True, description='ID nguyên đơn', example=1),
        'bi_don_id': fields.Integer(required=True, description='ID bị đơn', example=1),
        'nguyen_don': fields.Nested(nguyen_don_model, description='Thông tin nguyên đơn'),
        'bi_don': fields.Nested(bi_don_model, description='Thông tin bị đơn'),
        'created_at': fields.DateTime(description='Ngày tạo', example='2025-01-17T14:30:00'),
        'updated_at': fields.DateTime(description='Ngày cập nhật', example='2025-01-17T14:30:00')
    })
    
    ho_so_input = api.model('HoSoThuLyInput', {
        'ma': fields.String(required=True, description='Mã hồ sơ', example='HS001-2025'),
        'dia_diem': fields.String(required=True, description='Địa điểm xử lý', example='Tòa án Nhân dân Quận 1'),
        'ngay_gio': fields.DateTime(required=True, description='Ngày giờ xử lý (ISO format)', example='2025-01-17T14:30:00'),
        'noi_dung_vu_viec': fields.String(required=True, description='Nội dung vụ việc', example='Vụ tranh chấp hợp đồng mua bán nhà đất'),
        'nguyen_don_id': fields.Integer(required=True, description='ID nguyên đơn', example=1),
        'bi_don_id': fields.Integer(required=True, description='ID bị đơn', example=1)
    })
    
    # Model cho thống kê
    statistics_model = api.model('Statistics', {
        'tong_nguyen_don': fields.Integer(description='Tổng số nguyên đơn', example=10),
        'tong_bi_don': fields.Integer(description='Tổng số bị đơn', example=8),
        'tong_ho_so': fields.Integer(description='Tổng số hồ sơ', example=5)
    })
    
    # Model cho error response
    error_model = api.model('Error', {
        'error': fields.String(description='Thông báo lỗi', example='Không tìm thấy resource')
    })
    
    # Model cho success response
    success_model = api.model('Success', {
        'message': fields.String(description='Thông báo thành công', example='Xóa thành công')
    })
    
    # Models cho Upload API
    upload_response_model = api.model('UploadResponse', {
        'success': fields.Boolean(description='Trạng thái xử lý', example=True),
        'message': fields.String(description='Thông báo', example='Upload và xử lý thành công'),
        'extracted_data': fields.Raw(description='Dữ liệu được extract từ OCR'),
        'existing_records': fields.Raw(description='Các bản ghi đã tồn tại trong hệ thống'),
        'processing_result': fields.Raw(description='Kết quả xử lý và lưu dữ liệu'),
        'ocr_raw_response': fields.String(description='Raw response từ Azure OpenAI')
    })
    
    extract_only_response_model = api.model('ExtractOnlyResponse', {
        'success': fields.Boolean(description='Trạng thái extract', example=True),
        'extracted_data': fields.Raw(description='Dữ liệu được extract từ OCR'),
        'raw_response': fields.String(description='Raw response từ Azure OpenAI')
    })
    
    upload_test_response_model = api.model('UploadTestResponse', {
        'message': fields.String(description='Trạng thái API', example='Upload API đang hoạt động'),
        'azure_configured': fields.Boolean(description='Azure OpenAI đã cấu hình', example=True),
        'upload_folder': fields.String(description='Thư mục upload', example='uploads'),
        'max_file_size': fields.String(description='Kích thước file tối đa', example='16MB')
    })
    
    return {
        'nguyen_don_model': nguyen_don_model,
        'nguyen_don_input': nguyen_don_input,
        'bi_don_model': bi_don_model,
        'bi_don_input': bi_don_input,
        'ho_so_model': ho_so_model,
        'ho_so_input': ho_so_input,
        'statistics_model': statistics_model,
        'error_model': error_model,
        'success_model': success_model,
        'upload_response_model': upload_response_model,
        'extract_only_response_model': extract_only_response_model,
        'upload_test_response_model': upload_test_response_model
    }

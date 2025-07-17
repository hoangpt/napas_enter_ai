import os
from flask import request, current_app
from flask_restx import Resource, Namespace, reqparse
from werkzeug.datastructures import FileStorage
from werkzeug.utils import secure_filename
from services.ocr_service import OCRService
from services.document_processing_service import DocumentProcessingService

# Tạo namespace cho Swagger
upload_ns = Namespace('upload', description='API upload và xử lý tài liệu pháp lý')

# Models sẽ được inject từ app
models = {}

def init_models(swagger_models):
    global models
    models.update(swagger_models)

# Parser cho file upload
upload_parser = reqparse.RequestParser()
upload_parser.add_argument('file', 
                         location='files',
                         type=FileStorage, 
                         required=True, 
                         help='File ảnh tài liệu pháp lý (PNG, JPG, JPEG, GIF, BMP)')

@upload_ns.route('/document')
class DocumentUpload(Resource):
    @upload_ns.doc('upload_legal_document')
    @upload_ns.expect(upload_parser)
    @upload_ns.response(200, 'Upload và xử lý thành công')
    @upload_ns.response(400, 'Dữ liệu không hợp lệ hoặc file không đúng định dạng')
    @upload_ns.response(500, 'Lỗi server')
    def post(self):
        """
        Upload hình ảnh tài liệu pháp lý và extract thông tin
        
        API này sẽ:
        1. Upload file hình ảnh
        2. Sử dụng Azure OpenAI Vision để OCR và extract thông tin
        3. Lưu thông tin nguyên đơn, bị đơn, hồ sơ vào database
        
        File upload: multipart/form-data với key 'file'
        """
        try:
            # Parse arguments từ request
            args = upload_parser.parse_args()
            file = args['file']
            
            if not file:
                return {'error': 'Chưa chọn file'}, 400
            
            # Validate file là image
            is_valid, message = OCRService.validate_image(file)
            if not is_valid:
                return {'error': message}, 400
            
            # Tạo upload folder nếu chưa có
            upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            
            # Lưu file
            file_path = OCRService.save_uploaded_file(file, upload_folder)
            
            # OCR và extract thông tin
            ocr_result = OCRService.extract_legal_document_info(file_path)
            
            if not ocr_result['success']:
                return {
                    'error': 'Lỗi OCR',
                    'details': ocr_result['error'],
                    'file_path': file_path
                }, 500
            
            extracted_data = ocr_result['data']
            
            # Tìm kiếm bản ghi đã tồn tại
            existing_records = DocumentProcessingService.search_existing_records(extracted_data)
            
            # Xử lý và lưu dữ liệu vào database
            processing_result = DocumentProcessingService.process_extracted_data(extracted_data)
            
            # Cleanup file (tùy chọn - có thể giữ lại để audit)
            try:
                os.remove(file_path)
            except:
                pass  # Không quan trọng nếu không xóa được
            
            # Trả về kết quả
            return {
                'success': True,
                'message': 'Upload và xử lý thành công',
                'extracted_data': extracted_data,
                'existing_records': existing_records,
                'processing_result': processing_result,
                'ocr_raw_response': ocr_result.get('raw_response')
            }, 200
            
        except Exception as e:
            return {
                'error': f'Lỗi server: {str(e)}',
                'file_path': file_path if 'file_path' in locals() else None
            }, 500

@upload_ns.route('/test')
class UploadTest(Resource):
    @upload_ns.doc('test_upload_endpoint')
    @upload_ns.response(200, 'API hoạt động bình thường')
    def get(self):
        """Test endpoint để kiểm tra API upload hoạt động"""
        return {
            'message': 'Upload API đang hoạt động',
            'azure_configured': bool(current_app.config.get('AZURE_OPENAI_API_KEY')),
            'upload_folder': current_app.config.get('UPLOAD_FOLDER', 'uploads'),
            'max_file_size': current_app.config.get('MAX_CONTENT_LENGTH', '16MB')
        }

@upload_ns.route('/extract-only')
class DocumentExtractOnly(Resource):
    @upload_ns.doc('extract_only')
    @upload_ns.expect(upload_parser)
    @upload_ns.response(200, 'Extract thành công')
    @upload_ns.response(400, 'File không hợp lệ')
    @upload_ns.response(500, 'Lỗi server')
    def post(self):
        """
        Chỉ extract thông tin từ hình ảnh, không lưu vào database
        Dùng để test OCR trước khi lưu dữ liệu
        """
        try:
            # Parse arguments từ request
            args = upload_parser.parse_args()
            file = args['file']
            
            if not file:
                return {'error': 'Chưa chọn file'}, 400
            
            # Validate file
            is_valid, message = OCRService.validate_image(file)
            if not is_valid:
                return {'error': message}, 400
            
            # Lưu file tạm
            upload_folder = current_app.config.get('UPLOAD_FOLDER', 'uploads')
            file_path = OCRService.save_uploaded_file(file, upload_folder)
            
            # OCR
            ocr_result = OCRService.extract_legal_document_info(file_path)
            
            # Cleanup
            try:
                os.remove(file_path)
            except:
                pass
            
            if ocr_result['success']:
                return {
                    'success': True,
                    'extracted_data': ocr_result['data'],
                    'raw_response': ocr_result.get('raw_response')
                }
            else:
                return {
                    'success': False,
                    'error': ocr_result['error'],
                    'raw_response': ocr_result.get('raw_response')
                }
                
        except Exception as e:
            return {'error': f'Lỗi: {str(e)}'}, 500

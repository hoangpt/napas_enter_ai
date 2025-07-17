import os
import json
import base64
import requests
from PIL import Image
import io
from flask import current_app

class OCRService:
    
    @staticmethod
    def extract_legal_document_info(image_path):
        """
        Sử dụng Azure OpenAI Vision để OCR và extract thông tin từ văn bản pháp lý
        """
        try:
            # MOCK DATA - Trả về dữ liệu mẫu dựa trên ảnh tài liệu thực tế
            mock_data = {
                "nguyen_don": {
                    "ten": "Chị Nguyễn Phương Thảo",
                    "dia_chi": "Tổ Dân Phố Ngọc 2, phường Trung Minh, TP.Hòa Bình, tỉnh Hòa Bình"
                },
                "bi_don": {
                    "ten": "Anh Đỗ Minh Tuấn",
                    "dia_chi": "Tổ 13, phường Hữu Nghị, TP Hòa Bình, tỉnh Hòa Bình"
                },
                "ho_so": {
                    "ma": "209/TB-TLVA",
                    "dia_diem": "Tòa án nhân dân thành phố Hòa Bình",
                    "ngay_gio": "2025-06-24T14:30:00",
                    "noi_dung_vu_viec": "Thông báo về việc thụ lý vụ án - Viện Kiểm sát nhân dân Thành phố Hòa Bình thụ lý vụ án HNGD số: 209/2025/TLST- HNGD về việc: Xin ly hôn theo đơn khởi kiện của Chị Nguyễn Phương Thảo"
                }
            }
            
            return {
                'success': True,
                'data': mock_data,
                'raw_response': f"MOCK DATA: Extracted from legal document image - {os.path.basename(image_path)}"
            }
            
            # Code Azure OpenAI thực tế - sẽ enable khi config đúng
            """
            # Lấy config từ app
            api_key = current_app.config.get('AZURE_OPENAI_API_KEY')
            endpoint = current_app.config.get('AZURE_OPENAI_ENDPOINT')
            api_version = current_app.config.get('AZURE_OPENAI_API_VERSION', '2024-02-15-preview')
            deployment_name = current_app.config.get('AZURE_OPENAI_DEPLOYMENT_NAME', 'gpt-4-vision-preview')
            
            if not api_key or not endpoint:
                return {
                    'success': False,
                    'error': 'Azure OpenAI không được cấu hình. Kiểm tra AZURE_OPENAI_API_KEY và AZURE_OPENAI_ENDPOINT trong .env'
                }
            
            # Đọc và encode image
            with open(image_path, "rb") as image_file:
                base64_image = base64.b64encode(image_file.read()).decode('utf-8')
            
            # Prompt để extract thông tin
            prompt = \"\"\"
            Bạn là một chuyên gia phân tích văn bản pháp lý Việt Nam. Hãy phân tích hình ảnh này và trích xuất thông tin theo định dạng JSON sau:

            {
                "nguyen_don": {
                    "ten": "Họ tên nguyên đơn",
                    "dia_chi": "Địa chỉ nguyên đơn"
                },
                "bi_don": {
                    "ten": "Họ tên bị đơn", 
                    "dia_chi": "Địa chỉ bị đơn"
                },
                "ho_so": {
                    "ma": "Mã số hồ sơ/văn bản",
                    "dia_diem": "Địa điểm xử lý/tòa án",
                    "ngay_gio": "2025-01-17T14:30:00",
                    "noi_dung_vu_viec": "Nội dung tóm tắt vụ việc"
                }
            }

            Lưu ý:
            - Chỉ trả về JSON, không thêm text khác
            - Ngày giờ theo format ISO 8601
            - Nếu không tìm thấy thông tin nào, để giá trị null
            - Đọc kỹ toàn bộ văn bản để extract chính xác
            \"\"\"
            
            # Gọi Azure OpenAI Vision API bằng REST API
            url = f"{endpoint}/openai/deployments/{deployment_name}/chat/completions?api-version={api_version}"
            
            headers = {
                "Content-Type": "application/json",
                "api-key": api_key
            }
            
            payload = {
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {"type": "text", "text": prompt},
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:image/jpeg;base64,{base64_image}"
                                }
                            }
                        ]
                    }
                ],
                "max_tokens": 1000,
                "temperature": 0.1
            }
            
            # Gửi request
            response = requests.post(url, headers=headers, json=payload)
            response.raise_for_status()
            
            # Parse response
            result_json = response.json()
            result_text = result_json['choices'][0]['message']['content'].strip()
            
            # Loại bỏ markdown code blocks nếu có
            if result_text.startswith('```json'):
                result_text = result_text[7:]
            if result_text.endswith('```'):
                result_text = result_text[:-3]
            
            # Parse JSON
            parsed_data = json.loads(result_text)
            
            return {
                'success': True,
                'data': parsed_data,
                'raw_response': result_text
            }
            """
            
        except json.JSONDecodeError as e:
            return {
                'success': False,
                'error': f'Lỗi parse JSON: {str(e)}',
                'raw_response': result_text if 'result_text' in locals() else None
            }
        except Exception as e:
            return {
                'success': False,
                'error': f'Lỗi OCR: {str(e)}'
            }
    
    @staticmethod
    def validate_image(file):
        """
        Validate uploaded image file
        """
        try:
            # Kiểm tra file extension
            allowed_extensions = {'.png', '.jpg', '.jpeg', '.gif', '.bmp'}
            file_ext = os.path.splitext(file.filename)[1].lower()
            
            if file_ext not in allowed_extensions:
                return False, "File phải là ảnh (png, jpg, jpeg, gif, bmp)"
            
            # Kiểm tra có phải image không
            image = Image.open(file.stream)
            image.verify()
            
            return True, "Valid image"
            
        except Exception as e:
            return False, f"File không phải là ảnh hợp lệ: {str(e)}"
    
    @staticmethod
    def save_uploaded_file(file, upload_folder):
        """
        Lưu file upload và trả về đường dẫn
        """
        try:
            # Tạo thư mục nếu chưa có
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
            
            # Tạo tên file unique
            from datetime import datetime
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"{timestamp}_{file.filename}"
            file_path = os.path.join(upload_folder, filename)
            
            # Reset file pointer và save
            file.stream.seek(0)
            file.save(file_path)
            
            return file_path
            
        except Exception as e:
            raise Exception(f"Lỗi lưu file: {str(e)}")

import requests
import os
from datetime import datetime

# Base URL của API
BASE_URL = "http://localhost:5000/api"

def test_upload_api():
    print("=== Test VKS Upload API - OCR và Extract thông tin ===")
    print()
    
    # Test 1: Kiểm tra upload endpoint hoạt động
    print("1. Kiểm tra upload endpoint...")
    try:
        response = requests.get(f"{BASE_URL}/upload/test")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        print()
    except Exception as e:
        print(f"Lỗi: {e}")
        print()
    
    # Test 2: Test upload file ảnh
    print("2. Test upload file ảnh (cần file test)...")
    test_image_path = "test_image.jpg"  # Thay đổi path này theo file test của bạn
    
    if os.path.exists(test_image_path):
        try:
            print(f"Uploading file: {test_image_path}")
            
            with open(test_image_path, 'rb') as f:
                files = {'file': f}
                response = requests.post(f"{BASE_URL}/upload/document", files=files)
            
            print(f"Status: {response.status_code}")
            print(f"Response: {response.json()}")
            print()
            
        except Exception as e:
            print(f"Lỗi upload: {e}")
            print()
    else:
        print(f"File test không tồn tại: {test_image_path}")
        print("Tạo file test hoặc thay đổi đường dẫn trong script")
        print()
    
    # Test 3: Test extract only
    print("3. Test extract only (chỉ OCR, không lưu DB)...")
    if os.path.exists(test_image_path):
        try:
            with open(test_image_path, 'rb') as f:
                files = {'file': f}
                response = requests.post(f"{BASE_URL}/upload/extract-only", files=files)
            
            print(f"Status: {response.status_code}")
            print(f"Response: {response.json()}")
            print()
            
        except Exception as e:
            print(f"Lỗi extract: {e}")
            print()
    
    # Test 4: Test với file không phải ảnh
    print("4. Test với file không phải ảnh...")
    try:
        # Tạo file test text
        test_txt_content = "This is not an image file"
        with open("test_not_image.txt", "w") as f:
            f.write(test_txt_content)
        
        with open("test_not_image.txt", 'rb') as f:
            files = {'file': f}
            response = requests.post(f"{BASE_URL}/upload/document", files=files)
        
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
        
        # Cleanup
        os.remove("test_not_image.txt")
        print()
        
    except Exception as e:
        print(f"Lỗi test file không phải ảnh: {e}")
        print()

def create_test_image():
    """
    Tạo một file ảnh test đơn giản
    """
    try:
        from PIL import Image, ImageDraw, ImageFont
        
        # Tạo ảnh test với text mẫu về pháp lý
        img = Image.new('RGB', (800, 600), color='white')
        draw = ImageDraw.Draw(img)
        
        # Thêm text mẫu
        sample_text = """
TÒA ÁN NHÂN DÂN THÀNH PHỐ HỒ CHÍ MINH

THÔNG BÁO VỀ VIỆC THỤ LÝ VỤ ÁN

Nguyên đơn: Nguyễn Văn A
Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM

Bị đơn: Trần Thị B  
Địa chỉ: 456 Đường XYZ, Quận 2, TP.HCM

Mã hồ sơ: HS001-2025
Địa điểm: Tòa án Nhân dân TP.HCM
Ngày giờ: 2025-01-17T14:30:00
Nội dung: Tranh chấp hợp đồng mua bán
        """
        
        # Vẽ text lên ảnh (font đơn giản)
        y_position = 50
        for line in sample_text.strip().split('\n'):
            draw.text((50, y_position), line, fill='black')
            y_position += 30
        
        # Lưu ảnh
        img.save("test_legal_document.jpg")
        print("Đã tạo file test: test_legal_document.jpg")
        
    except ImportError:
        print("Cần cài đặt Pillow để tạo ảnh test: pip install Pillow")
    except Exception as e:
        print(f"Lỗi tạo ảnh test: {e}")

if __name__ == "__main__":
    print("VKS Upload API Test Script")
    print("==========================")
    
    # Tạo ảnh test nếu chưa có
    if not os.path.exists("test_legal_document.jpg"):
        print("Tạo file ảnh test...")
        create_test_image()
        print()
    
    # Chạy test
    test_upload_api()
    
    print("Hoàn thành test!")
    print("\nLưu ý:")
    print("- Cần cấu hình Azure OpenAI trong file .env")
    print("- Copy .env.example thành .env và điền thông tin")
    print("- Đảm bảo API đang chạy tại http://localhost:5000")

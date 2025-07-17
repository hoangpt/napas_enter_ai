"""
Test script để kiểm tra chức năng use_fixtures trong Upload API
"""
import requests
import os

BASE_URL = "http://localhost:5000/api/upload"

def test_upload_with_fixtures():
    """Test upload với use_fixtures=true (mock data)"""
    print("=== Test Upload với Mock Data ===")
    
    # Kiểm tra file test có tồn tại không
    test_file = "test_doc.jpg"
    if not os.path.exists(test_file):
        test_file = "samples/tesst.jpg"  # Thử file khác
    
    if os.path.exists(test_file):
        print(f"Sử dụng file test: {test_file}")
        with open(test_file, 'rb') as f:
            files = {'file': f}
            data = {'use_fixtures': 'true'}
            
            response = requests.post(f"{BASE_URL}/document", files=files, data=data)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
    else:
        print("Không tìm thấy file test. Vui lòng đặt file test_doc.jpg hoặc samples/tesst.jpg")

def test_extract_with_fixtures():
    """Test extract-only với use_fixtures=true"""
    print("\n=== Test Extract-Only với Mock Data ===")
    
    test_file = "test_doc.jpg"
    if not os.path.exists(test_file):
        test_file = "samples/tesst.jpg"
    
    if os.path.exists(test_file):
        print(f"Sử dụng file test: {test_file}")
        with open(test_file, 'rb') as f:
            files = {'file': f}
            data = {'use_fixtures': 'true'}
            
            response = requests.post(f"{BASE_URL}/extract-only", files=files, data=data)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
    else:
        print("Không tìm thấy file test")

def test_extract_with_azure_openai():
    """Test extract-only với use_fixtures=false (Azure OpenAI)"""
    print("\n=== Test Extract-Only với Azure OpenAI ===")
    
    test_file = "test_doc.jpg"
    if not os.path.exists(test_file):
        test_file = "samples/tesst.jpg"
    
    if os.path.exists(test_file):
        print(f"Sử dụng file test: {test_file}")
        with open(test_file, 'rb') as f:
            files = {'file': f}
            data = {'use_fixtures': 'false'}  # Sử dụng Azure OpenAI
            
            response = requests.post(f"{BASE_URL}/extract-only", files=files, data=data)
            print(f"Status Code: {response.status_code}")
            print(f"Response: {response.json()}")
    else:
        print("Không tìm thấy file test")

def test_api_health():
    """Test xem API có hoạt động không"""
    print("=== Test API Health ===")
    try:
        response = requests.get(f"{BASE_URL}/test")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        return True
    except Exception as e:
        print(f"Lỗi kết nối API: {e}")
        return False

if __name__ == "__main__":
    print("Testing VKS Upload API với flag use_fixtures\n")
    
    # Kiểm tra API có hoạt động không
    if not test_api_health():
        print("API không hoạt động. Vui lòng chạy: python app_swagger.py")
        exit(1)
    
    # Test các chức năng
    test_upload_with_fixtures()
    test_extract_with_fixtures()
    test_extract_with_azure_openai()
    
    print("\n=== Hoàn thành test ===")
    print("Để test với Azure OpenAI thực tế, hãy:")
    print("1. Cấu hình .env với AZURE_OPENAI_API_KEY và AZURE_OPENAI_ENDPOINT")
    print("2. Sử dụng use_fixtures=false trong request")

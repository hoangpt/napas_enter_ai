import requests
import json
from datetime import datetime

# Base URL của API
BASE_URL = "http://localhost:5000/api"

def test_swagger_api():
    print("=== Test VKS Flask API với Swagger Documentation ===")
    print("Swagger Documentation: http://localhost:5000/swagger/")
    print()
    
    # Test 1: Kiểm tra API hoạt động
    print("1. Kiểm tra API hoạt động...")
    try:
        response = requests.get("http://localhost:5000/")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
        return
    
    # Test 2: Tạo nguyên đơn
    print("\n2. Tạo nguyên đơn...")
    nguyen_don_data = {
        "ten": "Nguyễn Văn A",
        "dia_chi": "123 Đường ABC, Quận 1, TP.HCM"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/nguyen-don", json=nguyen_don_data)
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            nguyen_don = response.json()
            print(f"Nguyên đơn created: {nguyen_don}")
            nguyen_don_id = nguyen_don['id']
        else:
            print(f"Error: {response.json()}")
            return
    except Exception as e:
        print(f"Lỗi: {e}")
        return
    
    # Test 3: Tạo bị đơn
    print("\n3. Tạo bị đơn...")
    bi_don_data = {
        "ten": "Trần Thị B",
        "dia_chi": "456 Đường XYZ, Quận 2, TP.HCM"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/bi-don", json=bi_don_data)
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            bi_don = response.json()
            print(f"Bị đơn created: {bi_don}")
            bi_don_id = bi_don['id']
        else:
            print(f"Error: {response.json()}")
            return
    except Exception as e:
        print(f"Lỗi: {e}")
        return
    
    # Test 4: Tạo hồ sơ thụ lý
    print("\n4. Tạo hồ sơ thụ lý...")
    ho_so_data = {
        "ma": "HS001-2025",
        "dia_diem": "Tòa án Nhân dân Quận 1",
        "ngay_gio": datetime.now().isoformat(),
        "noi_dung_vu_viec": "Vụ tranh chấp hợp đồng mua bán nhà đất giữa nguyên đơn và bị đơn",
        "nguyen_don_id": nguyen_don_id,
        "bi_don_id": bi_don_id
    }
    
    try:
        response = requests.post(f"{BASE_URL}/ho-so", json=ho_so_data)
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            ho_so = response.json()
            print(f"Hồ sơ created: {ho_so}")
            ho_so_id = ho_so['id']
        else:
            print(f"Error: {response.json()}")
            return
    except Exception as e:
        print(f"Lỗi: {e}")
        return
    
    # Test 5: Lấy danh sách nguyên đơn
    print("\n5. Lấy danh sách nguyên đơn...")
    try:
        response = requests.get(f"{BASE_URL}/nguyen-don")
        print(f"Status: {response.status_code}")
        print(f"Nguyên đơn: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    # Test 6: Lấy danh sách bị đơn
    print("\n6. Lấy danh sách bị đơn...")
    try:
        response = requests.get(f"{BASE_URL}/bi-don")
        print(f"Status: {response.status_code}")
        print(f"Bị đơn: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    # Test 7: Lấy danh sách hồ sơ
    print("\n7. Lấy danh sách hồ sơ...")
    try:
        response = requests.get(f"{BASE_URL}/ho-so")
        print(f"Status: {response.status_code}")
        print(f"Hồ sơ: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    # Test 8: Tìm kiếm nguyên đơn
    print("\n8. Tìm kiếm nguyên đơn theo tên...")
    try:
        response = requests.get(f"{BASE_URL}/nguyen-don?search=Nguyễn")
        print(f"Status: {response.status_code}")
        print(f"Kết quả tìm kiếm: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    # Test 9: Lấy hồ sơ theo mã
    print("\n9. Lấy hồ sơ theo mã...")
    try:
        response = requests.get(f"{BASE_URL}/ho-so/ma/HS001-2025")
        print(f"Status: {response.status_code}")
        print(f"Hồ sơ theo mã: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    # Test 10: Cập nhật hồ sơ
    print("\n10. Cập nhật hồ sơ...")
    update_data = {
        "noi_dung_vu_viec": "Vụ tranh chấp hợp đồng mua bán nhà đất - ĐÃ CẬP NHẬT VỚI SWAGGER"
    }
    
    try:
        response = requests.put(f"{BASE_URL}/ho-so/{ho_so_id}", json=update_data)
        print(f"Status: {response.status_code}")
        print(f"Updated hồ sơ: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    # Test 11: Thống kê
    print("\n11. Thống kê...")
    try:
        response = requests.get(f"{BASE_URL}/statistics")
        print(f"Status: {response.status_code}")
        print(f"Thống kê: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    print("\n=== Test hoàn thành ===")
    print("Bạn có thể xem Swagger Documentation tại: http://localhost:5000/swagger/")
    print("Tại đây bạn có thể:")
    print("- Xem tất cả API endpoints")
    print("- Test trực tiếp từ web interface")
    print("- Xem request/response repos")
    print("- Download OpenAPI specification")

if __name__ == "__main__":
    test_swagger_api()

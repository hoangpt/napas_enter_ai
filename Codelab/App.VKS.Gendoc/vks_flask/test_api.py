import requests
import json

# Base URL của API
BASE_URL = "http://localhost:5000"

def test_api():
    print("=== Test VKS Flask API ===")
    
    # Test 1: Kiểm tra API hoạt động
    print("\n1. Kiểm tra API hoạt động...")
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
        return
    
    # Test 2: Tạo user mới
    print("\n2. Tạo user mới...")
    user_data = {
        "name": "Nguyễn Văn A",
        "email": "nguyenvana@example.com"
    }
    
    try:
        response = requests.post(f"{BASE_URL}/api/users", json=user_data)
        print(f"Status: {response.status_code}")
        if response.status_code == 201:
            user = response.json()
            print(f"User created: {user}")
            user_id = user['id']
        else:
            print(f"Error: {response.json()}")
            return
    except Exception as e:
        print(f"Lỗi: {e}")
        return
    
    # Test 3: Lấy danh sách users
    print("\n3. Lấy danh sách users...")
    try:
        response = requests.get(f"{BASE_URL}/api/users")
        print(f"Status: {response.status_code}")
        print(f"Users: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    # Test 4: Cập nhật user
    print("\n4. Cập nhật user...")
    update_data = {
        "name": "Nguyễn Văn A - Updated"
    }
    
    try:
        response = requests.put(f"{BASE_URL}/api/users/{user_id}", json=update_data)
        print(f"Status: {response.status_code}")
        print(f"Updated user: {response.json()}")
    except Exception as e:
        print(f"Lỗi: {e}")
    
    print("\n=== Test hoàn thành ===")

if __name__ == "__main__":
    test_api()

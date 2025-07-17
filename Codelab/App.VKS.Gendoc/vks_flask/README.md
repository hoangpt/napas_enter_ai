# VKS Flask API - Hệ thống quản lý vụ việc

Ứng dụng API quản lý vụ việc sử dụng Flask và SQLite với kiến trúc MVC (Model-View-Controller) và Swagger Documentation.

## Cấu trúc dự án

```
vks_flask/
├── models/
│   └── __init__.py          # Models: NguyenDon, BiDon, HoSoThuLy
├── controllers/
│   ├── __init__.py
│   ├── nguyen_don_controller.py
│   ├── bi_don_controller.py
│   └── ho_so_thu_ly_controller.py
├── services/
│   ├── __init__.py
│   ├── nguyen_don_service.py
│   ├── bi_don_service.py
│   └── ho_so_thu_ly_service.py
├── app_swagger.py           # File chính với Swagger (KHUYẾN NGHỊ)
├── app_new.py               # File MVC không có Swagger
├── app.py                   # File cũ (chỉ có User API)
├── swagger_models.py        # Định nghĩa Swagger models
├── test_swagger_api.py      # Test cho API với Swagger
├── test_vks_api.py          # Test cho hệ thống MVC
├── test_api.py              # Test cho API cũ
├── requirements.txt
├── run.bat
└── README.md
```

## Cài đặt

1. Tạo virtual environment:
```bash
python -m venv venv
venv\Scripts\activate  # Windows
# hoặc
source venv/bin/activate  # Linux/Mac
```

2. Cài đặt dependencies:
```bash
pip install -r requirements.txt
```

3. Chạy ứng dụng với Swagger (KHUYẾN NGHỊ):
```bash
python app_swagger.py
```

Hoặc chạy ứng dụng MVC thông thường:
```bash
python app_new.py
```

Ứng dụng sẽ chạy tại `http://localhost:5000`

## 📚 Swagger Documentation

**URL Documentation: `http://localhost:5000/swagger/`**

Swagger cung cấp:
- **Interactive API Testing**: Test trực tiếp từ web interface
- **API Documentation**: Mô tả chi tiết tất cả endpoints
- **Request/Response Models**: Schema và examples
- **Parameter Validation**: Validation rules và types
- **OpenAPI Specification**: Download OpenAPI 3.0 spec

### Tính năng Swagger:
- ✅ Tự động generate documentation từ code
- ✅ Try-it-out functionality cho tất cả endpoints
- ✅ Model schema với examples
- ✅ Parameter descriptions và validation
- ✅ Response codes và error handling
- ✅ Namespace organization (nguyên đơn, bị đơn, hồ sơ, thống kê)

## API Endpoints

**Tất cả endpoints được document đầy đủ tại Swagger UI: `/swagger/`**

### Nguyên đơn (Người khởi kiện) - `/api/nguyen-don`

- `GET /api/nguyen-don` - Lấy danh sách nguyên đơn
- `GET /api/nguyen-don?search=<tên>` - Tìm kiếm nguyên đơn theo tên
- `POST /api/nguyen-don` - Tạo nguyên đơn mới
- `GET /api/nguyen-don/{id}` - Lấy thông tin nguyên đơn theo ID
- `PUT /api/nguyen-don/{id}` - Cập nhật nguyên đơn
- `DELETE /api/nguyen-don/{id}` - Xóa nguyên đơn

### Bị đơn (Người bị kiện) - `/api/bi-don`

- `GET /api/bi-don` - Lấy danh sách bị đơn
- `GET /api/bi-don?search=<tên>` - Tìm kiếm bị đơn theo tên
- `POST /api/bi-don` - Tạo bị đơn mới
- `GET /api/bi-don/{id}` - Lấy thông tin bị đơn theo ID
- `PUT /api/bi-don/{id}` - Cập nhật bị đơn
- `DELETE /api/bi-don/{id}` - Xóa bị đơn

### Hồ sơ thụ lý - `/api/ho-so`

- `GET /api/ho-so` - Lấy danh sách hồ sơ
- `GET /api/ho-so?ma=<mã>` - Tìm kiếm theo mã hồ sơ
- `GET /api/ho-so?nguyen_don_id=<id>` - Tìm kiếm theo nguyên đơn
- `GET /api/ho-so?bi_don_id=<id>` - Tìm kiếm theo bị đơn
- `GET /api/ho-so?start_date=<date>&end_date=<date>` - Tìm kiếm theo khoảng thời gian
- `POST /api/ho-so` - Tạo hồ sơ mới
- `GET /api/ho-so/{id}` - Lấy thông tin hồ sơ theo ID
- `GET /api/ho-so/ma/{mã}` - Lấy thông tin hồ sơ theo mã
- `PUT /api/ho-so/{id}` - Cập nhật hồ sơ
- `DELETE /api/ho-so/{id}` - Xóa hồ sơ

### Thống kê - `/api/statistics`

- `GET /api/statistics` - Lấy thống kê tổng quan

## Ví dụ sử dụng

### 1. Tạo nguyên đơn:
```bash
curl -X POST http://localhost:5000/api/nguyen-don \
  -H "Content-Type: application/json" \
  -d '{"ten": "Nguyễn Văn A", "dia_chi": "123 Đường ABC, Quận 1, TP.HCM"}'
```

### 2. Tạo bị đơn:
```bash
curl -X POST http://localhost:5000/api/bi-don \
  -H "Content-Type: application/json" \
  -d '{"ten": "Trần Thị B", "dia_chi": "456 Đường XYZ, Quận 2, TP.HCM"}'
```

### 3. Tạo hồ sơ thụ lý:
```bash
curl -X POST http://localhost:5000/api/ho-so \
  -H "Content-Type: application/json" \
  -d '{
    "ma": "HS001-2025",
    "dia_diem": "Tòa án Nhân dân Quận 1",
    "ngay_gio": "2025-01-17T14:30:00",
    "noi_dung_vu_viec": "Vụ tranh chấp hợp đồng mua bán nhà đất",
    "nguyen_don_id": 1,
    "bi_don_id": 1
  }'
```

### 4. Lấy danh sách hồ sơ:
```bash
curl http://localhost:5000/api/ho-so
```

### 5. Tìm kiếm hồ sơ theo mã:
```bash
curl http://localhost:5000/api/ho-so?ma=HS001
```

### 6. Lấy thống kê:
```bash
curl http://localhost:5000/api/statistics
```

**💡 Tip**: Thay vì sử dụng curl, bạn có thể test trực tiếp tại Swagger UI!

## Cấu trúc Database

### 1. NguyenDon (Nguyên đơn):
- id (Integer, Primary Key)
- ten (String, Required)
- dia_chi (Text, Required)
- created_at (DateTime)
- updated_at (DateTime)

### 2. BiDon (Bị đơn):
- id (Integer, Primary Key)
- ten (String, Required)
- dia_chi (Text, Required)
- created_at (DateTime)
- updated_at (DateTime)

### 3. HoSoThuLy (Hồ sơ thụ lý):
- id (Integer, Primary Key)
- ma (String, Unique, Required)
- dia_diem (String, Required)
- ngay_gio (DateTime, Required)
- noi_dung_vu_viec (Text, Required)
- nguyen_don_id (Integer, Foreign Key)
- bi_don_id (Integer, Foreign Key)
- created_at (DateTime)
- updated_at (DateTime)

## Kiến trúc MVC

### Models (models/__init__.py):
- Định nghĩa cấu trúc database
- Relationships giữa các bảng
- Phương thức to_dict() để serialize data

### Controllers (controllers/):
- Xử lý HTTP requests
- Validate input data
- Gọi services và trả về response

### Services (services/):
- Business logic
- Database operations (CRUD)
- Data validation và processing

## Test API

### 1. Swagger UI (KHUYẾN NGHỊ):
Truy cập `http://localhost:5000/swagger/` để:
- Test trực tiếp từ web interface
- Xem documentation chi tiết  
- Download OpenAPI specification

### 2. Script test tự động:
```bash
# Test API với Swagger
python test_swagger_api.py

# Test API MVC thông thường  
python test_vks_api.py

# Test API cũ (User only)
python test_api.py
```

### 3. Test bằng curl hoặc Postman:
Import OpenAPI spec từ `/swagger.json` vào Postman hoặc sử dụng các curl commands ở trên.

## Ghi chú

- **Swagger Documentation**: `http://localhost:5000/swagger/`
- **Database**: SQLite sẽ được tạo tự động (`vks_app.db`)  
- **Environment**: Development mode với debug enabled
- **Datetime format**: ISO 8601 (e.g., "2025-01-17T14:30:00")
- **Response format**: JSON cho tất cả endpoints
- **API Prefix**: Tất cả endpoints bắt đầu với `/api/`

### Dependencies chính:
- Flask 2.3.3 - Web framework
- Flask-SQLAlchemy 3.0.5 - ORM  
- Flask-RESTX 1.3.0 - Swagger documentation
- SQLAlchemy 2.0.23 - Database toolkit
- Requests 2.31.0 - HTTP client cho testing

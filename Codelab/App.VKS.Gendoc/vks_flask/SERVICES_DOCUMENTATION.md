# VKS Flask API - Services Documentation

Tài liệu mô tả chi tiết tất cả các function trong layer Services của hệ thống VKS Flask API.

## Tổng quan Architecture

Hệ thống sử dụng **3-layer MVC pattern** với Services layer chứa business logic:
- **Models**: SQLAlchemy models với phương thức serialization
- **Services**: Business logic với static methods cho CRUD operations  
- **Controllers**: Flask-RESTX resources xử lý HTTP requests

## Services Overview

| Service | Mô tả | File |
|---------|--------|------|
| NguyenDonService | Quản lý nguyên đơn (plaintiffs) | `nguyen_don_service.py` |
| BiDonService | Quản lý bị đơn (defendants) | `bi_don_service.py` |
| HoSoThuLyService | Quản lý hồ sơ thụ lý (case files) | `ho_so_thu_ly_service.py` |
| OCRService | OCR & Azure OpenAI Vision integration | `ocr_service.py` |
| DocumentProcessingService | Xử lý dữ liệu từ OCR | `document_processing_service.py` |

---

## 1. NguyenDonService

**Mục đích**: Quản lý thông tin nguyên đơn (plaintiffs) trong các vụ việc pháp lý.

### Methods

#### `get_all()` 
```python
@staticmethod
def get_all()
```
**Mô tả**: Lấy danh sách tất cả nguyên đơn trong hệ thống.
- **Return**: `List[NguyenDon]` - Danh sách objects NguyenDon
- **Exceptions**: SQLAlchemy exceptions

#### `get_by_id(nguyen_don_id)`
```python
@staticmethod
def get_by_id(nguyen_don_id)
```
**Mô tả**: Lấy thông tin nguyên đơn theo ID.
- **Params**: 
  - `nguyen_don_id` (int): ID của nguyên đơn
- **Return**: `NguyenDon|None` - Object NguyenDon hoặc None nếu không tìm thấy
- **Exceptions**: SQLAlchemy exceptions

#### `create(data)`
```python
@staticmethod
def create(data)
```
**Mô tả**: Tạo nguyên đơn mới.
- **Params**:
  - `data` (dict): Dữ liệu nguyên đơn
    ```python
    {
        "ten": "Họ tên nguyên đơn",
        "dia_chi": "Địa chỉ nguyên đơn"
    }
    ```
- **Return**: `NguyenDon` - Object NguyenDon vừa tạo
- **Exceptions**: ValueError, SQLAlchemy exceptions

#### `update(nguyen_don_id, data)`
```python
@staticmethod
def update(nguyen_don_id, data)
```
**Mô tả**: Cập nhật thông tin nguyên đơn.
- **Params**:
  - `nguyen_don_id` (int): ID của nguyên đơn cần cập nhật
  - `data` (dict): Dữ liệu cập nhật (có thể partial update)
- **Return**: `NguyenDon|None` - Object đã cập nhật hoặc None nếu không tìm thấy
- **Exceptions**: SQLAlchemy exceptions

#### `delete(nguyen_don_id)`
```python
@staticmethod
def delete(nguyen_don_id)
```
**Mô tả**: Xóa nguyên đơn theo ID.
- **Params**:
  - `nguyen_don_id` (int): ID của nguyên đơn cần xóa
- **Return**: `bool` - True nếu xóa thành công, False nếu không tìm thấy
- **Exceptions**: SQLAlchemy exceptions

#### `search_by_name(name)`
```python
@staticmethod
def search_by_name(name)
```
**Mô tả**: Tìm kiếm nguyên đơn theo tên (case-insensitive, partial match).
- **Params**:
  - `name` (str): Tên hoặc phần tên cần tìm
- **Return**: `List[NguyenDon]` - Danh sách nguyên đơn phù hợp
- **Exceptions**: SQLAlchemy exceptions

---

## 2. BiDonService

**Mục đích**: Quản lý thông tin bị đơn (defendants) trong các vụ việc pháp lý.

### Methods

Các phương thức tương tự NguyenDonService nhưng áp dụng cho BiDon:

#### `get_all()`, `get_by_id()`, `create()`, `update()`, `delete()`, `search_by_name()`

Cấu trúc dữ liệu tương tự NguyenDon:
```python
{
    "ten": "Họ tên bị đơn", 
    "dia_chi": "Địa chỉ bị đơn"
}
```

---

## 3. HoSoThuLyService

**Mục đích**: Quản lý hồ sơ thụ lý (case files) - thực thể chính liên kết NguyenDon và BiDon.

### Methods

#### `get_all()`, `get_by_id()` 
Tương tự các service khác.

#### `get_by_ma(ma)`
```python
@staticmethod
def get_by_ma(ma)
```
**Mô tả**: Lấy hồ sơ theo mã số (unique identifier).
- **Params**: `ma` (str) - Mã hồ sơ
- **Return**: `HoSoThuLy|None`

#### `create(data)`
```python
@staticmethod
def create(data)
```
**Mô tả**: Tạo hồ sơ thụ lý mới với validation nghiêm ngặt.
- **Params**:
  ```python
  {
      "ma": "Mã hồ sơ unique",
      "dia_diem": "Địa điểm xử lý", 
      "ngay_gio": "2025-01-17T14:30:00",  # ISO format
      "noi_dung_vu_viec": "Nội dung vụ việc",
      "nguyen_don_id": 1,  # Required - phải tồn tại
      "bi_don_id": 2       # Required - phải tồn tại
  }
  ```
- **Return**: `HoSoThuLy` - Object vừa tạo
- **Exceptions**: 
  - `ValueError`: Mã hồ sơ đã tồn tại, NguyenDon/BiDon không tồn tại
  - `SQLAlchemy exceptions`

#### `update(ho_so_id, data)`
Tương tự create nhưng cho phép partial update và validation.

#### `delete(ho_so_id)`
Xóa hồ sơ thụ lý.

#### `search_by_ma(ma)`
Tìm kiếm hồ sơ theo mã (partial match).

#### `search_by_nguyen_don(nguyen_don_id)`
```python
@staticmethod
def search_by_nguyen_don(nguyen_don_id)
```
**Mô tả**: Tìm tất cả hồ sơ của một nguyên đơn.
- **Return**: `List[HoSoThuLy]`

#### `search_by_bi_don(bi_don_id)`
Tương tự cho bị đơn.

#### `search_by_date_range(start_date, end_date)`
```python
@staticmethod
def search_by_date_range(start_date, end_date)
```
**Mô tả**: Tìm hồ sơ trong khoảng thời gian.
- **Params**: 
  - `start_date`, `end_date` (datetime): Khoảng thời gian
- **Return**: `List[HoSoThuLy]`

---

## 4. OCRService

**Mục đích**: Tích hợp Azure OpenAI Vision để OCR và extract thông tin từ tài liệu pháp lý.

### Methods

#### `extract_legal_document_info(image_path, use_fixtures=True)`
```python
@staticmethod
def extract_legal_document_info(image_path, use_fixtures=True)
```
**Mô tả**: Extract thông tin từ hình ảnh tài liệu pháp lý sử dụng Azure OpenAI Vision hoặc mock data.

- **Params**:
  - `image_path` (str): Đường dẫn đến file ảnh
  - `use_fixtures` (bool): 
    - `True` (default): Sử dụng mock data từ fixtures.py
    - `False`: Gọi Azure OpenAI Vision API thực tế

- **Return**: 
  ```python
  {
      "success": True|False,
      "data": {
          "nguyen_don": {
              "ten": "Họ tên nguyên đơn",
              "dia_chi": "Địa chỉ"
          },
          "bi_don": {
              "ten": "Họ tên bị đơn", 
              "dia_chi": "Địa chỉ"
          },
          "ho_so": {
              "ma": "Mã hồ sơ",
              "dia_diem": "Địa điểm tòa án",
              "ngay_gio": "2025-01-17T14:30:00",
              "noi_dung_vu_viec": "Nội dung vụ việc"
          }
      },
      "raw_response": "Raw response từ Azure OpenAI",
      "error": "Error message nếu có lỗi"
  }
  ```

- **Dependencies**: 
  - Azure OpenAI config: `AZURE_OPENAI_API_KEY`, `AZURE_OPENAI_ENDPOINT`
  - Mock data từ `fixtures.MOCK_LEGAL_DOCUMENT_DATA`

#### `validate_image(file)`
```python
@staticmethod
def validate_image(file)
```
**Mô tả**: Validate file upload có phải ảnh hợp lệ không.
- **Params**: `file` (FileStorage) - File upload từ Flask request
- **Return**: `Tuple[bool, str]` - (is_valid, message)
- **Supported formats**: PNG, JPG, JPEG, GIF, BMP
- **Uses**: PIL/Pillow để verify ảnh

#### `save_uploaded_file(file, upload_folder)`
```python
@staticmethod
def save_uploaded_file(file, upload_folder)
```
**Mô tả**: Lưu file upload với tên unique (timestamp).
- **Params**:
  - `file` (FileStorage): File upload
  - `upload_folder` (str): Thư mục lưu file
- **Return**: `str` - Đường dẫn file đã lưu
- **Format**: `YYYYMMDD_HHMMSS_original_filename.ext`

---

## 5. DocumentProcessingService

**Mục đích**: Xử lý và lưu dữ liệu đã extract từ OCR vào database.

### Methods

#### `process_extracted_data(extracted_data)`
```python
@staticmethod
def process_extracted_data(extracted_data)
```
**Mô tả**: Xử lý dữ liệu từ OCR và tạo các bản ghi trong database theo thứ tự: NguyenDon → BiDon → HoSoThuLy.

- **Params**: `extracted_data` (dict) - Dữ liệu từ OCRService.extract_legal_document_info()

- **Return**: 
  ```python
  {
      "success": True|False,
      "message": "Thông báo kết quả",
      "data": {
          "nguyen_don_id": 123,
          "bi_don_id": 456, 
          "ho_so_id": 789,
          "created_records": [
              {
                  "type": "nguyen_don",
                  "id": 123,
                  "data": {object_dict}
              },
              // ...
          ]
      },
      "error": "Error message nếu có lỗi"
  }
  ```

- **Logic**:
  1. Tạo NguyenDon nếu có đủ thông tin (ten, dia_chi)
  2. Tạo BiDon nếu có đủ thông tin 
  3. Tạo HoSoThuLy nếu có NguyenDon, BiDon và thông tin hồ sơ
  4. Auto-generate mã hồ sơ nếu không có: `HS_YYYYMMDD_HHMMSS`

#### `search_existing_records(extracted_data)`
```python
@staticmethod
def search_existing_records(extracted_data)
```
**Mô tả**: Tìm kiếm các bản ghi đã tồn tại để tránh duplicate.

- **Params**: `extracted_data` (dict) - Dữ liệu extract
- **Return**: 
  ```python
  {
      "nguyen_don": [List[dict]],  # Nguyên đơn cùng tên
      "bi_don": [List[dict]],      # Bị đơn cùng tên  
      "ho_so": [List[dict]]        # Hồ sơ cùng mã
  }
  ```

- **Search logic**:
  - NguyenDon: Tìm theo tên (partial match, case-insensitive)
  - BiDon: Tìm theo tên
  - HoSoThuLy: Tìm theo mã chính xác

---

## Usage Examples

### Cơ bản CRUD Operations
```python
# Tạo nguyên đơn
nguyen_don = NguyenDonService.create({
    "ten": "Nguyễn Văn An",
    "dia_chi": "123 ABC Street, TP.HCM"
})

# Tìm kiếm
results = NguyenDonService.search_by_name("Nguyễn")

# Tạo hồ sơ (cần nguyên đơn và bị đơn)
ho_so = HoSoThuLyService.create({
    "ma": "HS001/2025",
    "dia_diem": "Tòa án TP.HCM", 
    "ngay_gio": "2025-01-17T14:30:00",
    "noi_dung_vu_viec": "Tranh chấp hợp đồng",
    "nguyen_don_id": nguyen_don.id,
    "bi_don_id": bi_don.id
})
```

### OCR và Processing Workflow
```python
# 1. OCR extract
ocr_result = OCRService.extract_legal_document_info(
    image_path="uploads/document.jpg",
    use_fixtures=False  # Sử dụng Azure OpenAI
)

if ocr_result['success']:
    # 2. Kiểm tra duplicate
    existing = DocumentProcessingService.search_existing_records(
        ocr_result['data']
    )
    
    # 3. Xử lý và lưu database
    if not existing['ho_so']:  # Không có hồ sơ trùng
        result = DocumentProcessingService.process_extracted_data(
            ocr_result['data']
        )
```

---

## Error Handling

Tất cả services sử dụng pattern:
```python
try:
    # Database operations
    db.session.commit()
    return result
except Exception as e:
    db.session.rollback()
    raise e
```

### Common Exceptions
- **ValueError**: Validation errors, duplicate keys, foreign key không tồn tại
- **SQLAlchemy IntegrityError**: Database constraint violations
- **requests.RequestException**: Azure OpenAI API errors (OCRService)

---

## Configuration

### Environment Variables (OCRService)
```bash
AZURE_OPENAI_API_KEY=your_api_key
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_API_VERSION=2024-02-15-preview
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4-vision-preview
```

### Mock Data (Development)
```python
# fixtures.py
MOCK_LEGAL_DOCUMENT_DATA = {
    "nguyen_don": {"ten": "...", "dia_chi": "..."},
    "bi_don": {"ten": "...", "dia_chi": "..."},
    "ho_so": {"ma": "...", "dia_diem": "...", ...}
}
```

---

## Testing

```bash
# Test individual services
python -c "from services.nguyen_don_service import NguyenDonService; print(NguyenDonService.get_all())"

# Test OCR with fixtures
python test_fixtures_flag.py

# Full API test
python test_swagger_api.py
```

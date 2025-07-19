# Hệ Thống Quản Lý Hồ Sơ Vụ Án - Frontend

Ứng dụng React để quản lý hồ sơ vụ án với tính năng bóc tách thông tin từ ảnh.

## 🚀 Cài đặt môi trường

### Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn
- Docker (tùy chọn)

### 1. Clone repository
```bash
git clone [repository-url]
cd vks_reactjs
```

### 2. Cài đặt dependencies
```bash
npm install
```

### 3. Cấu hình environment variables
Tạo file `.env` từ template:
```bash
cp .env.example .env
```

Hoặc tạo file `.env` với nội dung:
```
VITE_API_BASE_URL=Url_backend_api
```

**Lưu ý**: Sửa đổi URL API theo môi trường development của bạn:
- **Local development**: `http://localhost:5000/api`
- **Development server**: `http://vks-dev.hocai.fun/api`
- **Production**: `https://vks.hocai.fun/api`

### 4. Chạy ứng dụng

#### Development mode
```bash
npm run dev
```
Ứng dụng sẽ chạy tại: `http://localhost:5173`

#### Production build
```bash
npm run build
npm run preview
```

#### Chạy tests
```bash
npm run test
```

## 🐳 Docker

### Build và chạy với Docker
```bash
# Build image
npm run docker:build

# Run container
npm run docker:run
```

### Hoặc sử dụng Docker Compose
```bash
npm run docker:compose
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## 📁 Cấu trúc project

```
src/
├── components/          # Shared components
├── pages/              # Page components
│   ├── CaseList/       # Danh sách vụ việc
│   │   ├── index.jsx
│   │   ├── style.css
│   │   ├── fixture.js
│   │   └── __tests__/
│   └── CaseUpload.jsx  # Upload và bóc tách thông tin
├── providers/          # Context providers
├── services/           # API services
├── models/             # Data models
└── test/              # Test utilities
```

## 🔧 Scripts có sẵn

```bash
# Development
npm run dev              # Chạy dev server
npm run build           # Build production
npm run preview         # Preview production build

# Testing
npm run test            # Chạy tests
npm run test:ui         # Chạy tests với UI
npm run test:coverage   # Chạy tests với coverage

# Docker
npm run docker:build    # Build Docker image
npm run docker:run      # Run Docker container
npm run docker:compose  # Run với Docker Compose

# Linting
npm run lint            # Chạy ESLint
```

## 🌐 API Integration

Ứng dụng tích hợp với các API endpoints:

- `GET /api/ho-so` - Lấy danh sách hồ sơ
- `POST /api/upload/extract-only` - Bóc tách thông tin từ ảnh

## 📝 Tính năng

### 1. Danh sách vụ việc
- Hiển thị danh sách hồ sơ vụ án
- Tìm kiếm và lọc
- Trạng thái xử lý real-time

### 2. Upload và bóc tách thông tin
- Upload ảnh hồ sơ
- Bóc tách thông tin tự động bằng AI
- Hiển thị kết quả bóc tách

### 3. Quản lý dữ liệu
- Context-based state management
- API integration với error handling
- Mock data support cho development

## 🔧 Troubleshooting

### Lỗi API connection
1. Kiểm tra URL API trong file `.env`
2. Đảm bảo backend server đang chạy
3. Kiểm tra CORS settings

### Lỗi build
1. Xóa `node_modules` và `package-lock.json`
2. Chạy lại `npm install`
3. Kiểm tra version Node.js

### Lỗi Docker
1. Đảm bảo Docker daemon đang chạy
2. Kiểm tra port 3000 không bị conflict
3. Rebuild image: `docker-compose up --build`

## 🤝 Development

### Thêm tính năng mới
1. Tạo component trong `src/pages/` hoặc `src/components/`
2. Thêm routes trong `App.jsx`
3. Tạo tests trong `__tests__/`
4. Update README nếu cần

### Code style
- Sử dụng ESLint configuration
- Format code trước khi commit
- Viết tests cho các tính năng mới

## 📄 License

[License information]

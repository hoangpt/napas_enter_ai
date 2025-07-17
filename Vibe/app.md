Apps nhỏ (5)
1. App scan ảnh → Trích xuất thông tin hóa đơn
Input: Ảnh chụp hóa đơn

Output: Tên sản phẩm, số tiền → Ghi vào file Excel

Gợi ý công nghệ: OCR (Tesseract, Azure Form Recognizer), openpyxl/pandas

2. App nhận diện giọng nói và ghi chú
Input: Học viên nói qua micro

Output: Ghi chú dạng text hiển thị trên giao diện

Gợi ý công nghệ: Speech-to-text (Google STT, Whisper), frontend nhẹ (HTML/JS)

3. App nhập mã số khách hàng → lấy thông tin từ API
Input: Mã số (nhập tay)

Output: Gọi API (mocked/fake), hiển thị thông tin (tên, địa chỉ, trạng thái)

Gợi ý công nghệ: Fetch API/axios, frontend nhẹ

4. App tải file PDF → hiển thị số trang & dung lượng
Input: File PDF upload

Output: Tên file, dung lượng, số trang hiển thị trên màn hình

Gợi ý công nghệ: PyMuPDF hoặc pdf-lib.js

5. App TODO List đơn giản với filter
Tính năng: Thêm/sửa/xóa công việc, lọc theo "đã làm"/"chưa làm"

Output: Giao diện đơn giản

Gợi ý công nghệ: React/Vue hoặc chỉ dùng JS + LocalStorage
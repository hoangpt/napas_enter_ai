### ⚙️ **10 Workflow / Job nhỏ (\~30 phút)**

#### 1. **Job: Đọc ảnh hóa đơn → Trích xuất thông tin → Ghi file Excel**

* Bước:

  1. Nhận ảnh (từ thư mục)
  2. OCR (extract text)
  3. Regex lấy tên sản phẩm + giá
  4. Ghi vào Excel
* Tools: Python, Tesseract, pandas, openpyxl

---

#### 2. **Job: Nhận file PDF → Chia đoạn (chunk) → Lưu vào MongoDB**

* Bước:

  1. Load file PDF
  2. Cắt theo đoạn (theo heading)
  3. Thêm metadata
  4. Insert vào MongoDB
* Tools: PyMuPDF, langchain.text\_splitter, pymongo

---

#### 3. **Job: Crawl website tin tức → Lưu vào file CSV**

* Bước:

  1. Gọi requests → Lấy HTML
  2. Dùng BeautifulSoup trích tiêu đề, link
  3. Ghi vào CSV
* Tools: Python requests + bs4

---

#### 4. **Job: Nhận form Google Sheets → Sinh bảng Dashboard**

* Bước:

  1. Kết nối Google Sheets API
  2. Đọc dữ liệu (tên, điểm, lớp…)
  3. Sinh bảng tổng hợp (pandas, matplotlib)
* Tools: Python, gspread, pandas

---

#### 5. **Job: ETL dữ liệu bán hàng → Chuẩn hóa → Ghi DB**

* Bước:

  1. Đọc từ file Excel
  2. Làm sạch: định dạng ngày, xóa NULL
  3. Ghi vào MySQL/PostgreSQL
* Tools: pandas, sqlalchemy

---

#### 6. **Job: Lấy yêu cầu từ API khách hàng → Sinh báo cáo Word**

* Bước:

  1. Gọi API nhận yêu cầu (JSON)
  2. Mapping vào template
  3. Ghi file báo cáo Word (docx)
* Tools: requests, python-docx

---

#### 7. **Job: Chatbot nội bộ QA tự động tra Câu hỏi thường gặp**

* Bước:

  1. Nạp file FAQ
  2. Chunk + Embedding (FAISS)
  3. Tạo truy vấn user
  4. Tìm QA gần nhất → trả lời
* Tools: LangChain, FAISS, OpenAI

---

#### 8. **Job: Tự động đổi tên file ảnh → theo quy tắc chuẩn**

* Bước:

  1. Duyệt thư mục
  2. Lấy thông tin từ metadata hoặc tên cũ
  3. Rename thành format chuẩn (ví dụ: YYYYMMDD\_<id>.jpg)
* Tools: Python os, PIL

---

#### 9. **Job: Text-to-Speech → tạo file mp3 từ chuỗi input**

* Bước:

  1. Nhận input từ form hoặc text file
  2. Convert TTS
  3. Lưu file mp3
* Tools: gTTS, pyttsx3

---

#### 10. **Job: Quét folder → Sinh báo cáo dung lượng theo định dạng file**

* Bước:

  1. Scan toàn bộ file trong folder
  2. Thống kê: tổng số file + dung lượng theo loại (PDF, JPG…)
  3. In ra console hoặc ghi vào file
* Tools: Python os, collections

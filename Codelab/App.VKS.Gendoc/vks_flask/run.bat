@echo off
echo Starting VKS Flask API - Hệ thống quản lý vụ việc với Swagger Documentation...
echo.

REM Kiểm tra xem virtual environment đã tồn tại chưa
if not exist "venv" (
    echo Tạo virtual environment...
    python -m venv venv
    echo.
)

REM Kích hoạt virtual environment
echo Kích hoạt virtual environment...
call venv\Scripts\activate.bat
echo.

REM Cài đặt dependencies
echo Cài đặt dependencies...
pip install -r requirements.txt
echo.

REM Chạy ứng dụng
echo Chạy ứng dụng Flask với Swagger Documentation...
echo API Documentation sẽ có tại: http://localhost:5000/swagger/
python app_swagger.py

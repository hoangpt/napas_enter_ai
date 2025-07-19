# Mock OCR response for testing without Azure OpenAI
def get_mock_response():
    return {
        "nguyen_don": {
            "ten": "Nguyễn Văn A",
            "dia_chi": "123 Đường ABC, Quận 1, TP.HCM"
        },
        "bi_don": {
            "ten": "Trần Thị B", 
            "dia_chi": "456 Đường XYZ, Quận 2, TP.HCM"
        },
        "ho_so": {
            "ma": "HS001-2025",
            "dia_diem": "Tòa án Nhân dân TP.HCM",
            "ngay_gio": "2025-01-17T14:30:00",
            "noi_dung_vu_viec": "Tranh chấp hợp đồng mua bán (từ OCR)"
        }
    }

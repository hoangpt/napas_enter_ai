"""
VKS Flask API - Mock Data Fixtures
Chứa dữ liệu mẫu cho testing và development
"""

# Mock data cho OCR extraction - dựa trên tài liệu pháp lý thực tế
MOCK_LEGAL_DOCUMENT_DATA = {
    "nguyen_don": {
        "ten": "Chị Nguyễn Phương Thảo",
        "dia_chi": "Tổ Dân Phố Ngọc 2, phường Trung Minh, TP.Hòa Bình, tỉnh Hòa Bình"
    },
    "bi_don": {
        "ten": "Anh Đỗ Minh Tuấn",
        "dia_chi": "Tổ 13, phường Hữu Nghị, TP Hòa Bình, tỉnh Hòa Bình"
    },
    "ho_so": {
        "ma": "209/TB-TLVA",
        "dia_diem": "Tòa án nhân dân thành phố Hòa Bình",
        "ngay_gio": "2025-06-24T14:30:00",
        "noi_dung_vu_viec": "Thông báo về việc thụ lý vụ án - Viện Kiểm sát nhân dân Thành phố Hòa Bình thụ lý vụ án HNGD số: 209/2025/TLST- HNGD về việc: Xin ly hôn theo đơn khởi kiện của Chị Nguyễn Phương Thảo"
    }
}

# Thêm các mock data khác nếu cần
MOCK_NGUYEN_DON_DATA = [
    {
        "ten": "Nguyễn Văn An",
        "dia_chi": "123 Đường ABC, Quận 1, TP.HCM"
    },
    {
        "ten": "Trần Thị Bình",
        "dia_chi": "456 Đường XYZ, Quận 2, TP.HCM"
    }
]

MOCK_BI_DON_DATA = [
    {
        "ten": "Lê Văn Cường",
        "dia_chi": "789 Đường DEF, Quận 3, TP.HCM"
    },
    {
        "ten": "Phạm Thị Dung",
        "dia_chi": "101 Đường GHI, Quận 4, TP.HCM"
    }
]

MOCK_HO_SO_DATA = [
    {
        "ma": "001/2025/TLST-VKS",
        "dia_diem": "Tòa án nhân dân TP.HCM",
        "ngay_gio": "2025-01-15T09:00:00",
        "noi_dung_vu_viec": "Vụ án dân sự về tranh chấp hợp đồng"
    },
    {
        "ma": "002/2025/TLST-VKS",
        "dia_diem": "Tòa án nhân dân Hà Nội",
        "ngay_gio": "2025-01-16T14:00:00",
        "noi_dung_vu_viec": "Vụ án hình sự về tội trộm cắp tài sản"
    }
]

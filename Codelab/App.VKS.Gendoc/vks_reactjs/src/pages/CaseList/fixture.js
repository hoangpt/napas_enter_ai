const fixture = [
  {
    id: '1',
    soKS: '155/TB-TLVA',
    nguyenDon: 'Ông Nguyễn Văn A',
    biDon: 'Bà Trần Thị B',
    ngayThuLy: '15/05/2024',
    tinhTrang: 'Đang xử lý',
    tinhTrangType: 'processing',
    diaDiem: 'Tòa án Nhân dân Quận Y',
    thoiGian: '08:30',
    noiDungTranh: 'Tranh chấp hợp đồng mua bán nhà đất.',
    nguyenDonInfo: {
      hoTen: 'Ông Nguyễn Văn A',
      tuoi: 45,
      diaChi: '123 Đường ABC, Phường X, Quận Y, TP. HCM'
    },
    biDonInfo: {
      hoTen: 'Bà Trần Thị B',
      tuoi: 42,
      diaChi: '456 Đường XYZ, Phường A, Quận B, TP. HCM'
    }
  },
  {
    id: '2',
    soKS: '156/TB-TLVA',
    nguyenDon: 'Công ty Cổ phần ABC',
    biDon: 'Công ty TNHH XYZ',
    ngayThuLy: '20/05/2024',
    tinhTrang: 'Đã hoàn tất',
    tinhTrangType: 'done',
    diaDiem: 'Tòa án Nhân dân Quận 1',
    thoiGian: '14:00',
    noiDungTranh: 'Tranh chấp hợp đồng cung cấp dịch vụ.',
    nguyenDonInfo: {
      hoTen: 'Công ty Cổ phần ABC',
      tuoi: 'N/A',
      diaChi: '789 Đường DEF, Phường B, Quận 1, TP. HCM'
    },
    biDonInfo: {
      hoTen: 'Công ty TNHH XYZ',
      tuoi: 'N/A',
      diaChi: '321 Đường GHI, Phường C, Quận 3, TP. HCM'
    }
  },
  {
    id: '3',
    soKS: '157/TB-TLVA',
    nguyenDon: 'Bà Lê Thị C',
    biDon: 'Ông Trần Văn D',
    ngayThuLy: '25/05/2024',
    tinhTrang: 'Đã hoàn tất',
    tinhTrangType: 'done',
    diaDiem: 'Tòa án Nhân dân Quận 7',
    thoiGian: '09:15',
    noiDungTranh: 'Tranh chấp thừa kế tài sản.',
    nguyenDonInfo: {
      hoTen: 'Bà Lê Thị C',
      tuoi: 38,
      diaChi: '654 Đường JKL, Phường D, Quận 7, TP. HCM'
    },
    biDonInfo: {
      hoTen: 'Ông Trần Văn D',
      tuoi: 52,
      diaChi: '987 Đường MNO, Phường E, Quận 10, TP. HCM'
    }
  },  
];

export default fixture;

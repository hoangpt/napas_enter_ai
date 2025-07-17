import { IUserFilters, IGetUserResponse } from 'interfaces';

const getUsers = (params: IUserFilters): Promise<IGetUserResponse> => {
  return Promise.resolve({
    data: {
      code: 'SUCCESS',
      message: '',
      result: {
        pageSize: 5,
        currentPage: 1,
        totalRecords: 5,
        Users: [
          {
            id: 1,
            id_opp: 210000000,
            SalesPIC: 'ntt.ha',
            customer_name: 'Crimson Logic',
            requirement: '1x .Net Senior',
            isActive: 'Soạn thảo',
            DU: 'DU11',
            lead_PIC: 'Will',
            createdAt: '2020-02-12T11:14:21',
            createdBy: null,
            name: 'Đặng Minh Hương',
            familyName: 'Phan',
            updatedAt: '2020-02-12T11:14:21',
            updatedBy: null,
          },
          {
            id: 2,
            id_opp: 210000001,
            SalesPIC: 'ntt.ha, lta.tuang',
            customer_name: 'Siam Marko',
            requirement: '1x Expert PO (7-10)',
            isActive: 'Hủy',
            DU: 'DU11',
            lead_PIC: 'Will',
            createdAt: '2020-02-12T11:14:21',
            createdBy: null,
            updatedAt: '2020-02-12T11:14:21',
            updatedBy: null,
          },
          {
            id: 4,
            id_opp: 210000002,
            SalesPIC: 'lta.tuang',
            customer_name: 'Siam Marko',
            requirement: '1x FS TL (7-10)',
            isActive: 'Đang xử lí',
            DU: 'DU11',
            lead_PIC: 'Will',
            createdAt: '2020-02-12T11:14:21',
            createdBy: null,
            updatedAt: '2020-02-12T11:14:21',
            updatedBy: null,
          },
          {
            id: 3,
            id_opp: 210000002,
            SalesPIC: 'lta.tuang',
            customer_name: 'Siam Marko',
            requirement: '1x FS TL (7-10)',
            isActive: 'Từ chối',
            DU: 'DU11',
            lead_PIC: 'Will',
            createdAt: '2020-02-12T11:14:21',
            createdBy: null,
            updatedAt: '2020-02-12T11:14:21',
            updatedBy: null,
          },
        ],
      },
    },
  });
};

export default {
  getUsers,
};

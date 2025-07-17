import { IBaseFilters, IGetConceptListResponse } from 'interfaces';

const getConceptList = (
  params: IBaseFilters
): Promise<IGetConceptListResponse> => {
  return Promise.resolve({
    data: {
      page: 1,
      pageSize: 10,
      totalRecords: 3,
      concepts: [
        {
          id: 1,
          name: 'CTR-PLR - Change Material to SPC',
          relatedPartCount: 1,
          author: 'Souji',
          email: 'souji@jp.honda',
          createdAt: '2024/05/22 11:14:21',
        },
        {
          id: 2,
          name: 'CTR-PLR - Change Dimension +10mm',
          relatedPartCount: 5,
          author: 'Souji',
          email: 'souji@jp.honda',
          createdAt: '2024/05/22 11:34:24',
        },
        {
          id: 3,
          name: 'CTR-PLR - Change Position to 20mm',
          relatedPartCount: 6,
          author: 'Souji',
          email: 'souji@jp.honda',
          createdAt: '2024/05/22 11:55:01',
        },
      ],
    },
  });
};

export default {
  getConceptList,
};

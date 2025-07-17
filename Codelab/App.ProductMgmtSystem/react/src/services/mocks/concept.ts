import { IBaseFilters, IGetConceptResponse } from 'interfaces';

const getConcept = (params: IBaseFilters): Promise<IGetConceptResponse> => {
  return Promise.resolve({
    data: {
      concept: {
        name: 'CTR-PLR - Change Material to SPC',
        relatedPartCount: 3,
        author: 'Souji',
        email: 'souji@jp.honda',
        createdAt: '2024/05/22 11:14:21',
        relatedParts: [
          {
            name_en: 'SIDE SILL',
            project: '3GJ',
            pic: 'Mizuki',
            email: 'mizuki@jp.honda',
          },
          {
            name_en: 'Door Pane',
            project: '3GJ',
            pic: 'Mizuki',
            email: 'mizuki@jp.honda',
          },
          {
            name_en: 'Door Switch',
            project: '3GJ',
            pic: 'Mizuki',
            email: 'mizuki@jp.honda',
          },
        ],
      },
    },
  });
};

export default {
  getConcept,
};

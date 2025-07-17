import { requestServices } from 'services';
import { IRelatedPartFilters, IGetPartResponse } from 'interfaces';

const { jupiterClient } = requestServices;

const getRelatedParts = (
  params: IRelatedPartFilters
): Promise<IGetPartResponse> => {
  return jupiterClient.get('/search-related-part', {
    params,
  });
};

export default {
  getRelatedParts,
};

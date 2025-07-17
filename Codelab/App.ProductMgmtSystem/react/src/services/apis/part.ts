import { requestServices } from 'services';
import { IPartFilters, IGetPartResponse } from 'interfaces';

const { jupiterClient } = requestServices;

const getParts = (params: IPartFilters): Promise<IGetPartResponse> => {
  return jupiterClient.get('/search', {
    params,
  });
};

export default {
  getParts,
};

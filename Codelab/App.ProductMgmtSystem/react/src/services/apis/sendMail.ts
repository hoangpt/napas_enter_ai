import { requestServices } from 'services';
import { IConceptMailData } from 'interfaces';

const { jupiterClient } = requestServices;

const sendMails = (data: IConceptMailData[]): Promise<void> => {
  return jupiterClient.post('/send-mail', {
    data,
  });
};

export default {
  sendMails,
};

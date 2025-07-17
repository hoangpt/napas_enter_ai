import { notification } from 'antd';
import { AxiosError } from 'axios';
import { t } from 'helpers/i18n';
import { userServices } from 'services';

const handleResponseError = (error: AxiosError) => {
  const status = error && error.response && error.response.status;
  switch (status) {
    case 401:
      userServices.logout();
      break;
    case 403:
      userServices.denyAccess();
      break;
    default:
      let message = null;
      // Handle error message from API response
      if (error.response && error.response.data) {
        const { data } = error.response;
        message = data.message;
      }
      notification.error({
        message: t('Error'),
        description: message || t('SomethingWentWrong'),
      });
      break;
  }
};

export default {
  handleResponseError,
};

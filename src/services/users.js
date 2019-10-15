// @flow
import { requestServices } from 'services';

const fetchUsers = () => requestServices.customAxios.get('/').then(res => res.data);

export default {
  fetchUsers,
};

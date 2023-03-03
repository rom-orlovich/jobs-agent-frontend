import { API_ENDPOINTS, CLIENT_URL } from '../endpoints';
import { UserProfileWithOneUserQuery } from '../types/api.types';
import { createURLPath } from '../utils';
import { AxiosAPI } from './axios.api';

const usersAPI = new AxiosAPI(createURLPath([CLIENT_URL, API_ENDPOINTS.USERS]));
export const createUser = async (userID: string, userData: UserProfileWithOneUserQuery) => {
  const data = usersAPI.post(
    {
      endpoints: [userID]
    },
    userData
  );
  return data;
};

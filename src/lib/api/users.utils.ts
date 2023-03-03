import { API_ENDPOINTS, CLIENT_URL } from '../endpoints';
import { ResponseMessage, UserProfileWithOneUserQuery } from '../types/api.types';
import { createURLPath } from '../utils';
import { AxiosAPI } from './axios.api';

const usersAPI = new AxiosAPI(createURLPath([CLIENT_URL, API_ENDPOINTS.USERS]));
export const updateUser = async (userID: string, userData: UserProfileWithOneUserQuery) => {
  const data = await usersAPI.post<ResponseMessage>(
    {
      endpoints: [userID]
    },
    userData
  );
  return data.data;
};

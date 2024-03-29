import { API_ENDPOINTS, CLIENT_URL } from '../endpoints';
import { ResponseMessage } from '../types/api.types';
import { UserProfile, UserProfileWithOneUserQuery } from '../types/user.types';
import { createURLPath } from '../utils';
import { AxiosAPI } from './axios.api';

const usersAPI = new AxiosAPI(createURLPath([CLIENT_URL, API_ENDPOINTS.USERS]));

export const getUser = async (userID: string) => {
  const data = await usersAPI.get<{ data: UserProfile }>({
    endpoints: [userID]
  });
  return data.data;
};
export const updateUser = async (userID: string, userData: UserProfileWithOneUserQuery) => {
  const data = await usersAPI.post<ResponseMessage>(
    {
      endpoints: [userID]
    },
    userData
  );
  return data.data;
};

export const deleteUserQuery = async (userID: string, hash: string) => {
  const data = await usersAPI.delete<ResponseMessage>({
    endpoints: [userID],
    params: {
      hash
    }
  });
  return data.data;
};

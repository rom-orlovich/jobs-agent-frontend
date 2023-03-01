/* eslint-disable @typescript-eslint/no-explicit-any */
// import { GenericRecord, OmitKey } from '../types/types';

import axios, { AxiosInstance } from 'axios';
import { CLIENT_URL } from '../endpoints';
import { GenericRecord } from '../types/types';
import { convertResourceToURL } from '../utils';

export class AxiosUtils {
  axios: AxiosInstance;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL: convertResourceToURL([CLIENT_URL, baseURL])
    });
  }

  async get<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }): Promise<R> {
    return await this.axios.get(convertResourceToURL(URL.endpoints), {
      params: URL.params
    });
  }
  async post<R>(
    URL: { endpoints: string[]; params?: GenericRecord<any> },
    body: GenericRecord<any>
  ): Promise<R> {
    return await this.axios.post(convertResourceToURL(URL.endpoints), {
      params: URL.params,
      body
    });
  }
  async put<R>(
    URL: { endpoints: string[]; params?: GenericRecord<any> },
    body: GenericRecord<any>
  ): Promise<R> {
    return await this.axios.put(convertResourceToURL(URL.endpoints), {
      params: URL.params,
      body
    });
  }
  async delete<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }): Promise<R> {
    return await this.axios.delete(convertResourceToURL(URL.endpoints), {
      params: URL.params
    });
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';
import { GenericRecord } from '../types/types';
import { convertResourceToURL } from '../utils';

export class AxiosAPI {
  axios: AxiosInstance;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL: convertResourceToURL([baseURL])
    });
  }

  async get<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }) {
    return await this.axios.get<R>(convertResourceToURL(URL.endpoints), {
      params: URL.params
    });
  }
  async post<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }, body: GenericRecord<any>) {
    return await this.axios.post<R>(convertResourceToURL(URL.endpoints), body, {
      params: URL.params
    });
  }
  async put<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }, body: GenericRecord<any>) {
    return await this.axios.put<R>(convertResourceToURL(URL.endpoints), body, {
      params: URL.params
    });
  }
  async delete<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }) {
    return await this.axios.delete<R>(convertResourceToURL(URL.endpoints), {
      params: URL.params
    });
  }
}

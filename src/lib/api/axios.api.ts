/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosInstance } from 'axios';
import { GenericRecord } from '../types/types';
import { createURLPath } from '../utils';
import { ResponseMessage } from '../types/api.types';

export class AxiosAPI {
  axios: AxiosInstance;
  constructor(baseURL: string) {
    this.axios = axios.create({
      baseURL: createURLPath([baseURL])
    });
  }

  async get<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }) {
    console.log(URL.params, 'params');
    return await this.axios.get<R>(createURLPath(URL.endpoints), {
      params: URL.params
    });
  }
  async post<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }, body: GenericRecord<any>) {
    return await this.axios.post<R>(createURLPath(URL.endpoints), body, {
      params: URL.params
    });
  }
  async put<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }, body: GenericRecord<any>) {
    return await this.axios.put<R>(createURLPath(URL.endpoints), body, {
      params: URL.params
    });
  }
  async delete<R>(URL: { endpoints: string[]; params?: GenericRecord<any> }) {
    return await this.axios.delete<R>(createURLPath(URL.endpoints), {
      params: URL.params
    });
  }

  static handleError(error: unknown): ResponseMessage {
    const err = error as AxiosError;
    const resMessage = err.response?.data as ResponseMessage;
    return resMessage;
  }
}

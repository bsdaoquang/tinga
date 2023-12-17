import {appInfos} from '../constants/appInfos';
import axiosClient from './axiosClient';

class DataAPI {
  handleProduct = async (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'delete' | 'get',
    isFile?: boolean,
    onProgress?: (val: any) => void,
  ) => {
    const res = await axiosClient(`${appInfos.baseUrl}/api/product${url}`, {
      headers: {
        'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
      },
      method: method ?? 'get',
      data: data ? (isFile ? data : JSON.stringify(data)) : undefined,
      onUploadProgress: onProgress ? onProgress : () => {},
    });

    return res;
  };
  handleUser = async (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'delete' | 'get',
    isFile?: boolean,
    onProgress?: (val: any) => void,
  ) => {
    return await axiosClient(`${appInfos.baseUrl}/api/user${url}`, {
      headers: {
        'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
      },
      method: method ?? 'get',
      data: data ? (isFile ? data : JSON.stringify(data)) : undefined,
      onUploadProgress: onProgress ? onProgress : () => {},
    });
  };
  handleAuth = async (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'delete' | 'get',
    isFile?: boolean,
    onProgress?: (val: any) => void,
  ) => {
    return await axiosClient(`${appInfos.baseUrl}/api/auth${url}`, {
      headers: {
        'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
      },
      method: method ?? 'get',
      data: data ? (isFile ? data : JSON.stringify(data)) : undefined,
      onUploadProgress: onProgress ? onProgress : () => {},
    });
  };
}

const handleGetData = new DataAPI();
export default handleGetData;

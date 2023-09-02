import AsyncStorage from '@react-native-async-storage/async-storage';
import {appInfos} from '../constants/appInfos';
import axiosClient from './axiosClient';

class AuthAPI {
  HandleAuth = async (
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

const authenticationAPI = new AuthAPI();
export default authenticationAPI;

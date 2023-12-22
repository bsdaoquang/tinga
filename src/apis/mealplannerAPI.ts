import {appInfos} from '../constants/appInfos';
import axiosClient from './axiosClient';

class DataAPI {
  handleMealPlanner = async (
    url: string,
    data?: any,
    method?: 'post' | 'put' | 'delete' | 'get',
    isFile?: boolean,
    onProgress?: (val: any) => void,
  ) => {
    const res = await axiosClient(
      `${appInfos.baseUrl}/api/mealplanner/${url}`,
      {
        headers: {
          'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
        },
        method: method ?? 'get',
        data: data ? (isFile ? data : JSON.stringify(data)) : undefined,
        onUploadProgress: onProgress ? onProgress : () => {},
      },
    );

    return res;
  };
}

const handleMealApi = new DataAPI();
export default handleMealApi;

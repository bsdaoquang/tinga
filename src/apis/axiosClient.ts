import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import queryString from 'query-string';
import {appInfos} from '../constants/appInfos';

const getAccessToken = async () => {
  const res: any = await AsyncStorage.getItem(appInfos.localDataName.userData);
  // console.log(res);
  return res ? JSON.parse(res).access_token : '';
};

const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const accessToken = await getAccessToken();

  config.headers = {
    Authorization: accessToken ? `Bearer ${accessToken}` : '',
    Accept: 'application/json',
    ...config.headers,
  };
  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if (response.status === 200 && response.data) {
      return response.data;
    } else {
      return response;
    }
  },
  error => {
    console.log(`error api ${JSON.stringify(error)}`);
    return error.response;
  },
);

export default axiosClient;

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import queryString from 'query-string';
import {appInfos} from '../constants/appInfos';

const getAccessToken = async () => {
  const res = await AsyncStorage.getItem(appInfos.localDataName.accessToken);

  return res ? JSON.parse(res) : '';
};

const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  const accessToken = await getAccessToken();

  // const accessToken = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xMjcuMC4wLjE6ODAwMFwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY5MzM1MjM1MSwibmJmIjoxNjkzMzUyMzUxLCJqdGkiOiIxNzVPV2JoelBoMnNwMTg1Iiwic3ViIjo1MjMsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.L4YVtPsjjg08QK2t_dAkBOlR7J0StRimalZlne9QD9I`;
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
    console.log(error);
    return error.response;
  },
);

export default axiosClient;

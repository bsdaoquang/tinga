
import axios from 'axios';
import queryString from 'query-string';



const axiosClient = axios.create({
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config: any) => {
  config.headers = {
    'Content-Type': 'application/json',
    ...config.headers,
  };
  config.data;

  return config;
});

axiosClient.interceptors.response.use(
  response => {
    if ( response.status === 200 && response.data) {
      return response.data;
    }else{

      return response;
    }

  },
  error => {
    console.log(error.response);
    return error.response;
  },
);

export default axiosClient;
    
import axios, { AxiosInstance } from "axios";

const defaultHeaders: { "Content-Type": string } = {
  "Content-Type": "application/json; charset=UTF-8",
};

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT,
  headers: { ...defaultHeaders },
});

const get = async (endpoint: string, headers: any = {}, params: any = {}) => {
  return axiosInstance
    .get(endpoint, {
      headers: { ...headers },
      params: { ...params },
    })
    .then((res: any) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
};

const post = async (
  endpoint: string,
  data: any = {},
  headers: any = {},
  params: any = {}
) => {
  return axiosInstance
    .post(endpoint, data, {
      headers: { ...headers },
      params: { ...params },
    })
    .then((res: any) => {
      return res;
    })
    .catch((error) => {
      return error.response;
    });
};

export { get, post };

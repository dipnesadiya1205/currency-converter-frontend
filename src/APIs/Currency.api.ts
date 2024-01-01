import { get, post } from "../utils/ApiManager";
import ENDPOINTS from "../utils/endpoints";

export const getCurrencyList: any = (params: any) => {
  return get(ENDPOINTS.currencyList, {}, params);
};

export const convertCurrency: any = (data: any) => {
  return post(ENDPOINTS.convert, data);
};

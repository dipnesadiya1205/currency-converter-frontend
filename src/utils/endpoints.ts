import { ServicesType } from "../types/common";

const API_VERSION: string = "api/v1/";

const SERVICES: ServicesType = {
  CURRENCY: "currency/",
};

const ENDPOINTS = {
  currencyList: `${API_VERSION}${SERVICES.CURRENCY}list`,
  convert: `${API_VERSION}${SERVICES.CURRENCY}convert`,
};

export default ENDPOINTS;

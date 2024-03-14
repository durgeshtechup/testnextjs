import authRequest from "utils/authRequest";
import request from "../utils/request";
import axios from "axios";

interface Payment {
  id: string;
  payment_id: string;
  et_id: string;
  amount: number;
  currency: string;
  gateway_id: string;
  gateway_hash: string;
  gateway_name: string;
  status: string;
  meta_info: string;
  payment_type: string;
  client: string;
  card_type: string;
  descriptor: string;
  refund_info: string;
  created_at: string;
  image: string;
  receipt_url: string;
}

interface SubscriptionObj {
  start_date: string;
  interval: string;
  duration: number;
  amount: number;
  currency: string;
  paid_payments: number;
  gateway_hash: string;
  gateway_name: string;
  descriptor: string;
  transaction: string;
  billing_cycles: number;
  status: string;
  id: string;
  subscription_id: string;
  payment: Payment[];
}


export const getAllSubscription = (params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/subscription/all",
      method: "post",
      params: params
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const DownloadCSV = (
  // type?: string,
  clients?: any,
  interval?: any,
  duration?: any,
  status?: any,


): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = `${clients?.length > 0 ? ('?clients=' + clients) : "?"}${interval?.length > 0 ? ('&interval=' + interval) : ""}${duration > 0 ? ('&duration=' + duration) : ""}${status?.length > 0 ? ('&status=' + status) : ""}`
    authRequest({
      url: "/api/v1/subscription/download-csv" + `${data}`,
      method: "get",
    })
      .then(({ data }) => {
        //console.log('data49', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const subscriptionGetClients = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/subscription/get-clients",
      method: "get",
    })
      .then(({ data }) => {
        //console.log('data49', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export const getSubscriptuionsFilter = (
  page: number,
  // curretClient: string,
  pageSize: number = 50,
  searchTexts?: string,

  // type?: string,
  clients?: any,
  interval?: any,
  duration?: any,
  // gateway?: any,
  // card_type?: any,
  status?: any,
  // timezone?: any,
  // start_date?: any,
  // end_date?: any,



): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = `${clients?.length > 0 ? '?clients=' + clients : "?"}${interval?.length > 0 ? ('&interval=' + interval) : ""}${duration > 0 ? ('&duration=' + duration) : ""}${status?.length > 0 ? ('&status=' + status) : ""}${searchTexts ? ('&search_term=' + searchTexts) : ""}`
    authRequest({
      url: "/api/v1/subscription/filter/" + page + "/" + pageSize + `${data}`,
      method: "get",
    })
      .then(({ data }) => {
        //console.log('data49', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
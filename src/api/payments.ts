import moment from "moment";
import authRequest from "../utils/authRequest";

export const getRecentPayments = (
  page: number,
  curretClient: string,
  type: boolean,
  pageSize: number = 10,
  params: any
): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/recent-payment/details/" + curretClient + page + "/" + pageSize + "?is_live=" + type,
      method: "get",
      params
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getGateways = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/gateways",
      method: "get",
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getCardType = (): Promise<any> => {
  console.log("called");
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/payment/card-type",
      method: "get",
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getTimeZone = (): Promise<any> => {
  console.log("called");
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/payment/time-zones",
      method: "get",
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const refundPayment = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/payment/refund",
      method: "post",
      data,
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getAllPayments = (
  page: number,
  curretClient: string,
  pageSize: number = 50,
  searchTerm: string,
  type: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      //url: "/api/v1/payment/details/" + curretClient + page + "/" + pageSize +`${type !== "all"?('?is_live=' + (type === "live"?true:false)):""}`+`search_term=${searchTerm}`,
      url: `/api/v1/payment/details/${curretClient}${page}/${pageSize}${type !== "all" ? `?is_live=${type === "live" ? true : false}` : ''}&search_term=${searchTerm}`,

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

export const getSearchPayments = (
  page: number,
  curretClient: string,
  pageSize: number = 50,
  searchTexts: string,
  type: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/payment/search?search_term=${searchTexts}&page=${page}&per_page=${pageSize}`,
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

export const getPaymentsFilter = (
  page: number,
  // curretClient: string,
  pageSize: number = 50,
  type?: string,
  client?: any,
  gateway?: any,
  card_type?: any,
  payment_status?: any,
  timezone?: any,
  start_date?: any,
  searchTexts?: string,
  end_date?: any,



): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = `${('?is_live=' + (type === "live" ? true : type === "test" ? false : "all"))}${client?.length > 0 ? ('&client-ids=' + client) : ""}${gateway?.length > 0 ? ('&gateway-id=' + gateway) : ""}${card_type?.length > 0 ? ('&card_type=' + card_type) : ""}${payment_status?.length > 0 ? ('&status=' + payment_status) : ""}${start_date ? ('&start-date=' + moment(start_date).format("YYYY-MM-DD")) : ""}${end_date ? ('&end-date=' + moment(end_date).format("YYYY-MM-DD")) : ""}${timezone ? ('&timezone=' + timezone) : ""}${searchTexts ? ('&search_term=' + searchTexts) : ""}`
    authRequest({
      url: "/api/v1/payment/filter/" + page + "/" + pageSize + `${data}`,
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

export const DownloadCSV = (
  type?: string,
  client?: any,
  gateway?: any,
  payment_status?: any,
  start_date?: any,
  end_date?: any,


): Promise<any> => {
  return new Promise((resolve, reject) => {
    const data = `${('?is_live=' + (type === "live" ? true : type === "test" ? false : "all"))}${client?.length > 0 ? ('&client-ids=' + client) : ""}${gateway?.length > 0 ? ('&gateway-id=' + gateway) : ""}${payment_status?.length > 0 ? ('&status=' + payment_status) : ""}${start_date ? ('&start-date=' + moment(start_date).format("YYYY-MM-DD")) : ""}${end_date ? ('&end-date=' + moment(end_date).format("YYYY-MM-DD")) : ""}`
    authRequest({
      url: "/api/v1/payment/download-csv" + `${data}`,
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


export const getLive = (
  // https://backend.lightningchecks.com/api/v1/payment/details/test/1/10
  type: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/payment/details/1/50" + `${type !== "all" ? "?is_live=" + (type === "test" ? false : true) : ""}`,
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


export const retryPayment = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/payment/retry",
      method: "post",
      data,
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const changePaymentStatus = (data: any, internal_id: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: `api/v1/payment/${internal_id}/change-status`,
      method: "post",
      data,
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const getStatusHistory = (data: any): Promise<any> => {
  console.log("called");
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/payment/${data}/payment_history`,
      method: "get",
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
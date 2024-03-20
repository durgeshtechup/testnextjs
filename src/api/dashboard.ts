import authRequest from "../utils/authRequest";

export const getAllTabs = (type: boolean, params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    // alert(type)
    authRequest({
      url: "/api/v1/dashboard/details?is_live=" + type,
      method: "get",
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

export const getTransactionByGateway = (type: string, live: boolean, params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/dashboard/gateways/" + type + "?is_live=" + live,
      method: "get",
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
export const getTransactionByAnalysis = (type: string, live: boolean, params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/dashboard/approval-percent" + "?is_live=" + live,
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

export const getTransactionByCurrency = (
  type: string,
  params: any,
  live: boolean
): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/dashboard/currency/" + type + "?is_live=" + live,
      method: "get",
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

export const getWawechratData = (params: any, type: boolean): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/dashboard/wavechart?is_live=" + type,
      method: "get",
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



export const getOrganizationDetails = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/dashboard/client-org-details",
      method: "get",
      // params: params
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const getClientDetails = (params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/dashboard/client-details",
      method: "get",
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
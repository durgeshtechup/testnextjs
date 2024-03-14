import authRequest from "../utils/authRequest";


export const getAllGateways = (data?:any,searchTexts?:string): Promise<any> => {
  //console.log("DDDDDDD",data);
  let dataQueryParam ="";
  if (data) {
    if (Array.isArray(data)) {
        // If data is an array
        dataQueryParam = data.length > 0 ? `?assigned_payment_methods=${data}` : "";
    } else if (typeof data === "string") {
        // If data is a string
        dataQueryParam = `?search_term=${data??""}`;
    }
  }
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/gateways${dataQueryParam}`,
      //url: `/api/v1/gateways${data?.length> 0 ? `?assigned_payment_methods=${data}`:""}`,
      //url: `/api/v1/gateways${data?.length > 0 ? `?assigned_payment_methods=${data}` : ""}${searchTexts?.length > 0 ? `${data?.length > 0 ? '&' : '?'}search_term=${searchTexts}` : ""}`,

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

export const getAllGatewaysByClient = (client_id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/client/${client_id}/gateways`,
      method: "get",
    })
      .then(({ data }) => {
        // console.log('data', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const createGateway = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/gateway",
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

export const updateGateway = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/gateway/" + data.id,
      method: "put",
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

export const getGateway = (data: { id: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/gateway/" + data.id,
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

export const deleteGateway = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/gateway/" + id,
      method: "delete",
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

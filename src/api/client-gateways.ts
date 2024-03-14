import authRequest from "../utils/authRequest";

export const createClientGateway = (data: {
  client_id: string;
  method: string;
  gateway_id: string;
  body: any;
  to_convert?: any;
  new_currency?: any;
  reserved_pricing?: any;
  settlement?: any;
}): Promise<any> => {
  //@ts-ignore
  const { client_id, gateway_id, is_live, body, method, to_convert, new_currency, reserved_pricing, settlement } = data;
  let payload = {
    ...body,
    is_live: is_live,
    to_convert,
    new_currency,
    reserved_pricing,
    settlement
  }
  //console.log("rtretet",body ,data,payload)
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/client/" + client_id + "/gateway/" + gateway_id,
      method: method,
      data: payload,
    })
      .then(({ data }) => {
        //console.log('data23', data)

        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};


export const enableGateway = (data: { id: string; }): Promise<any> => {

  return new Promise((resolve, reject) => {
    // console.log('id29', data)
    authRequest({
      url: `/api/v1/client/${data?.id}`,
      method: "put",
      data
    })
      .then(({ data }) => {
        // console.log('data34', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateClient = (data: {
  id: string;
  name: string;
  descrption?: string;
  bot_name?: string;

}): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/client/update",
      method: "post",
      data,
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

export const deleteClient = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/client/" + id,
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

export const deleteClientGateway = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/client/" + data?.client_id + "/gateway/" + data?.gateway_id,
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



export const getEnabledSmartRoute = (id: String): Promise<any> => {
  // console.log('id', id)	
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/client/${id}`,
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


export const getGatewayForClient = (id: String, gateway_id: String): Promise<any> => {
  // console.log('id', id)	
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/client/${id}/gateway/${gateway_id}`,
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

export const verifyWalletAddress = (data: {
  id?: String;
  gateway_id?: String;
  password?: any;
  otp?: any;
  wallet_id?: any
}): Promise<any> => {
  // console.log('id', id)	
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/client/${data?.id}/gateway/${data?.gateway_id}/ewallet/verify`,
      method: "post",
      data
    })
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
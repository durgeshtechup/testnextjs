import authRequest from "../utils/authRequest";


export const createSmartRouting = (data: any,id:String): Promise<any> => {
    return new Promise((resolve, reject) => {
      authRequest({
        // url: "/api/v1/client/{XweiGwIEh2fmfCMoco1WH7WhBBaYCfDYq4LeLTWSK7Q}/smart_route",
        url: `/api/v1/client/${id}/smart_route`,
        method: "post",
        data,
      })
      //@ts-ignore
        .then(({ data,id}) => {
            // console.log('Create data', data)
          resolve({data,id});
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

  export const getSmartRouting = (id:String): Promise<any> => {
    // console.log('id', id)
  
    return new Promise((resolve, reject) => {
      authRequest({
        url: `/api/v1/client/${id}/smart_route`,
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


  export const updateSmartRouting = (data: any,id:string): Promise<any> => {
    return new Promise((resolve, reject) => {
      authRequest({
        url: `/api/v1/client/${id}/smart_route`,
        method: "put",
        data,
      })
        .then(({ data }) => {
            // console.log('Update data', data)
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };



  export const deleteSmartRouting = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      authRequest({
        url: "/api/v1/client/XweiGwIEh2fmfCMoco1WH7WhBBaYCfDYq4LeLTWSK7Q/smart_route",
        method: "delete",
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
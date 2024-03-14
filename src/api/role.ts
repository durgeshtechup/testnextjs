import toast from "react-hot-toast";
import authRequest from "utils/authRequest";


export const getRolePermission = ( 
  page?: number,
  pageSize?: number
  ): Promise<any> => {
  
    return new Promise((resolve, reject) => {
      authRequest({
        url: `/api/v1/role/all${page ? `?page=${page}&per_page=${pageSize}`:""}`,
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
export const getRoleDrop = (): Promise<any> => {
  
    return new Promise((resolve, reject) => {
      authRequest({
        url: `/api/v1/role/dropdown`,
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
export const getSingleRole = (id:any): Promise<any> => {
  
    return new Promise((resolve, reject) => {
      authRequest({
        url: `/api/v1/role/${id}`,
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
  
  export const postUserPermission = (data: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      authRequest({
        url: "/api/v1/role/create",
        method: "post",
        data,
      })
        .then(({ data }) => {
          resolve(data);
          toast.success(data?.message?data?.message:"Role Created Successfully");
        })
        .catch((err) => {
          reject(err);
          toast.error(err?.message);
        });
    });
  };
  export const updateUserPermission = (data: any,id:any): Promise<any> => {
    return new Promise((resolve, reject) => {
      authRequest({
        url: `/api/v1/role/update/${id}`,
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

  export const deleteRole = (id: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      authRequest({
        url: "/api/v1/role/delete/" + id,
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
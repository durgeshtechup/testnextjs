import authRequest from "utils/authRequest";
import request from "../utils/request";
import axios from "axios";

export interface CreditsInfo {
  id: string;
  one_time_credits?: number;
  reward_credits?: number;
  recurring_credits?: number;
}

export interface UserInfo {
  id: string;
  name?: string;
  email: string;
  avatar?: string;
  age?: string;
  providers?: string;
  credits?: CreditsInfo;
}


export const userLogin = (loginData: {
  email: string;
  password: string;
}): Promise<any> => {
  return new Promise((resolve, reject) => {
    request({
      url: "/api/v1/login",
      method: "post",
      data: loginData,
    })
      .then(({ data }: any) => {
        resolve(data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const userSignup = (loginData: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: string;
}): Promise<any> => {
  return new Promise((resolve, reject) => {
    request({
      url: "/api/v1/user",
      method: "post",
      data: loginData,
    })
      .then(({ data }: any) => {
        resolve(data);
      })
      .catch((err: any) => {
        reject(err);
      });
  });
};

export const getProfile = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/profile",
      method: "get",
    })
      .then(({ data }) => {
        // console.log('data70', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const get2FAData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/auth_details",
      method: "get",
    })
      .then(({ data }) => {
        // console.log('data70', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const get2FTAuth = (data:any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/manage_2FA`,data)
      .then(({ data }) => {
        // console.log('data70', data)
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const getRecover= (data:any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/verify-recover-key`,data)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
export const get2FTAuthVerify = (data:any): Promise<any> => {
  return new Promise((resolve, reject) => {
    axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/v1/user/verify-otp`,data)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const updateProfile = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/profile",
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

export const updatePassword = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/password",
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

export const deleteProfile = (data: UserInfo): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/profile",
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

export const createUser = (data: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user",
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

export const updateUser = (data: any, id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/" + id,
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

export const deleteUser = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/" + id,
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

export const getUser = (data: { id: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/user/" + data.id,
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

export const getAllUsers = (params: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/users/details",
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
export const getAllUsersData = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/users/details",
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

import authRequest from "../utils/authRequest";

export interface OrganizationInfo {
  id?: string;
  name?: string;
  description: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export const createOrganization = (data: OrganizationInfo): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/organization",
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

export const updateOrganization = (data: OrganizationInfo): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/organization/" + data.id,
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

export const getOrganization = (data: { id: string }): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/organization/"+ data.id,
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

export const getAllOrganizationsUser = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/organization/user-all-orgainzation-list",
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
export const getAllOrganizations = (
  page?: number,
  pageSize?: number,
  searchTexts?:string,
  ): Promise<any> => {
  //console.log("pageSize",pageSize);
  return new Promise((resolve, reject) => {
    authRequest({
      url: `/api/v1/organization/all-orgainzation-list?search_term=${searchTexts??""}${page ? `&page=${page}&per_page=${pageSize}`:""}`,
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

export const deleteOrganization = (id: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    authRequest({
      url: "/api/v1/organization/" + id,
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

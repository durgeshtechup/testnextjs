import toast from "react-hot-toast";
import authRequest from "utils/authRequest";


export const getAllTokens = (
    page?: number,
    pageSize?: number,
    searchTexts?: any
): Promise<any> => {

    return new Promise((resolve, reject) => {
        authRequest({
            // url: `/api/v1/token/all${page ? `?page=${page}&per_page=${pageSize}` : ""}`,
            // url: `/api/v1/token/all`,
            url: `/api/v1/token/all?page=${page}&per_page=${pageSize}${searchTexts ? "&searchTexts=" + searchTexts : ""}`,

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


export const verifyTokenId = (data: {
    password: any;
    otp: any;
    token_unique_id: any
}): Promise<any> => {
    return new Promise((resolve, reject) => {
        authRequest({
            url: `/api/v1/token/verify`,
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
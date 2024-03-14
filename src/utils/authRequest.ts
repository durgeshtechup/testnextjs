import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from "axios";
import { clearAllCookie, getToken } from "./auth";
import { createBrowserHistory } from 'history';


export const authPages = [
  "/auth/sign-in",
  "/auth/signup",
];

let cancelTokenSource = axios.CancelToken.source();

export default function authRequest(
  options: AxiosRequestConfig,
  token?: string
): AxiosPromise<any> {
  const history = createBrowserHistory()

  token = token ?? getToken();
  if (!token) {
    history.push("/auth/sign-in");
    return Promise.reject(new AxiosError("Invalid Token", "401"));
  }
  cancelTokenSource = axios.CancelToken.source();
  const request = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: { Authorization: `Bearer ${token}` },
    cancelToken: cancelTokenSource.token,
  });
  request.interceptors.response.use(
    function (res) {
      return res;
    },
    function (error) {
      if (
        error?.response?.status === 401 &&
        !!!authPages?.find((path) => window.location.href.includes(path))
      ) {
        // dispatch(initMain())
        clearAllCookie();
        history.push("/auth/sign-in");
      }
      if (error?.response?.status === 422) {
        return Promise.reject(
          new AxiosError("Please provide valid values", "422")
        );
      }
      // else {
      //   try {
      //     const { email, message } = JSON.parse(error?.response?.data?.detail);
      //     if (email) {
      //       // redirect to verify-email page
      //       logout({ email });
      //       return Promise.reject({
      //         ...error,
      //         response: {
      //           ...error?.response,
      //           data: { ...error?.response?.data, detail: message },
      //         },
      //       });
      //     }
      //   } catch (err) {}
      // }
      return Promise.reject(error);
    }
  );
  return request(options);
}

export function cancelRequest() {
  cancelTokenSource.cancel();
}

export function isCanceled(err: any) {
  return axios.isCancel(err);
}

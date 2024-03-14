import Cookies from "js-cookie";
const TokenKey: string = "app_auth";
const UserKey: string = "user_id";

export function getToken(): string | undefined {
  return Cookies.get(TokenKey);
}
export function setToken(token: string): string | undefined {
  return Cookies.set(TokenKey, token);
}
export function getId(): string | undefined {
  return Cookies.get(UserKey);
}
export function setId(id: string): string | undefined {
  return Cookies.set(UserKey, id);
}
export function clearAllCookie() {
  Cookies.remove(TokenKey);
}

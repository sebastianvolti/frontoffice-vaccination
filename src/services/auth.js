import axios from "axios";

import { SERVICES_URL } from "../constants";

/**
 * Get user data from OpenID
 * @param {string} code
*/
export function AuthGateway(code) {
  const request = {
    url: `/authentication-web/rest/authentication/public/userInfo/${code}`,
    method: "get",
    baseURL: SERVICES_URL,
    withCredentials: 'true', 
  };
  return axios(request);
}

/**
 * Verify cookie state
 */
export function AuthVerify() {
  const request = {
    url: "/authentication-web/rest/authentication/validateToken",
    method: "get",
    baseURL: SERVICES_URL,
    withCredentials: 'true', 
  };
  return axios(request);
}


export function CleanCookie() {
  const request = {
    url: "/authentication-web/rest/authentication/public/cleanJWT",
    method: "get",
    baseURL: SERVICES_URL,
    withCredentials: 'true', 

  };
  return axios(request);
}

export function Logout() {
  const request = {
    url: "/authentication-web/rest/authentication/public/logout",
    method: "get",
    baseURL: SERVICES_URL,
    withCredentials: 'true', 
  };
  return axios(request);
}

export function UserConfirmation(confirmation) {
  const request = {
      url: "/authentication-web/rest/authentication/user/confirmation",
      method: "post",
      baseURL: SERVICES_URL,
      data: confirmation
  };
  return axios(request);
}

export const LogoutUrl = `${SERVICES_URL}/authentication-web/rest/authentication/public/logout`;

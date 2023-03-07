import jwt_decode from "jwt-decode";

import { LoginUserType } from "./type";

export const RESET = null;

export const getTokenData = (token: string) => {
  const data: LoginUserType = jwt_decode(token);


  if (!data) return null;

  return {
    email: data.user.email,
    userName: data.user.userName,
    id: data.user.id,
    roles: data.user.roles,
  };
};



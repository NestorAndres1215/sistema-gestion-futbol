import { getToken } from "../token/token";

export const authGuard = () => {
  const token = getToken();

  if (!token) {
    return false;
  }

  return true;
};
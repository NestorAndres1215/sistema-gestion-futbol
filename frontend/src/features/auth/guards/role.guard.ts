import { getUser } from "../token/token";

export const roleGuard = (role: string) => {
  const user = getUser();

  if (!user) return false;

  return user.role === role;
};
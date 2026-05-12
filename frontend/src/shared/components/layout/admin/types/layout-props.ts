import { User } from "./user";

export type Props = {
  children: React.ReactNode;
  user?: User;
  pageTitle?: string;
  pageSubtitle?: string;
};
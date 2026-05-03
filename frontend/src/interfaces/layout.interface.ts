export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: { text: string; variant: "red" | "green" | "blue" };
};

export type NavSection = {
  title: string;
  items: NavItem[];
};

export type User = {
  name: string;
  initials: string;
  role: string;
};

export type Props = {
  children: React.ReactNode;
  user?: User;
  pageTitle?: string;
  pageSubtitle?: string;
};

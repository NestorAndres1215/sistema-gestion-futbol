export type NavItem = {
  id: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: { text: string; variant: "red" | "green" | "blue" };
};


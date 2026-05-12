export type Crumb = {
  label: string;
  href?: string;
};

export type Props = {
  items: Crumb[];
};
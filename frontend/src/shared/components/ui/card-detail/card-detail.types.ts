export type DetailItem = {
  label: string;
  value: any;
};

export type Props = {
  title: string;
  image?: string | null;
  items: DetailItem[];
};
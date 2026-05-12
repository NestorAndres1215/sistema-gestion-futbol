export type Option = {
  label: string;
  value: string;
};

export type Props = {
  onChange: (filters: Record<string, any>) => void;
  selectFilters?: {
    key: string;
    placeholder?: string;
    options: Option[];
  }[];
};
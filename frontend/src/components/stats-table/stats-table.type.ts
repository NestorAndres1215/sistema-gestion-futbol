export type Column<T> = {
  key: keyof T;
  label: string;
  accent?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

export type StatsTableProps<T> = {
  title: string;
  icon?: string;
  data: T[];
  columns: Column<T>[];
  sortBy?: keyof T;
};
export type SelectionCardProps = {
  title: string;
  description?: string;
  icon?: string;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};
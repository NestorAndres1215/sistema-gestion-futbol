export type CardListProps<T> = {
  data: T[];
  getTitle: (item: T) => string;
  getSubtitle?: (item: T) => string;
  getImage?: (item: T) => string | null;
  onDetail?: (item: T) => void;
  imageClassName?: string;
  imageVariant?: "logo" | "perfil";
};
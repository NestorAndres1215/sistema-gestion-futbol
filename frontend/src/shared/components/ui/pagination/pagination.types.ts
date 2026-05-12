export type Props = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
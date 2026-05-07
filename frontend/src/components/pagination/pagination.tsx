import styles from "./pagination.module.css";
import { Props } from "./pagination.types";



export default function Pagination({ currentPage, totalPages, onPageChange }: Props) {
  return (
  <div className="d-flex justify-content-center align-items-center gap-1 mt-3">
      {/* Anterior */}
      <button
        className={styles.btn}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Página anterior"
      >
        <i className="fa-solid fa-chevron-left" />
      </button>

   
      <div className={styles.counter}>

        <span className={styles.current}>{currentPage}</span>
        <span className={styles.sep}>/</span>
        <span className={styles.total}>{totalPages}</span>
      </div>

      <button
        className={styles.btn}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Página siguiente"
      >
        <i className="fa-solid fa-chevron-right" />
      </button>
    </div>
  );
}
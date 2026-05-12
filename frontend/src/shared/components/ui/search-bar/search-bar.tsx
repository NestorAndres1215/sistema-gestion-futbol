import styles from "./search-bar.module.css";
import { Props } from "./search.types";

export default function SearchBar({
  value,
  onSearch,
  placeholder = "Buscar usuario...",
}: Props & { value: string }) {
  return (
    <div className={styles.wrapper}>
      <i className={`fa-solid fa-magnifying-glass ${styles.iconSearch}`}></i>

      <input
        type="text"
        value={value}  
        onChange={(e) => onSearch(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
      />

      {value && (
        <button
          type="button"
          onClick={() => onSearch("")}
          className={styles.clearBtn}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
}
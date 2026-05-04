
import { useState, useRef } from "react";
import styles from "./search-bar.module.css";
import { Props } from "./search.types";


export default function SearchBar({
  onSearch,
  placeholder = "Buscar usuario...",
}: Props) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleClear = () => {
    setValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <div className={`${styles.wrapper} ${focused ? styles.focused : ""}`}>
      <i className={`fa-solid fa-magnifying-glass ${styles.iconSearch}`}></i>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className={styles.input}
        autoComplete="off"
        spellCheck={false}
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className={styles.clearBtn}
          aria-label="Limpiar búsqueda"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
}
import { useState } from "react";
import styles from "./filter-bar.module.css";
import { Props } from "./filter-bar.type";

export default function FilterBar({ onChange, selectFilters = [] }: Props) {
  const [values, setValues] = useState<Record<string, any>>({});

  const update = (key: string, value: any) => {
    const next = { ...values, [key]: value };
    setValues(next);
    onChange(next);
  };

  return (
   <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
      {selectFilters.map((filter) => (
        <div key={filter.key} className="position-relative d-flex align-items-center flex-grow-1" style={{ minWidth: "160px", flex: 2 }}>
          <i className={`fa-solid fa-chevron-down ${styles.selectIcon}`} />
          <select
            value={values[filter.key] || ""}
            onChange={(e) => update(filter.key, e.target.value)}
            className={styles.select}
          >
            <option value="">{filter.placeholder || "Todos"}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
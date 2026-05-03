"use client";

import { useState } from "react";

export default function SearchBar({ onSearch }: { onSearch: (value: string) => void }) {
  const [value, setValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Buscar usuario..."
      value={value}
      onChange={handleSearch}
      style={{ marginBottom: "10px", padding: "5px" }}
    />
  );
}
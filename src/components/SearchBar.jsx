function SearchBar({ value, onChange, onEnter }) {
  return (
    <input
      type="text"
      value={value}
      placeholder="Search movies..."
      onChange={onChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.target.blur();
          if (onEnter) onEnter(value);
        }
      }}
      style={{
        padding: "10px",
        width: "300px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        outline: "none",
      }}
    />
  );
}

export default SearchBar;
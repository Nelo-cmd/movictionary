export default function SearchBar({ onSearch }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      onChange={(e) => onSearch(e.target.value)}
    />
  );
}

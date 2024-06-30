export default function SearchBar({ searchParameter, setSearchParameter }) {
  return (
    <label className="search-bar">
      Search for:
      <input
        value={searchParameter}
        onChange={(e) => setSearchParameter(e.target.value)}
        placeholder="Player Name"
      />
    </label>
  );
}

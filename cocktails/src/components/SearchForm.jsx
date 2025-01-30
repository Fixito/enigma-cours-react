export default function SearchForm({ searchTerm, onSearchInput }) {
  return (
    <div>
      <label htmlFor='search'>Search cocktails: </label>
      <input type='search' value={searchTerm} onChange={onSearchInput} />
    </div>
  );
}

import { useTexts } from "../contexts/TextsContext";

const SearchBar = () => {
  const { setSearchQuery } = useTexts();

  return (
    <input
      className="border"
      type="text"
      placeholder="Search..."
      onChange={(event) => setSearchQuery(event.target.value)}
    />
  );
};

export default SearchBar;

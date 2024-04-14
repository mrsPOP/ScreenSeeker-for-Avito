import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./style.css";

const { Search } = Input;

const getRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  return searches ? JSON.parse(searches) : [];
};

const addRecentSearch = (searchValue: string) => {
  let searches = getRecentSearches();
  searches = [
    searchValue,
    ...searches.filter((value: string) => value !== searchValue),
  ].slice(0, 20);
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  let [_, setSearchParams] = useSearchParams();

  const handleSearch = (value: string) => {
    const valueWithNoSpaces = value.trim();
    if (value !== "" && valueWithNoSpaces !== '') {
      addRecentSearch(valueWithNoSpaces);
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("query", value);
      setSearchParams(newSearchParams);
      setIsSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    setSuggestions(
      getRecentSearches().filter((search: string) =>
        search.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value.trim());
  };

  return (
    <div className="search-input-container">
      <Search
        size="large"
        placeholder="Название фильма"
        prefix={<SearchOutlined />}
        value={searchValue}
        onChange={handleChange}
        onSearch={handleSearch}
        enterButton="Искать"
        className="search-input"
        onFocus={() => setIsSuggestionsVisible(true)}
        onBlur={() => setTimeout(() => setIsSuggestionsVisible(false), 0)}
      />
      {suggestions.length > 0 && (
        <ul
          className={
            isSuggestionsVisible
              ? "search-suggestions"
              : "search-suggestions-hidden"
          }
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => {
                console.log(suggestion);
                setSearchValue(suggestion);
                handleSearch(suggestion);
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchInput;

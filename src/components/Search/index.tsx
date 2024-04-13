import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useState } from "react";
import "./style.css";
import { getMovieBySearch } from "../../api";
import { useSearchParams } from "react-router-dom";

const { Search } = Input;

const SearchInput = () => {
  const [searchValue, setSearchValue] = useState("");
  let [_, setSearchParams] = useSearchParams();

  const handleSearch = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set("query", searchValue);
    setSearchParams(newSearchParams);
    console.log("Поиск запущен для:", searchValue);
  };

  return (
    <div className="search-input-container">
      <Search
        size="large"
        placeholder="Название фильма"
        prefix={<SearchOutlined />}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        enterButton="Искать"
        className="search-input"
      />
    </div>
  );
};

export default SearchInput;

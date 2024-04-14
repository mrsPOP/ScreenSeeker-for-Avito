export const getRecentSearches = () => {
  const searches = localStorage.getItem("recentSearches");
  return searches ? JSON.parse(searches) : [];
};

export const addRecentSearch = (searchValue: string) => {
  let searches = getRecentSearches();
  searches = [
    searchValue,
    ...searches.filter((value: string) => value !== searchValue),
  ].slice(0, 20);
  localStorage.setItem("recentSearches", JSON.stringify(searches));
};
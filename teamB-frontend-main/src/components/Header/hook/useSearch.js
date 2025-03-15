import { useState } from "react";

const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const resetSearch = () => {
    setSearchQuery("");
  };

  return {
    searchQuery,
    handleSearchChange,
    resetSearch,
  };
};

export default useSearch;

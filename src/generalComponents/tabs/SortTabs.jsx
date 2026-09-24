import React from "react";
import { defaultSortOptions } from "../../utils/constant";
import SortTabBox from "./SortabBox";

const SortTabs = ({ sortBy, sortOrder, onSortChange, sortOptions }) => {
  const options = sortOptions || defaultSortOptions;

  const handleSortClick = (value) => {
    if (sortBy === value) {
      onSortChange(value, sortOrder === "asc" ? "desc" : "asc");
    } else {
      onSortChange(value, "desc");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 sort-tabs">
      <SortTabBox
        options={options}
        sortBy={sortBy}
        handleSortClick={handleSortClick}
        sortOrder={sortOrder}
      />
    </div>
  );
};

export default SortTabs;

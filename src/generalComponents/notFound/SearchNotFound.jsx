import React from "react";
import { IMAGES } from "../../assets";

const SearchNotFound = ({ message = "No results found" }) => {
  return (
    <div className="text-center py-2">
      <div className="mb-1">
        <img
          src={IMAGES.NO_DATA_FOUND}
          alt="No results"
          className="w-32 h-32 sm:w-36 sm:h-36 mx-auto object-contain"
        />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
        {message}
      </h3>
    </div>
  );
};

export default SearchNotFound;

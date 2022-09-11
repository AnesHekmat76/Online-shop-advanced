import React from "react";
// import { useState } from "react";

const SortSelect = ({ sortSelectChangeHandler, sortSelectValue }) => {
  const fetchedCategories = ["Cheapest", "Expensive", "Newest"];

  const categoryOption = fetchedCategories.map((category, index) => {
    const categoryInnerText =
      category.charAt(0).toUpperCase() + category.slice(1);
    return (
      <option key={index} value={category}>
        {categoryInnerText}
      </option>
    );
  });

  return (
    <div className="mt-6 w-46/100 sm:w-46/100 sm:ml-3 sm:mt-0 lg:ml-4">
      <select
        value={sortSelectValue}
        onChange={sortSelectChangeHandler}
        className="text-sm px-2 w-full h-9 border-b border-gray-400 cursor-pointer outline-none"
      >
        <option value="">Sort</option>
        {categoryOption}
      </select>
    </div>
  );
};
export default React.memo(SortSelect);

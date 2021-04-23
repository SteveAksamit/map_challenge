import React from "react";

const Select = ({ rangeOptions = [], handleSelect, selectedVal }) => {
  return (
    <select
      onChange={handleSelect}
      value={selectedVal}
      className="visits-select"
    >
      {rangeOptions.map((option, i) => (
        <option key={i + 1} value={option.value}>
          {option.visitRange}
        </option>
      ))}
    </select>
  );
};

export default Select;

import React, { useState } from "react";
import styled from "styled-components";

const FilterButton = styled.button`
  vertical-align: middle;
  padding: 0;
  border: solid 1px #000;
  width: 55px;
  height: 21px;
  margin-left: 3px;
  font-size: 12px;
  text-align: center;

  padding-right: 10px;
  padding-left: 10px;
  height: 21px;
  margin: 2px;

  &:disabled {
    cursor: not-allowed;
    color: gray;
  }
`;
const ClearButton = styled(FilterButton)`
  background-color: #fff;
  color: #000;
`;

const ApplyButton = styled(FilterButton)`
  background-color: #000;
  color: #fff;
`;

const ActionButtons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  width: 100%;
  border: 1px solid black;
  padding: 5px;
  margin: 20px 2px;
`;

const Search = props => {
  const { onSearch, onClear } = props;

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleClear() {
    setValue("");
    onClear();
  }

  function handleSearch() {
    onSearch(value);
  }

  return (
    <>
      <ActionButtons>
        <ClearButton onClick={handleClear}>Clear</ClearButton>

        <ApplyButton disabled={value === ""} onClick={handleSearch}>
          Apply
        </ApplyButton>
      </ActionButtons>

      <SearchInput
        type="text"
        value={value}
        placeholder="Search"
        onChange={handleChange}
      ></SearchInput>
    </>
  );
};

export default Search;

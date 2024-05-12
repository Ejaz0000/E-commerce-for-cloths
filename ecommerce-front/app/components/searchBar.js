"use client"
import { useState } from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  background-color: #edeef0; 
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  border: 2px solid #aaa;
  border-radius: 5px;
  width: 250px;
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }
`;

const SearchInput = styled.input`
  background-color: transparent; 
  padding: 5px 0px;
  outline: none;
  font-size: 16px;
  border: 0px;
`;

const SearchButton = styled.button`
  
  background-color: transparent;
  border: 0px; 
  color: black;
  cursor: pointer;
  padding-left: 10px;
  padding-right: 0px;
  border-left: 2px solid #aaa;
  svg{
    width:15px;
    height: 15px;
    color: #252626;
  }

 
`;

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    return(
        <SearchContainer>
        <SearchInput
          type="text"
          placeholder={"Search..."}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <SearchButton>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
        </SearchButton>
      </SearchContainer>
    )
};

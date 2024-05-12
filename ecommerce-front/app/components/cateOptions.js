import styled from "styled-components";
import Checkbox from "./checkbox";
import { useState } from "react";


const StyledCheckbox = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #333;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  margin-right: 8px;

  &:checked {
    background-color: #eee;
  }
`;


const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 16px;
  width: 130px;
  padding: 0 5px;
  margin: 2px 0;
  border-radius: 5px;
  &:hover{
    background-color: #666;
  }
`;
export default function CateOptions(params) {
    const checkboxOptions = ['T-shirt', 'Hoodi', 'Jacket'];
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleCheckboxChange = (option) => {
        const currentIndex = selectedOptions.indexOf(option);
        const newSelectedOptions = [...selectedOptions];
    
        if (currentIndex === -1) {
          newSelectedOptions.push(option);
        } else {
          newSelectedOptions.splice(currentIndex, 1);
        }
    
        setSelectedOptions(newSelectedOptions);
      };
    return(
        <>
        {checkboxOptions.map((option) => (
        <CheckboxContainer>
        <StyledCheckbox
          type="checkbox"
          checked={selectedOptions.includes(option)}
          onChange={() => handleCheckboxChange(option)}
        />
        {option}
      </CheckboxContainer>
      ))}
            </>
    )
};

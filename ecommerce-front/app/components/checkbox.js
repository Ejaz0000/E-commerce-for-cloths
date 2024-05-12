
import React from 'react';
import styled from 'styled-components';


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
    background-color: #333;
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

export default function Checkbox({ label, checked, onChange }) {
    return (
        <CheckboxContainer>
          <StyledCheckbox
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          {label}
        </CheckboxContainer>
      );
};

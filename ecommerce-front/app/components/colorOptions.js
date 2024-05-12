import { useState } from "react";
import styled from "styled-components";

const Colorbtn = styled.button`
  background-color: ${props => props.color};
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

const ColorsContainer = styled.div`
    margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

`;

const Circle = styled.div`
  background-color: transparent;
  border: solid 2px #b6ded9;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`;
export default function ColorOptions(params) {
    const [selectedColor,setselectedColor] = useState([]);
    const colors = ["#22D3EF", "#eee", "#777", "#999","#55D3EF", "#fff", "#888", "#444","#44D3EF", "#ggg", "#33D3EF", "#555"];
    function addColors(color){
        setselectedColor(prev=> [...prev,color]);
    }
    function removeColors(color){
        setselectedColor(prev=> prev.filter(p=> p!=color));
    }
    return(
        <ColorsContainer>
           {colors.map((color)=>
            (selectedColor.includes(color) ?
              (<Circle>
              <Colorbtn  onClick={()=> removeColors(color)} color={color}/>
              </Circle>
              ) :
              (<Colorbtn onClick={()=> addColors(color)} color={color}/>))
           )}
           </ColorsContainer>
    );

};

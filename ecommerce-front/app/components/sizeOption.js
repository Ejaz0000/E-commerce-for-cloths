import { useState } from "react";
import styled from "styled-components";

const Sizebtn = styled.button`
  background-color: #111;
  border: none;
  padding: 2px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  color: #b6ded9;
`;

const SizesContainer = styled.div`
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
export default function SizeOptions(params) {
    const [selectedSize,setselectedSize] = useState([]);
    const sizes = ["XS", "S", "M", "L"];

    function addSize(size){
        setselectedSize(prev=> [...prev,size]);
    }
    function removeSize(size){
        setselectedSize(prev=> prev.filter(p=> p!=size));
    }
    return(
        <SizesContainer>
           {sizes.map((size)=>
            (selectedSize.includes(size) ?
              (<Circle>
              <Sizebtn  onClick={()=> removeSize(size)}>
                {size}
                </Sizebtn>
              </Circle>
              ) :
              (<Sizebtn onClick={()=> addSize(size)}>{size}
              </Sizebtn>))
           )}
           </SizesContainer>
    );

};

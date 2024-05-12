import { useState } from "react";
import styled from "styled-components";

const Designbtn = styled.button`
  background-color: ${props => props.Active ? "#111" : "#444"};
  border: ${props => props.Active ? "solid 1px #b6ded9" : "none"};
  padding: 4px 5px;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #b6ded9;
`;

const DesignsContainer = styled.div`
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
export default function DesignOptions(params) {
    const [selectedDesigns,setselectedDesigns] = useState([]);
    const designs = ["Anime", "Movies", "Series", "Cartoon","Quotes"];

    function addDesign(design){
        setselectedDesigns(prev=> [...prev,design]);
    }
    function removeDesign(design){
        setselectedDesigns(prev=> prev.filter(p=> p!=design));
    }
    return(
        <DesignsContainer>
           {designs.map((design)=>
            (selectedDesigns.includes(design) ?
              (
              <Designbtn  onClick={()=> removeDesign(design)} Active={true}>
                {design}
                </Designbtn>
            
              ) :
              (<Designbtn onClick={()=> addDesign(design)} Active={false}>{design}
              </Designbtn>))
           )}
           </DesignsContainer>
    );

};

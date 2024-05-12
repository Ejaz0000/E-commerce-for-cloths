import styled from "styled-components";
import Checkbox from "./checkbox";
import ColorOptions from "./colorOptions";
import SizeOptions from "./sizeOption";
import DesignOptions from "./designOptions";
import Button from "./buttons";
import CateOptions from "./cateOptions";

const Heading = styled.h2`
    color: #b6ded9;
    font-size: 1.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
    svg{
      width: 30px;
    }
`;

const ButtonsWrapper = styled.div`
display: flex;
gap: 10px;
margin-top: 20px;
`;

const Properties = styled.div`
 max-height: 400px;
 overflow-y: scroll;
 scrollbar-width: thin; 
 scrollbar-color: #888 transparent; 
 
`;

const PropTitle = styled.h3`
    color: #b6ded9;
    margin: 10px 0;
`;

const FilterContainer = styled.div`
    background-color: #222;
    border-radius: 10px;
    padding: 30px;
    color: #b6ded9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-top: 30px;
    height: 550px;
`;


export default function FilterBox(params) {
    return(
        <FilterContainer>
            <Heading>Filter
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M18.75 12.75h1.5a.75.75 0 0 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM12 6a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 6ZM12 18a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 12 18ZM3.75 6.75h1.5a.75.75 0 1 0 0-1.5h-1.5a.75.75 0 0 0 0 1.5ZM5.25 18.75h-1.5a.75.75 0 0 1 0-1.5h1.5a.75.75 0 0 1 0 1.5ZM3 12a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 3 12ZM9 3.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM12.75 12a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0ZM9 15.75a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" />
            </svg>

            </Heading>
            <Properties>
            <PropTitle>Category</PropTitle>
            <CateOptions/>
            <PropTitle>Color</PropTitle>
            <ColorOptions/>
            <PropTitle>Size</PropTitle>
            <SizeOptions/>
            <PropTitle>Design</PropTitle>
            <DesignOptions/>
            </Properties>
            <ButtonsWrapper>
              <Button primary={1} >Clear</Button>
              <Button primary={1} >Fliter</Button>
            </ButtonsWrapper>
           </FilterContainer>
    )
};

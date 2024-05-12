import styled from "styled-components";
import ProductBox from "./productBox";


const StyledGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    padding-top: 20px;
    @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr 1fr 1fr;
    
 }
`;

export default function ProductsGrid({products}) {
    return(
        <StyledGrid>
             {products.length>0 && products.map(product => (
                <ProductBox key={product._id} {...product}/>
            ))}
        </StyledGrid>
    )
};

import styled from "styled-components";
import Button from "./buttons";
import CartIcons from "./icons/cartIcons";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./cartContext";

const ProductWrapper= styled.div`
        background-color: #222; 
        border-radius: 15px;
        max-width: 180px;
        min-height: 250px;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`;

const WhiteBox = styled(Link)`
    background-color: #999; 
    padding: 20px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;
    img{
        max-width: 100%;
        max-height: 80px;
    }
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: .9rem;
    margin: 0;
    text-decoration: none;
    color: #b6ded9;

`;

const TitleWrapper = styled.div`
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis;
    color: #b6ded9;
`;

const ProductInfoBox = styled.div`
    
    margin: 15px 10px 15px 10px;

`;

const PriceRow = styled.div`
 display: block;
 @media screen and (min-width: 768px){
    display: flex;
 }
 align-items: center;
 justify-content: space-between;
 margin-top: 10px;
`;

const Price = styled.div`
 font-size: .8rem;
 font-weight: bold;
 color: #b6ded9;

`;
export default function ProductBox({_id,title,description,price,images}) {
    const {addProductToCart}= useContext(CartContext);

    const url='/product/'+_id;
    return(
        <ProductWrapper>
        <WhiteBox href={url}>
        <div>
         <img src={images[0]} alt=""/>
         </div>
        </WhiteBox>
        <ProductInfoBox>
        <TitleWrapper>
        <Title href={url}>{title}</Title>
        </TitleWrapper>
        <PriceRow>
            <Price>
            Tk.{price}
            </Price>
            
            <Button onClick={()=> addProductToCart(_id)} primary><CartIcons/></Button>
        
        </PriceRow>
        
        
        </ProductInfoBox>
        </ProductWrapper>
    )   
};

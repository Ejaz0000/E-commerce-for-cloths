"use client"

import ProductImages from "@/app/components/ProductImages";
import Button from "@/app/components/buttons";
import { CartContext } from "@/app/components/cartContext";
import Center from "@/app/components/center";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import RelatedProducts from "@/app/components/relatedProducts";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

const Title = styled.h2`
    color: #b6ded9;
    font-size: 2rem;
`;

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px){
      grid-template-columns: .8fr 1.2fr;

 }
    gap: 40px;
    margin: 40px 0;

    p{
      color: #b6ded9;

    }
    span{
      color: #b6ded9;
     
    }
`;

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
`;

const Property = styled.div`
    margin: 20px 0;
    display: flex;
    gap: 10px;
    align-items: center;
    div{
      display: flex;
      align-items: center;
      gap: 10px;
    }
    svg{
        height: 10px;
        color: #fff;
    }
`;

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const Price = styled.div`
  color: #b6ded9;
  font-size: 1.4rem;
`;

const Colorbtn = styled.button`
  background-color: ${props => props.color};
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

const Sizebtn = styled.button`
  background-color: #222;
  border: none;
  padding: 0px;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  color: #b6ded9;
`;

const Circle = styled.div`
  background-color: transparent;
  border: solid 2px #b6ded9;
  height: 24px;
  width: 24px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
`;

export default function ProductPage({params}) {
  const {addProductToCart}= useContext(CartContext);

    const [product,setProduct] = useState([]);
    const [selectedColor,setselectedColor] = useState("#22D3EF");
    const [selectedSize,setselectedSize] = useState("XS");

    console.log(params.id)
    
    const id = params.id

    const colors = ["#22D3EF", "#eee", "#222"];
    const sizes = ["XS", "S", "M", "L"];

    useEffect(()=>{
        
            async function fetchData() {
                const res = await fetch("/api/products/findOne/"+id, {
                  method: "GET",
                  cache: "no-store",
                });
              
                const data = await res.json();
                if (data && data.success) {
                  
                  setProduct(data.data)
                  console.log(data.data);
                 } else {
                   console.log(data.message)
                 }
                
              }
            
          
          fetchData();
    },[]);

    return(
        <>
        <Header/>
        <Center>
          <ColWrapper>
          <Box>
            <ProductImages images={product.images} />
          </Box>
          <div>
          <Title>{product.title}</Title>

          <Property><span>Color :</span>
          <div>
           {colors.map((color)=>
            (color === selectedColor ?
              (<Circle>
              <Colorbtn  color={color}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </Colorbtn>
              </Circle>
              ) :
              (<Colorbtn onClick={()=> setselectedColor(color)} color={color}></Colorbtn>))
           )}
           </div>
          </Property>

          <Property><span>Size :</span>
          <div>
           {sizes.map((size)=>
            (size === selectedSize ?
              (<Circle>
              <Sizebtn>
                {size}
              </Sizebtn>
              </Circle>
              ) :
              (<Sizebtn onClick={()=> setselectedSize(size)}>{size}</Sizebtn>))
           )}
           </div>
          </Property>

          <p>{product.description}</p>
          
          <PriceRow>
            <div>
             <Price>Tk. {product.price}</Price> 
            </div>
            <div>
            <Button onClick={()=> addProductToCart(product._id)} primary>Add to cart</Button>
            </div>
          </PriceRow>
          
          </div>
            
          </ColWrapper>
            
        </Center>
        <RelatedProducts/>
        <Footer/>
        </>
    )
};

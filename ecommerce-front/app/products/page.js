"use client"

import styled from "styled-components";
import Header from "../components/header";
import Center from "../components/center";
import { useEffect, useState } from "react";
import ProductsGrid from "../components/productsGrid";
import Footer from "../components/footer";
import Button from "../components/buttons";
import Checkbox from "../components/checkbox";
import ColorOptions from "../components/colorOptions";
import SizeOptions from "../components/sizeOption";
import DesignOptions from "../components/designOptions";
import FilterBox from "../components/filterBox";


const Title = styled.h2`
    color: #b6ded9;
    font-size: 2rem;
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: 0.4fr 1.6fr;
  gap: 30px;
  margin: 0 20px;
`;


export default function Productspage() {
    const [products,setProducts] = useState([]);


    useEffect(()=>{
        async function fetchData() {
            const res = await fetch("/api/products", {
              method: "GET",
              cache: "no-store",
            });
          
            const data = await res.json();
            if (data && data.success) {
            
              setProducts(data.data);
              
             } else {
               console.log(data.message)
             }
            
          }
          fetchData();
    },[]);

    return(
        <>
        <Header/>
        <Main>
           <FilterBox/>
          <div>
        <Title>All Products</Title>
         <ProductsGrid products={products} />
         </div>
         </Main>

        <Footer/>
        </>
    )
};

"use client"
import styled from "styled-components"
import Center from "./center";
import ProductsGrid from "./productsGrid";




const Title = styled.h2`
    color: #b6ded9;
    font-size: 2rem;
`;



export default function NewProducts({products}) {
    return(
        <Center>
            <Title>New Arrivals</Title>
            <ProductsGrid products={products} />
        </Center>
    )
};



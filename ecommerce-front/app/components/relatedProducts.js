import { useEffect, useState } from "react";
import ProductBox from "./productBox";
import styled from "styled-components";
import Center from "./center";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



const Title = styled.h2`
    color: #b6ded9;
    font-size: 2rem;
`;



export default function RelatedProducts() {
    const [products,setProducts] = useState([]);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 4
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 3
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 2
        }
      };


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
        <Center>
            <Title>Related Products</Title>
            <Carousel responsive={responsive}>
            
            {products.length>0 && products.map(product => (
                
                <ProductBox key={product._id} {...product}/>
                
            ))}
            
            </Carousel>
        </Center>
    )
};

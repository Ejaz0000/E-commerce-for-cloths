"use client"

import styled from "styled-components";
import Center from "./center";
import Button from "./buttons";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import ButtonLink from "./buttonLink";
import { useContext } from "react";
import { CartContext } from "./cartContext";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import { Autoplay, Pagination} from 'swiper/modules';


const Bg = styled.div`
    background-color: transparent;
    color: #b6ded9;
    padding: 30px 0;
    
`;

const Title = styled.h1`
    margin: 0;
    font-weight: normal;
    font-size: 2rem;
    @media screen and (min-width: 768px){
     font-size: 3rem;
    
 }
`;

const Des = styled.p`
    color: #b6ded9;
    font-size:.8rem;
`;

const ImageWrapper = styled.div`
    height: 16rem;
    display: flex;
    justify-content: center;
    align-items: center; 
    @media screen and (min-width: 768px){
        height: 22rem;
        width: 28rem;
    
 }
`;

const ColumnWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img{
        max-height: 100%;
        max-width: 100%;
    }
    div:nth-child(1){
        order: 2;
    } 
    @media screen and (min-width: 768px){
    grid-template-columns: 1fr 1fr;
    gap: 60px;

    div:nth-child(1){
        order: 0;
    } 
    
 }
`;

const Column = styled.div`
    display: flex;
    align-items: center;

`;

const InfoBox = styled.div`
    
        /* background-color: #222; */
        padding: 10px 15px 10px 15px;
        border: solid 3px #555;
        border-radius: 10px;
        background: rgba(34, 34, 34, 0.6);
    
`;

const ButtonsWrapper = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
`;

const SlideWrapper = styled.div`
    max-width: 900px;
    margin: 0 auto;
    padding: 50px 20px 40px 100px;
     background-color: #222; 
    background-image: ${props => `url(${props.bg})`};
    background-position-x: center;
    background-position-y: center;
    background-size: cover;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;



export default function Featured({product}) {
    const {addProductToCart}= useContext(CartContext);
    function addFeaturedToCart(productId){
        addProductToCart(productId);
    }

    console.log(product);
    
    return(
        <Bg>

    <Swiper
      modules={[Autoplay, Pagination]}
      speed={500}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{delay:3000}}

    >
      {product.length>0 && product.map(prod =>(
            <SwiperSlide>
                <SlideWrapper bg={prod.featimage}>
            
                  <ColumnWrapper>
                      <Column>
                      <InfoBox>
                      <Title>{prod.title}</Title>
                      <Des>{prod.description}</Des>
                      <ButtonsWrapper>
                      <ButtonLink href={'/product/'+prod._id} white={1} outline={1} >Read more</ButtonLink>
                      <Button primary={1} onClick={()=> addFeaturedToCart(prod._id)}>Add to cart</Button>
                      </ButtonsWrapper>
                      </InfoBox>
                      </Column>
                      <ImageWrapper>
                          <img src={prod.images} alt="" />
                      </ImageWrapper>
                  </ColumnWrapper>
                  
                  
                  </SlideWrapper>
            </SwiperSlide>
      ))}  
      
      
    </Swiper>
            
        </Bg>
    )
};

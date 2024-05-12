"use client"

import Link from "next/link";
import styled from "styled-components";
import Center from "./center";
import CartIcons from "./icons/cartIcons";
import { useContext, useState } from "react";
import { CartContext } from "./cartContext";
import BarIcons from "./icons/barIcons";
import SearchBar from "./searchBar";

const StyledHeader = styled.header`
    background-color: #10191c;
`;

const Logo = styled(Link)`
   color: #fff;
   font-weight: bold;
   font-size: 1.2rem;
   text-decoration:none;
   position: relative;
   z-index: 3;
`;
const NavLink = styled(Link)`
    display: block;
   color: #aaa;
   text-decoration:none;
   padding: 10px 0;
   @media screen and (min-width: 768px){
    
    padding: 0;
 }
`;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
`;

const StyledNav = styled.nav`
 ${props => props.mobileNavActive ? `
  display: block;
 `:`
  display: none;
 `}

 gap: 15px;
 position: fixed;
 top:0;
 bottom: 0;
 left: 0;
 right: 0;
 padding: 70px 20px 20px;
 background-color: #10191c; 
 @media screen and (min-width: 768px){
    display: flex;
    position: static;
    padding: 0;
 }
`;

const NavButton = styled.button`
    background-color: transparent;
    width : 30px;
    height: 30px;
    border: 0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px){
    display: none;
 }
`;

export default function Header() {
    const {cartProducts}= useContext(CartContext);
    const [mobileNavActive,setMobileNavActive] = useState(false);
    return(
        <StyledHeader>
            <Center>
            <Wrapper>
            <Logo href={'/'}>
                E-cloths
            </Logo>
            <SearchBar/>

            <StyledNav mobileNavActive ={mobileNavActive} >
                <NavLink href={'/'}>Home</NavLink>
                <NavLink href={'/products'}>All products</NavLink>
                <NavLink href={'../cart'}>Cart ({cartProducts.length})</NavLink>
            </StyledNav>
                <NavButton onClick={()=> setMobileNavActive(prev => !prev)}>
                    <BarIcons/>
                </NavButton>
            </Wrapper>
            </Center>
            
        </StyledHeader>
    )
};

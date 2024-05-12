"use client"
import styled from "styled-components";
import Link from "next/link";
import Center from "./center";


const Bg = styled.div`
    background-color: #222;
    color: #b6ded9;
    padding: 30px 0;
    margin-top: 100px;
    div{

    }
`;

const NavLink = styled(Link)`
    display: block;
   color: #aaa;
   text-decoration:none;
   padding: 5px 0;
   /* @media screen and (min-width: 768px){
    
    padding: 0;
 } */
`;

const Logo = styled(Link)`
   color: #fff;
   font-weight: bold;
   font-size: 1.4rem;
   text-decoration:none;
   /* position: relative;
   z-index: 3; */
`;

const LogoWrapper = styled.div`
    margin: 5px 0 10px 0;
`;


const FooterWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 20px;
`;

const SocialLinks = styled.div`
    display: flex;
    margin: 2px 0;
    svg{
        margin-right: 10px;
        width: 25px;
        height: 25px;
    }
`;

const Heading = styled.h3`
    color: #b6ded9;
    margin: 10px 0;
`;


export default function Footer() {
    return(
        <Bg>
            <Center>
            <FooterWrapper>
            <div>
            <LogoWrapper>
            <Logo href={'/'}>
                E-cloths
            </Logo>
            </LogoWrapper>
             <NavLink href={'/'}>About us</NavLink>
             <NavLink href={'/'}>Contact us</NavLink>
             <SocialLinks>
             <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                <path d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"></path>
            </svg>          
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
            </svg>
             </SocialLinks>
             
            </div>
            <div>
             <Heading>Help & Support</Heading>
             <NavLink href={'/'}>Size Guide</NavLink>
             <NavLink href={'/'}>Return Policy</NavLink>
             <NavLink href={'/'}>How to Order</NavLink>
            </div>
            <div>
            <Heading>Customer service</Heading>
             <NavLink href={'/'}>FAQS</NavLink>
             <NavLink href={'/'}>Terms & Condition</NavLink>
            </div>
            </FooterWrapper>
            </Center>
        </Bg>
    )
};

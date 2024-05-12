"use client"

import styled from "styled-components";
import Header from "../components/header";
import Center from "../components/center";
import Button from "../components/buttons";
import { CartContext } from "../components/cartContext";
import { useContext, useEffect, useState } from "react";
import Table from "../components/table";
import Input from "../components/input";
import Footer from "../components/footer";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media screen and (min-width: 768px){
    grid-template-columns: 1.3fr .7fr;

 }
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
    background-color: #222;
    border-radius: 10px;
    padding: 30px;
    color: #b6ded9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

`;

const Box2 = styled.div`
    background-color: #222;
    border-radius: 10px;
    padding: 30px;
    color: #b6ded9;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    max-height:300px;
`;

const ProductInfoCell = styled.td`
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
    width: 60px;
    height: 60px;
    padding: 2px;
    border: solid 2px #b6ded9;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:10px;
    margin-bottom  : 5px;
    img{
    max-width: 50px;
    max-height: 50px;
  }
  @media screen and (min-width: 768px){
    width: 100px;
    height: 100px;
    padding: 10px;
    img{
    max-width: 80px;
    max-height: 80px;
  }
 }
`;

const QuantityLabel = styled.span`
  padding: 0 15px;
  display: block;
  @media screen and (min-width: 768px){
    display: inline;
    padding: 0 10px;
 }
`;

const CityInfo = styled.div`
  display: flex;
  gap: 5px;
`;

const Properties =  styled.div`
  display: flex;
  gap: 5px;
  margin: 5px 0;
`;

const ColorProp = styled.div`
  /* background-color: ${props => props.color}; */
  background-color: #fff;
  border: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
`;

const SizeProp = styled.div`
  background-color: #222;
  border: solid 2px #b6ded9;
  display: flex;
  align-items: center;
  justify-content: center;
 
  height: 20px;
  width: 20px;
  border-radius: 50%;
  font-size: 12px;
  font-weight: bold;
  color: #b6ded9;
`;
export default function CartPage() {
  const {cartProducts,addProductToCart,removeProductToCart,clearCart}= useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [city,setCity] = useState('');
  const [postalCode,setPostalCode] = useState('');
  const [streetAddress,setStreetAddress] = useState('');
  const [country,setCountry] = useState('');
  const [isSuccess,setSuccess] = useState(false);
  useEffect(()=> {

    if(cartProducts.length > 0){
      async function fetchData() {
        const res = await fetch("/api/cart", {
          method: "POST",
          headers: {"Content-Type": "application/json",},  
          body: JSON.stringify({
            ids: cartProducts,
          }),
        });
      
        const data = await res.json();
        
        if (data && data.success) {
          setProducts(data.data);
         } else {
           console.log(data.message)
         }
        
      }
      fetchData();
    }else{
      setProducts([]);
    }

  },[cartProducts]);

  useEffect(()=>{
    if(typeof window == 'undefined'){
      return;
    }
    if(window.location.href.includes('success')){
      setSuccess(true);
      clearCart();
    }

  },[])

  function moreOfThisProduct(id){
    addProductToCart(id);
  }

  function lessOfThisProduct(id){
    removeProductToCart(id);
  }

  let total = 0;
  for(const productId of cartProducts){
    const price = products.find(product => product._id === productId)?.price || 0;
    total += price;
  }

  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },  
      body: JSON.stringify({
        name: name,
        email: email,
        city: city,
        postalCode: postalCode,
        streetAddress:streetAddress,
        country: country,
        products: cartProducts
      }),
    });

    const data = await res.json();
    
    if (data && data.success) {
            
      window.location = data.url;
     } else {
       console.log(data.message)
     }
    
  }

  if(isSuccess){
    
    return(
      <>
       <Header/>
       <Center>
         <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be ready.</p>
            </Box>
         </ColumnsWrapper>
       </Center>
       <Footer/>
      </>
    )
  }

    return(
        <>
         <Header/>
         <Center>
         <ColumnsWrapper>
          <Box>
          <h2>Cart</h2>
            {!cartProducts?.length && (
              <div>Your cart is empty</div>
            )}
            {products?.length > 0 && (
            <Table>
              <thead>
                <tr>
                  <th>
                    Product
                  </th>
                  <th>
                    Quantity
                  </th>
                  <th>
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>

              {products.map(product =>(

                <tr>
                <ProductInfoCell>
                  <ProductImageBox>
                  <img src={product.images[0]} alt=""/>
                  </ProductImageBox>
                  {product.title}
                  <Properties>
                    <ColorProp/>
                    <SizeProp>M</SizeProp>
                  </Properties>
                  </ProductInfoCell>
                <td>
                  <Button onClick={()=>lessOfThisProduct(product._id)}>-</Button>
                  <QuantityLabel>
                  {cartProducts.filter(id=> id === product._id).length}
                  </QuantityLabel>
                  <Button onClick={()=>moreOfThisProduct(product._id)}>+</Button>
                  </td>
                <td>Tk. {cartProducts.filter(id=> id === product._id).length * product.price}</td>
                </tr>
              ))}
                <tr>
                  <td></td>
                  <td>Total:</td>
                  <td>Tk. {total}</td>
                </tr>
              </tbody>
            </Table>
            )}
              
              
              
              
            
          </Box>
          {!!cartProducts?.length && (
              <Box2>
              <h2>Order information</h2>
              <form onSubmit={handleSubmit}>
              <Input type="text" placeholder="Name" value={name} name="name" onChange={ev => setName(ev.target.value)} />
              <Input type="text" placeholder="Email" value={email} name="email" onChange={ev => setEmail(ev.target.value)} />
              <CityInfo>
              <Input type="text" placeholder="City" value={city} name="city" onChange={ev => setCity(ev.target.value)}/>
              <Input type="text" placeholder="Postal Code" value={postalCode} name="postalCode" onChange={ev => setPostalCode(ev.target.value)}/>
              </CityInfo>
              <Input type="text" placeholder="Street Address" value={streetAddress} name="streetAddress" onChange={ev => setStreetAddress(ev.target.value)}/>
              <Input type="text" placeholder="Country" value={country} name="country" onChange={ev => setCountry(ev.target.value)}/>
              {/* <input type="hidden" name="products" value={cartProducts.join(',')}/> */}
              <Button primary block type="submit">Continue to payment</Button>
              </form>
            </Box2>
            )}
          
         </ColumnsWrapper>
         </Center>
         <Footer/>

        </>
    )
};

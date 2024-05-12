"use client"

const { createContext, useState, useEffect } = require("react");


export const CartContext = createContext({});
export function CartContextProvider({children}){
    const [cartProducts,setCartProducts] = useState([]);
    useEffect(()=>{
        if(cartProducts?.length>0){
            
            localStorage.setItem('cart',JSON.stringify(cartProducts));
            
        }
    },[cartProducts])

    useEffect(()=>{
        if(localStorage && localStorage.getItem('cart')){
        setCartProducts(JSON.parse(localStorage.getItem('cart')))    
        }
    },[]);
    function addProductToCart(productId){
        setCartProducts(prev => [...prev,productId]);
    }

    function clearCart(){
        setCartProducts([]);
        localStorage.setItem('cart',[]);

    }

    function removeProductToCart(productId){
        setCartProducts(prev => {
            const pos =prev.indexOf(productId);
            if(pos !== -1){
               return prev.filter((value,index)=> index !==pos);
            }
            return prev;
        });
    }

    

    return(
        <CartContext.Provider value={{cartProducts,setCartProducts,addProductToCart,removeProductToCart,clearCart}}>{children}</CartContext.Provider>
    )
}
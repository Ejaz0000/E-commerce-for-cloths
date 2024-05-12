"use client"
import { useEffect, useState } from "react";
import HomeLayout from "../components/layout";

export default function OrdersPage() {
    const [orders,setOrders] = useState([]);

    useEffect(()=>{

        async function fetchData() {
            const res = await fetch("/api/orders", {
              method: "GET",
              cache: "no-store",
            });
          
            const data = await res.json();
            if (data && data.success) {
            
              setOrders(data.data);
             } else {
               console.log(data.message)
             }
            
          }
        
        fetchData();
  },[]);
    return(
        <HomeLayout>
            <h1>Orders</h1>
            <table className='basic mt-2'>
          <thead>
            <tr>
              <td>Date</td>
              <td>Paid</td>
              <td>Recipient</td>
              <td>Products</td>
            </tr>
          </thead>
          <tbody>
            
             {orders.length>0 && orders.map(order =>(
              <tr>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>{order.paid ? "Yes" : "No"}</td>
                <td>
                  {order.name} {order.email} <br/>
                  {order.city} {order.postalCode} {order.country}<br/>
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map(l =>(
                    <>
                     {l.price_data?.product_data.name} x {l.quantity}
                     <br/>
                    </>
                  ))}
                </td>
              </tr>
            ))}  
          </tbody>
        </table>
        </HomeLayout>
    )
};

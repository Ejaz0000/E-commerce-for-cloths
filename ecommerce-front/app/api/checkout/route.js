
import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
const stripe = require('stripe')(process.env.STRIPE_SK);

export async function POST(req){
    try{
      await mongooseConnect();
      const {name,email,city,postalCode,streetAddress,country,products} = await req.json();
      const uniqueIds = [...new Set(products)];
      const productInfo = await Product.find({_id:uniqueIds});

      let line_items = [];

      for(const productId of uniqueIds){
        const info = productInfo.find(p => p._id.toString() === productId);
        const quantity = products.filter(id=> id===productId)?.length || 0;
        if(quantity>0){
            line_items.push({
                quantity:quantity,
                price_data:{
                    currency:'USD',
                    product_data:{name:info.title},
                    unit_amount: (info.price),
                }
            });
        }
      }

      const newlyCreatedOrder = await Order.create({line_items,name,email,city,postalCode,streetAddress,country,paid:false});
      
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url: process.env.PUBLIC_URL + '/cart?success=1',
        cancel_url: process.env.PUBLIC_URL + '/cart?canceled=1',
        metadata: {orderId:newlyCreatedOrder._id.toString()},
      })
      
     
      if(newlyCreatedOrder){
        return NextResponse.json({
          success: true,
          message: "Order placed successfully",
          url:session.url,
        });
      }else{
        return NextResponse.json({
          success: false,
          message:
            "failed to fetch the products ! Please try again after some time",
        });
      }
  
    }catch(e){
        console.log(e);
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
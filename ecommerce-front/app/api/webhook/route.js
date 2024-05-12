import { mongooseConnect } from '@/lib/mongoose';
import { buffer } from 'micro';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { Order } from '@/models/Order';


const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret = "whsec_6b6e0a831bdd4ccdb8d3322eb4dbb310feb828871404512e6610714871494e6f";

export async function POST(req){
    
    await mongooseConnect();
    

    const body = await req.text();
     const sig = headers().get('Stripe-Signature');

     let event;



    try {
        console.log("constructing event...")
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret)
    } catch (error) {
        
        return new NextResponse(`Webhook error: ${error}`, {
            status: 400,
        })
    }
    
    switch (event.type) {
        case 'checkout.session.completed':
          const data = event.data.object;
          
          const orderId = data.metadata.orderId;
          const paid = data.payment_status === 'paid';

          if(orderId && paid){
            
            await Order.updateOne({_id:orderId},{$set:{
                paid:true,
            }})
          }
          break;
        // ... handle other event types
        default:
          console.log(`Unhandled event type ${event.type}`);
      }

      return new NextResponse({
        status: 200,
    })
}

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   };

//beckon-useful-neatly-zeal
//acct_1P2TcEP3ALohIH8G
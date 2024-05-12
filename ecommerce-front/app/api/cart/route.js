
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
      await mongooseConnect();
      const Ids = await req.json();
      const getproducts = await Product.find({_id:Ids.ids});
  
      if(getproducts){
        return NextResponse.json({
          success: true,
          data: getproducts,
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
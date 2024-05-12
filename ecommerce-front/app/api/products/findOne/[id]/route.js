
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";


export async function GET(req, { params }){
    try{
      await mongooseConnect();
      
      const id = params.id;
      const getproduct = await Product.findOne({_id:id});
  
      if(getproduct){
        return NextResponse.json({
          success: true,
          data: getproduct,
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
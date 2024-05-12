
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";
import { isAdminReq } from "../auth/[...nextauth]/route";

export  async function POST(req) {
     
    try {
      await mongooseConnect();
      await isAdminReq();
      const extractData = await req.json();
      const newlyCreatedProduct = await Product.create(extractData);
  
      if (newlyCreatedProduct) {
        return NextResponse.json({
          success: true,
          message: "Product added successfully",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed to add a product ! Please try after some time.",
        });
      }
    } catch (e) {
      console.log(e);
  
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
     } 


export async function GET(){
  try{
    await mongooseConnect();
    await isAdminReq();
    const getAllproducts = await Product.find({});

    if(getAllproducts){
      return NextResponse.json({
        success: true,
        data: getAllproducts,
      });
    }else{
      return NextResponse.json({
        success: false,
        message:
          "failed to fetch the products ! Please try again after some time",
      });
    }

  }catch(e){
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
}
  
  
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(){
    try{
      await mongooseConnect();
      const getAllproducts = await Product.find({}, null, {sort:{'_id':-1}});
  
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
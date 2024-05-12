import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { isAdminReq } from "../auth/[...nextauth]/route";
import { Order } from "@/models/Order";

export async function GET(){
    try{
      await mongooseConnect();
      await isAdminReq();
      const getAllorder = await Order.find({}).sort({createdAt:-1});
  
      if(getAllorder){
        return NextResponse.json({
          success: true,
          data: getAllorder,
        });
      }else{
        return NextResponse.json({
          success: false,
          message:
            "failed to fetch the orders ! Please try again after some time",
        });
      }
  
    }catch(e){
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
  }
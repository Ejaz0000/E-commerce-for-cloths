import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

import { isAdminReq } from "@/app/api/auth/[...nextauth]/route";
import { FeatProduct } from "@/models/FeatProduct";
export  async function DELETE(req,{ params }) {
     
    try {
      await mongooseConnect();
      await isAdminReq();
      
      const prod = params.id;
      const deletedProduct = await FeatProduct.deleteOne({feat_id: prod});
  
      if (deletedProduct) {
        return NextResponse.json({
          success: true,
          message: "Deleted successfully!",
        });
      } else {
        return NextResponse.json({
          success: false,
          message: "failed ! Please try after some time.",
        });
      }
    } catch (e) {
    
  
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
     }
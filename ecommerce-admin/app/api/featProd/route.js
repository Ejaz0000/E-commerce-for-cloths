
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";
import { isAdminReq } from "../auth/[...nextauth]/route";
import { FeatProduct } from "@/models/FeatProduct";

export  async function POST(req) {
     
    try {
      await mongooseConnect();
      await isAdminReq();
      const extractData = await req.json();
      const newProduct = await FeatProduct.create(extractData);
  
      if (newProduct) {
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
          const getAllproducts = await FeatProduct.find({});
      
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
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions, isAdminReq } from "../auth/[...nextauth]/route";



export  async function POST(req) {
     
    try {
      await mongooseConnect();
      await isAdminReq();
      const extractData = await req.json();
      const newlyCreatedCategory = await Category.create(extractData);
  
      if (newlyCreatedCategory) {
        return NextResponse.json({
          success: true,
          message: "Category added successfully",
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
          const getAllcategory = await Category.find({}).populate('parent');
      
          if(getAllcategory){
            return NextResponse.json({
              success: true,
              data: getAllcategory,
            });
          }else{
            return NextResponse.json({
              success: false,
              message:
                "failed to fetch the category ! Please try again after some time",
            });
          }
      
        }catch(e){
          return NextResponse.json({
            success: false,
            message: "Something went wrong",
          });
        }
      }
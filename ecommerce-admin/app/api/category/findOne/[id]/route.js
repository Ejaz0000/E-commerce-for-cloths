import { isAdminReq } from "@/app/api/auth/[...nextauth]/route";
import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

export  async function DELETE(req, { params }) {
     
    try {
      await mongooseConnect();
      await isAdminReq();
      const id = params.id;
      const deletedCategory = await Category.deleteOne({_id: id});
  
      if (deletedCategory) {
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
      console.log(e);
  
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
     }

     export  async function PUT(req, { params }) {
     
      try {
        await mongooseConnect();
        await isAdminReq();
        const id = params.id;
        const {name,parent,properties} = await req.json();
        const eiditedCate = await Category.updateOne({_id: id}, {$set:{name:name,parent:parent,properties:properties}});
    
        if (eiditedCate) {
          return NextResponse.json({
            success: true,
            message: "Updated successfully!",
          });
        } else {
          return NextResponse.json({
            success: false,
            message: "failed ! Please try after some time.",
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
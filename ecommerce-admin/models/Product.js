import mongoose, {model, Schema, models} from "mongoose";

const ProductSchema = new Schema({

     title: {type:String, required: true},
     category: {type:mongoose.Schema.Types.ObjectId, ref: 'Category'},
     description: { type: String },
     price: {type:Number, required: true},
     images: [{type: String}],
     featimage: {type: String},
     properties: {type:Object}
},{
     timestamps:true,
});

export const Product = models.Product || model('Product', ProductSchema);
import mongoose, {model, Schema, models} from "mongoose";

const FeatProdSchema = new Schema({

     feat_id: {type:String, required: true},
     feat_title: {type:String, required: true},
});

export const FeatProduct = models.FeatProduct || model('FeatProduct', FeatProdSchema);
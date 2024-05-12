import { mongooseConnect } from "@/lib/mongoose";
import Featured from "./components/featured";
import Header from "./components/header";
import { Product } from "@/models/Product";
import NewProducts from "./components/newProducts";
import { FeatProduct } from "@/models/FeatProduct";
import Footer from "./components/footer";

async function fetchFeaturedProduct() {
  //const featuredProductID= '660931b1cb71069fd6ee3ecc';
  await mongooseConnect();
  let ids = [];
  const featuredProductIDs= await FeatProduct.find({});
  for(const fp_id of featuredProductIDs){
      ids.push(fp_id.feat_id);
  }
  const featuredProduct = await Product.find({_id:ids});
  return JSON.parse(JSON.stringify(featuredProduct));
};

async function fetchnewProduct() {
  await mongooseConnect();
  const newProduct = await Product.find({}, null, {sort:{'_id':-1}, limit:10});
  return JSON.parse(JSON.stringify(newProduct));
};

export default async function HomePage() {
  const featuredProduct = await fetchFeaturedProduct();
  const newProduct = await fetchnewProduct();
  
  return(
    <div>
      <Header />
      <Featured product={featuredProduct}/>
      <NewProducts products={newProduct}/>
      <Footer/>
    </div>
  )
};







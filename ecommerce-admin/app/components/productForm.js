"use client"
import HomeLayout from '@/app/components/layout'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { analytics } from '@/app/firebase/firebase-config';
import { ref,uploadBytes,getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'
import Spineer from '@/app/components/spineer';
import { ReactSortable } from 'react-sortablejs';




export default function ProductForm({_id, title:existTitle,category:existingCategory, description:exitDescription, price:existPrice, images:existImages, properties:existProperties}) {
    const [title,setTitle] = useState(existTitle || '');
    const [images,setImages] = useState(existImages || []);
    const [featimages,setfeatImages] = useState(existImages || '');
    const [description,setdescription] = useState(exitDescription || '');
    const [productProperties,setProductProperties] = useState(existProperties||{});
    const [price,setPrice] = useState(existPrice || '');
    const [goToProduct,setGoToProduct] = useState(false);
    const [isLoading,setIsloading] = useState(false);
    const [categories,setCategory] = useState([]);
    const [category,setaCategory] = useState(existingCategory || '');
    const route = useRouter();
    const links = [];
    let featlink;
    useEffect(()=>{
      async function fetchData() {
        const res = await fetch("/api/category", {
          method: "GET",
          cache: "no-store",
        });
      
        const data = await res.json();
        if (data && data.success) {
        
          setCategory(data.data);
         } else {
           console.log(data.message)
         }
        
      }
      fetchData();
    },[]);

    async function saveProduct(e){
        e.preventDefault();
        if(_id){
            
            const res =await fetch("/api/product/findOne/"+_id, {
                method: "put",
                headers: {
                  "Content-Type": "application/json",
                },  
                body: JSON.stringify({
                  title: title,
                  category: category,
                  description: description,
                  price: price,
                  id: _id,
                  images:images,
                  featimage:featimages,
                  properties: productProperties
                }),
              });

              const data = await res.json();
    
              if (data && data.success) {
            
               console.log(data.message)
               setGoToProduct(true)
              } else {
                console.log(data.message)
              }

        }
        else{
            const res = await fetch("/api/product", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },  
                body: JSON.stringify({
                  title: title,
                  category: category,
                  description: description,
                  price: price,
                  images:images,
                  featimage:featimages,
                  properties: productProperties
                }),
              });
    
              const data = await res.json();
    
              if (data && data.success) {
               console.log(data.message)
               setGoToProduct(true)
              } else {
                console.log(data.message)
              }
        }
        
    }
    if(goToProduct){
      route.push('/products')
    }


    function uploadImage(e){
      const files = e.target?.files
      
      
      if(files?.length > 0){
        setIsloading(true)
    
        for(const file of files ){
          
        let split = file.name.split('.');
        split.pop();
        let fileName = split.join(".");
        const fileRef = ref(analytics,`clothimg/${fileName + v4()}`)
      
        uploadBytes(fileRef,file).then((data)=>{
          
          getDownloadURL(data.ref).then((url)=>{
            links.push(url)
            setImages(oldimages =>{
              return [...oldimages, ...links]
            })
            setIsloading(false)
          })
        })
        }
        
      }
      
    }

    function uploadFeatImage(e){
      const files = e.target?.files
      
      
      if(files?.length > 0){
        //setIsloading(true)
    
        for(const file of files ){
          
        let split = file.name.split('.');
        split.pop();
        let fileName = split.join(".");
        const fileRef = ref(analytics,`clothimg/${fileName + v4()}`)
      
        uploadBytes(fileRef,file).then((data)=>{
          
          getDownloadURL(data.ref).then((url)=>{
            featlink = url
            setfeatImages(featlink)
            console.log(url)
            //setIsloading(false)
          })
        })
      }
        
      }
      
    }

    const propertiesOfCategory = [];
    if(categories.length >0 && category){
      let catInfo = categories.find(({_id}) => _id === category);
      propertiesOfCategory.push(...catInfo.properties);
      while(catInfo?.parent?._id){
        const parentCatInfo = categories.find(({_id}) => _id === catInfo?.parent?._id);
        propertiesOfCategory.push(...parentCatInfo.properties);
        catInfo = parentCatInfo;
      }
      
    }

    function setProductProp(propName, value){
      setProductProperties(prev =>{
          const newProductProp = {...prev};
          newProductProp[propName] = value;
          return newProductProp;
        })
    }

    function updateImagesOrder(images){
      setImages(images)
    }


  return (
    
        <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input 
         type='text'
         placeholder='product name'
         value={title}
         onChange={e => setTitle(e.target.value)}
         />
         <label>
          Category
         </label>
         <select 
          onChange={ev => setaCategory(ev.target.value)}
         value={category}
         >
          <option value=''>Uncategorized</option>
          {categories.length > 0 && categories.map(category =>(
                    <option value={category._id}>{category.name}</option>
            ))}  
         </select>
         {propertiesOfCategory.length > 0 && propertiesOfCategory.map(p =>(
           <div className='m-1 flex gap-1'>
              <label>{p.name[0].toUpperCase()+p.name.substring(1)}</label>
              <div>
              <select value={productProperties[p.name]} onChange={ev=> setProductProp(p.name, ev.target.value)}>
                {p.value?.map(v => (
                  <option value={v}>{v}</option>
                ))}
              </select>
              </div>
              
           </div>
         )
         )}
         <label>
          Photos
         </label>
         <div className='mb-2 flex flex-wrap gap-1'>
          <ReactSortable className='flex flex-wrap gap-1' list={images} setList={updateImagesOrder}>
          {images && images?.map(link =>(
            
            <div key={link} className='h-24 bg-white p-4 rounded-md border-2 border-green-300'>
              
              <img className='max-h-full rounded-lg' src={link} alt=''/>
              </div>
          ))}
          </ReactSortable>
           {isLoading && (
             <div className='h-4 pt-8'>
             <Spineer/>
             </div>
           )}
            
          

         <label className="w-24 h-24 flex flex-col justify-center items-center rounded-lg bg-green-300 text-gray-600 cursor-pointer">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
         </svg>
         Upload
         <input type="file" multiple onChange={uploadImage} className="hidden" />
        </label>


          
          

         </div>
        <label>Description</label>
        <textarea 
        placeholder='description'
        value={description}
        onChange={e => setdescription(e.target.value)}
        ></textarea>
        <label>Price (in Taka)</label>
        <input type='number' placeholder='price'
        value={price}
        onChange={e => setPrice(e.target.value)}
        />
        <label>
          Theme(For Featuring)
         </label>
         <label className="w-24 h-14 mb-4 flex flex-col justify-center items-center rounded-lg bg-green-300 text-gray-600 cursor-pointer">
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
         </svg>
         Upload
         <input type="file" onChange={uploadFeatImage} className="hidden" />
        </label>

        <button type='submit' className='btn-primary'>{_id==null? (<>Add</>):(<>Edit</>)}</button>
        </form>

  )
}

 
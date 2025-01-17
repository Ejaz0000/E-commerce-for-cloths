'use client'
import { useEffect, useState, Fragment } from "react";
import HomeLayout from "../components/layout";
import Link from "next/link";
import Modal from '../components/modal';
import { set } from "mongoose";
import Editcate from "../components/editcate";



export default function Categories() {
    const[showModal,setShowModal] = useState(false);
    const[showEditModal,setShowEditModal] = useState(false);
    const [name,setName]= useState('');
    const [categories,setCategory] = useState([]);
    const [parentCategory,setparentCategory]= useState('');
    const [deleteCate,setDeleteCate] = useState({title: null, id: null});
    const [editCate,setEditCate] = useState(null);
    const [properties,setproperties] = useState([]);
    
    useEffect(()=>{
        
          fetchData();
    },[]);

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
    async function saveCategory(ev){
        ev.preventDefault();
        const res = await fetch("/api/category", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },  
            body: JSON.stringify({
              name: name,
              parent: parentCategory || undefined,
              properties: properties.map(p=>({
                name:p.name,
                value:p.value.split(','),
              }))
            }),
          });

          const data = await res.json();

          if (data && data.success) { 
            setName('');
            setparentCategory('');
            setproperties([]);
           console.log(data.message)
           fetchData();
          } else {
            console.log(data.message)
          }
    }
    const  handleDelete = async (e) =>{
      const delete_id = deleteCate.id;
      e.preventDefault();
      const res =await fetch("/api/category/findOne/"+delete_id, {
        method: "delete",
        
      });
  
      const data = await res.json();
      
      if (data && data.success) {
    
       console.log(data.message)
       setShowModal(false)
       fetchData();
      } else {
        console.log(data.message)
      }
  
      
    }

    function addProperty(){
      setproperties(prev =>{
        return [...prev, {name:'',value:''}]
      })
    }

    function handlePropertyNamedChange(index, property, newName){
        setproperties(prev => {
          const properties = [...prev];
          properties[index].name = newName;
          return properties;
            })
    }

    function handlePropertyValuesChange(index, property, newValues){
      setproperties(prev => {
        const properties = [...prev];
        properties[index].value = newValues;
        return properties;
          })
  }

  function removePoperty(index){
    setproperties(prev => {
      const properties = [...prev].filter((p,pindex)=>{
        return pindex !== index;
      });
      
      return properties;
        })
}
const updateCate = () => {
  setShowEditModal(false);
  fetchData();
}
    return(
        <HomeLayout>
          <Fragment>
            <h1>Categories</h1>
            <label>Add New Category</label>
            <form onSubmit={saveCategory}>
              <div className="flex gap-1">
                <input className="" type="text" placeholder="Category Name" value={name} onChange={ev => setName(ev.target.value)}/>
                <select className=""
                 onChange={ev => setparentCategory(ev.target.value)}
                 value={parentCategory}
                 >
                  <option value=''>No parent category</option>
                  {categories.length > 0 && categories.map(category =>(
                    <option value={category._id}>{category.name}</option>
            ))}  
                </select>
                </div>
                <div className="mb-5">
                <label className="block">Properties</label>
                <button type='button' 
                className='btn-secondary mb-2'
                onClick={addProperty}
                >Add new property</button>
                {properties.length > 0 && properties.map((property,index) =>(
                    <div className='flex gap-1 mb-2'>
                      <input className="mb-0" type="text" placeholder="Property Name(example: color, size...)" value={property.name} onChange={ev => handlePropertyNamedChange(index ,property, ev.target.value)}/>
                      <input className="mb-0" type="text" placeholder="Value" value={property.value} onChange={ev => handlePropertyValuesChange(index ,property, ev.target.value)}/>
                      <button type="button" className="btn-secondary" onClick={()=>removePoperty(index)}>Remove</button>
                    </div>
            ))}  
                </div>
                <button type='submit' className='btn-primary'>Save</button>
            </form>
            <table className='basic mt-2'>
          <thead>
            <tr>
              <td>Category name</td>
              <td>Parent category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            
             {categories.length > 0 && categories.map(category =>(
              <tr>
                <td>{category.name}</td>
                <td>{category?.parent?.name}</td>
                <td>
                  <Link href={""} onClick={()=>{setShowEditModal(true); setEditCate(category)}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                   Edit
                  </Link>

                  <Link href={""} onClick={()=>{setShowModal(true); setDeleteCate({title: category.name, id:category._id})}}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                   Delete
                  </Link>
                </td>
              </tr>
            ))}  
          </tbody>
        </table>
        <Modal isVisible={showModal} onClose={()=>{setShowModal(false)}}>
          <div className='flex flex-col'>
          <div className='p-1 mb-3'>
          Do you want to delete {deleteCate.title}?
          </div>
          <div className='flex fl justify-end'>
          <button className='bg-green-500 text-white py-1 px-2 rounded-md mr-2' onClick={handleDelete}>
             Yes
          </button>
          <button className='bg-red-500 text-white py-1 px-2 rounded-md mr-2' onClick={()=>{setShowModal(false)}}>
             No
          </button>
          </div>
          </div>
        </Modal>

        <Modal isVisible={showEditModal} 
        onClose={()=>{
          setShowEditModal(false);
          }}>
          <Editcate editId={editCate} updateCate={updateCate}/>
        </Modal>
        </Fragment>
        </HomeLayout>
    )
};

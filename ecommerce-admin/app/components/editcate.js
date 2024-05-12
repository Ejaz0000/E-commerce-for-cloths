import { useEffect, useState } from "react";

export default function Editcate({editId, updateCate}) {
    const [name,setName]= useState('');
    const [parentCategory,setparentCategory]= useState('');
    const [properties,setproperties] = useState([]);
    const [categories,setCategory] = useState([]);

    useEffect(()=>{
        
        fetchData();
        loadCategory(editId);
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
        function loadCategory(category){
            
            setName(category.name);
            setparentCategory(category.parent?._id);
            setproperties(
              category.properties.map(({name,value}) => ({
              name,
              value:value.join(',')
            }))
            );
          }

    async function editCategory(ev){
      const edit_id = editId._id;
        ev.preventDefault();
        const res = await fetch("/api/category/findOne/"+edit_id, {
            method: "put",
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
           
            console.log(data.message);
            updateCate();
          
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
    return(
        <>
          <label>Edit Category</label>
            <form onSubmit={editCategory}>
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
        </>
    ) 
};

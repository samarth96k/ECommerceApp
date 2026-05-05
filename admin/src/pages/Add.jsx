import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
const Add = ({token}) => {

  const [image1,setimage1] = useState(false);
  const [image2,setimage2] = useState(false);
  const [image3,setimage3] = useState(false);
  const [image4,setimage4] = useState(false);

  const [name,setname] = useState("");
  const [description,setDescription] = useState("");
  const [price,setprice] = useState("");
  const [category,setCategory] = useState("Men");
  const [subCategory,setSubCategory] = useState("Casual");
  const [bestSeller,setBestSeller] = useState(false);
  const [sizes,setSizes] = useState([]);

  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name",name);
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subcategory",subCategory);
      formData.append("bestSeller",bestSeller);
      formData.append("sizes",JSON.stringify(sizes));
      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 &&formData.append("image3",image3);
      image4 && formData.append("image4",image4);
      const response = await axios.post(backendUrl+"/api/product/add",formData,{headers:{token:token}});
      if(response.data.success){
        toast.success(response.data.message);
        setname("");
        setDescription('');
        setprice('');
        setBestSeller(false);
        setSizes([]);
        setimage1(false);
        setimage2(false);
        setimage3(false);
        setimage4(false);
      }else{
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }
  return (
    <div>
      <form onSubmit={onSubmitHandler} action="" className='flex flex-col w-full items-start gap-3'>
        <div>
          <p className='mb-2'>Upload Image</p>
          <div className='flex gap-2'>
            <label htmlFor="image1">
              <img className='w-20' src={!image1?assets.upload_area: URL.createObjectURL(image1)} alt="" />
              <input onChange={(e)=>setimage1(e.target.files[0])} type="file" name="image1" id="image1" hidden />
            </label>
            <label htmlFor="image2">
              <img className='w-20' src={!image2?assets.upload_area: URL.createObjectURL(image2)} alt="" />
              <input onChange={(e)=>setimage2(e.target.files[0])} type="file" name="image2" id="image2" hidden />
            </label>
            <label htmlFor="image3">
              <img className='w-20' src={!image3?assets.upload_area: URL.createObjectURL(image3)} alt="" />
              <input onChange={(e)=>setimage3(e.target.files[0])} type="file" name="image3" id="image3" hidden />
            </label>
            <label htmlFor="image4">
              <img className='w-20' src={!image4?assets.upload_area: URL.createObjectURL(image4)} alt="" />
              <input onChange={(e)=>setimage4(e.target.files[0])} type="file" name="image4" id="image4" hidden />
            </label>
          </div>
        </div>
        <div className='w-full'>
          <p  className='mb-2'>Product Name </p>
          <input onChange={(e)=>setname(e.target.value)} value = {name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
        </div>
        <div className='w-full'>
          <p  className='mb-2'>Product Descripton </p>
          <textarea  onChange={(e)=>setDescription(e.target.value)} value = {description} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Write content here' required />
        </div>
        <div className='flex flex-col sm:flex-row gap-2w-full sm:gap-8'>

          <div>
            <p className='mb-2'>
              Product Category
            </p>
            <select onChange={(e)=>setCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className='mb-2'>
              Sub Category
            </p>
            <select onChange={(e)=>setSubCategory(e.target.value)} className='w-full px-3 py-2'>
              <option value="Sports">Sports</option>
              <option value="Casual">Casual</option>
              <option value="Slippers">Slippers</option>
              <option value="Formal">Formal</option>
              <option value="Sandals">Sandals</option>

            </select>
          </div>

          <div>
            <p className='mb-2'>Product Price</p>
            <input onChange={(e)=>{setprice(e.target.value)}} value = {price} className='w-full px-3 py-2 sm:w-[120px]' type="Number" required placeholder='' />
          </div>
        </div>
        <div>
          <p className='mb-2'>Product Sizes</p>
          <div className='flex gap-2'>
            <div onClick={()=>{setSizes(prev=>prev.includes("6")?prev.filter(item=>item!=="6"):[...prev,"6"])}}>
              <p className={`${sizes.includes("6")? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>6
              </p>
            </div>
            <div onClick={()=>{setSizes(prev=>prev.includes("7")?prev.filter(item=>item!=="7"):[...prev,"7"])}}>
              <p className={`${sizes.includes("7")? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>7</p>
            </div>
            <div onClick={()=>{setSizes(prev=>prev.includes("8")?prev.filter(item=>item!=="8"):[...prev,"8"])}}>
              <p className={`${sizes.includes("8")? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>8</p>
            </div>
            <div onClick={()=>{setSizes(prev=>prev.includes("9")?prev.filter(item=>item!=="9"):[...prev,"9"])}}>
              <p className={`${sizes.includes("9")? "bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>9</p>
            </div>
          </div>
        </div>
              <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestSeller(prev=>!prev)} checked={bestSeller} type="checkbox"  id="bestseller"/>
        <label className='cursor-pointer' htmlFor="bestseller">Add to  Best Seller</label>
      </div>
      <button type='submit' className='w-28 px-3 py-2 bg-black text-white'>ADD</button>
      </form>
    </div>
  )
}

export default Add
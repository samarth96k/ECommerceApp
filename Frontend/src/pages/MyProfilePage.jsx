import React,{useContext,useState,useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {ShopContext} from "../context/ShopContext";

function MyProfilePage(){

    const {user,setUser,backendURL,token}=useContext(ShopContext);

    const [editMode,setEditMode]=useState(false);

    const [formData,setFormData]=useState({
        name:"",
        phone:"",
        age:"",
        gender:""
    });
    const emptyAddress={
    fullName:"",
    phone:"",
    houseNo:"",
    street:"",
    landmark:"",
    city:"",
    state:"",
    country:"",
    pincode:"",
    addressType:"Home"
};

const [showAddressModal,setShowAddressModal]=useState(false);
const [editingAddress,setEditingAddress]=useState(null);
const [addressData,setAddressData]=useState(emptyAddress);
const addressChangeHandler=(e)=>{
    setAddressData(prev=>({
        ...prev,
        [e.target.name]:e.target.value
    }));
}
const openAddAddress=()=>{

    setEditingAddress(null);

    setAddressData(emptyAddress);

    setShowAddressModal(true);

}
const openEditAddress=(address)=>{

    setEditingAddress(address);

    setAddressData({

        fullName:address.fullName,
        phone:address.phone,
        houseNo:address.houseNo,
        street:address.street,
        landmark:address.landmark,
        city:address.city,
        state:address.state,
        country:address.country,
        pincode:address.pincode,
        addressType:address.addressType

    });

    setShowAddressModal(true);

}

const saveAddress=async()=>{

    try{

        const url=editingAddress
        ?backendURL+"/api/user/update-address"
        :backendURL+"/api/user/add-address";

        const body=editingAddress
        ?{
            ...addressData,
            addressId:editingAddress._id
        }
        :addressData;

        const response=await axios.post(

            url,

            body,

            {

                headers:{token}

            }

        );

        if(response.data.success){

            setUser(response.data.user);

            toast.success(response.data.message);

            setShowAddressModal(false);

            setEditingAddress(null);

            setAddressData(emptyAddress);

        }
        else{

            toast.error(response.data.message);

        }

    }
    catch(error){

        console.log(error);

        toast.error(error.message);

    }

}
const deleteAddress=async(addressId)=>{

    if(!window.confirm("Delete this address?"))
        return;

    try{

        const response=await axios.post(

            backendURL+"/api/user/delete-address",

            {

                addressId

            },

            {

                headers:{token}

            }

        );

        if(response.data.success){

            setUser(response.data.user);

            toast.success(response.data.message);

        }
        else{

            toast.error(response.data.message);

        }

    }
    catch(error){

        toast.error(error.message);

    }

}
const makeDefault=async(addressId)=>{

    try{

        const response=await axios.post(

            backendURL+"/api/user/set-default-address",

            {

                addressId

            },

            {

                headers:{token}

            }

        );

        if(response.data.success){

            setUser(response.data.user);

            toast.success(response.data.message);

        }
        else{

            toast.error(response.data.message);

        }

    }
    catch(error){

        toast.error(error.message);

    }

}

    useEffect(()=>{
        if(user){
            setFormData({
                name:user.name||"",
                phone:user.phone||"",
                age:user.age||"",
                gender:user.gender||""
            });
        }
    },[user]);

    const changeHandler=(e)=>{
        setFormData(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }));
    }

    const saveProfile=async()=>{

        try{

            const response=await axios.post(
                backendURL+"/api/user/update-profile",
                formData,
                {
                    headers:{token}
                }
            );

            if(response.data.success){

                setUser(response.data.user);

                toast.success(response.data.message);

                setEditMode(false);

            }else{

                toast.error(response.data.message);

            }

        }catch(error){

            console.log(error);

            toast.error(error.message);

        }

    }

    if(!user){
        return <p className="text-center mt-20">Loading...</p>;
    }

    return(
        <div className="max-w-5xl mx-auto py-10">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-semibold">
                    Personal Information
                </h1>

                {
                    editMode ?

                    <div className="space-x-3">

                        <button
                        onClick={()=>setEditMode(false)}
                        className="border px-4 py-2 rounded">

                            Cancel

                        </button>

                        <button
                        onClick={saveProfile}
                        className="bg-black text-white px-4 py-2 rounded">

                            Save

                        </button>

                    </div>

                    :

                    <button
                    onClick={()=>setEditMode(true)}
                    className="bg-black text-white px-5 py-2 rounded">

                        Edit Profile

                    </button>

                }

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <div>

                    <label>Name</label>

                    <input
                    disabled={!editMode}
                    name="name"
                    value={formData.name}
                    onChange={changeHandler}
                    className="w-full border rounded px-3 py-2 mt-1"/>

                </div>

                <div>

                    <label>Email</label>

                    <input
                    disabled
                    value={user.email}
                    className="w-full border rounded px-3 py-2 mt-1 bg-gray-100"/>

                </div>

                <div>

                    <label>Phone</label>

                    <input
                    disabled={!editMode}
                    name="phone"
                    value={formData.phone}
                    onChange={changeHandler}
                    className="w-full border rounded px-3 py-2 mt-1"/>

                </div>

                <div>

                    <label>Age</label>

                    <input
                    type="number"
                    disabled={!editMode}
                    name="age"
                    value={formData.age}
                    onChange={changeHandler}
                    className="w-full border rounded px-3 py-2 mt-1"/>

                </div>

                <div>

                    <label>Gender</label>

                    <select
                    disabled={!editMode}
                    name="gender"
                    value={formData.gender}
                    onChange={changeHandler}
                    className="w-full border rounded px-3 py-2 mt-1">

                        <option value="">Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>

                    </select>

                </div>

            </div>
            <div className="mt-12">

    <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-semibold">

            Saved Addresses

        </h2>

        <button
        onClick={openAddAddress}
        className="bg-black text-white px-5 py-2 rounded">

            + Add Address

        </button>

    </div>

    {

        user.addresses.length===0?

        <p>No saved addresses.</p>

        :

        <div className="grid md:grid-cols-2 gap-5">

            {

                user.addresses.map(address=>(

                    <div
                    key={address._id}
                    className="border rounded-xl p-5">

                        <div className="flex justify-between">

                            <h3 className="font-semibold">

                                {address.addressType}

                            </h3>

                            {

                                address.isDefault&&

                                <span className="text-green-600 text-sm">

                                    Default

                                </span>

                            }

                        </div>

                        <div className="mt-3 space-y-1">

                            <p>{address.fullName}</p>

                            <p>{address.phone}</p>

                            <p>{address.houseNo}, {address.street}</p>

                            {

                                address.landmark&&

                                <p>{address.landmark}</p>

                            }

                            <p>{address.city}, {address.state}</p>

                            <p>{address.country}</p>

                            <p>{address.pincode}</p>

                        </div>

                        <div className="flex gap-4 mt-5 text-sm">

                            {

                                !address.isDefault&&

                                <button
                                onClick={()=>makeDefault(address._id)}
                                className="text-blue-600">

                                    Make Default

                                </button>

                            }

                            <button
                            onClick={()=>openEditAddress(address)}
                            className="text-yellow-600">

                                Edit

                            </button>

                            <button
                            onClick={()=>deleteAddress(address._id)}
                            className="text-red-600">

                                Delete

                            </button>

                        </div>

                    </div>

                ))

            }

        </div>

    }

</div>
{
showAddressModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white rounded-xl p-6 w-[90%] max-w-xl">

<h2 className="text-2xl font-semibold mb-5">
{
editingAddress
?
"Edit Address"
:
"Add Address"
}
</h2>

<div className="grid grid-cols-2 gap-4">

<input
name="fullName"
placeholder="Full Name"
value={addressData.fullName}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="phone"
placeholder="Phone"
value={addressData.phone}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="houseNo"
placeholder="House No"
value={addressData.houseNo}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="street"
placeholder="Street"
value={addressData.street}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="landmark"
placeholder="Landmark"
value={addressData.landmark}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="city"
placeholder="City"
value={addressData.city}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="state"
placeholder="State"
value={addressData.state}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="country"
placeholder="Country"
value={addressData.country}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<input
name="pincode"
placeholder="Pincode"
value={addressData.pincode}
onChange={addressChangeHandler}
className="border rounded p-2"
/>

<select
name="addressType"
value={addressData.addressType}
onChange={addressChangeHandler}
className="border rounded p-2">

<option value="Home">Home</option>
<option value="Work">Work</option>
<option value="Other">Other</option>

</select>

</div>

<div className="flex justify-end gap-3 mt-6">

<button
onClick={()=>setShowAddressModal(false)}
className="border px-4 py-2 rounded">

Cancel

</button>

<button
onClick={saveAddress}
className="bg-black text-white px-4 py-2 rounded">

{
editingAddress
?
"Update"
:
"Save"
}

</button>

</div>

</div>

</div>

)
}
        </div>
    );
}

export default MyProfilePage;
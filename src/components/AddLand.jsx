import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
function AddLand() {

    const navigate = useNavigate();
    const [landDetails , setLandDetails] = useState({
        title: "",
        description: "",
        address: "",
        city: "",
        zipcode: "",
        size: "",
        price: "",
        files: [],
    })
    const [loading , setLoading] = useState(false)

    const handleLandDetails = (e) =>
    {
        setLandDetails(  
        {
        ...landDetails,
        [e.target.name]: e.target.value,
        }
        )
    }

    const submitData = async (e) => {
        setLoading(true)
        e.preventDefault(); 
        const selectedFiles = Array.from(e.currentTarget.files)
        // setFiles(selected)
        console.log("selected",selectedFiles)
        for(let i  =  0 ; i<selectedFiles.length ; i++)
        {
            let data = new FormData();
            data.append("file" , selectedFiles[i])
            data.append("upload_preset", "LandFiles");
            data.append("cloud_name", "dzn9oj49z");

            try {
                const response = await axios.post("https://api.cloudinary.com/v1_1/dzn9oj49z/image/upload", data)
                // console.log(response.data); 
                setLandDetails(prev => ({
                    ...prev,
                    files: [...prev.files, response.data.url]
                }))
            } 
            catch (error) {
                console.log(error);
            }
        }
        setLoading(false)
    }


    const notifySuccess = () => {
        toast.success('Land Added', {
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    
      const notifyError = () => {
        toast.error("Please Login to Add Land",{
          position: "top-center",
          autoClose: 1200,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      };
    
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <h1 className='text-4xl text-left font-bold w-[480px]'>Fill the following details</h1>
        <form className='flex flex-col items-center w-max h-max gap-5 mt-6'>
            <input className='h-12 w-[480px] border border-gray-300 outline-none p-5 text-md font-normal rounded-md shadow-sm' type="text"
            placeholder='Name of the land'
            name='title'
            value={landDetails.title}
            onChange={(e) => handleLandDetails(e)}
            />

            <input className='h-12 w-[480px] border border-gray-300 outline-none p-5 text-md font-normal rounded-md shadow-sm' type="number"
            placeholder='Price (₹)'
            name="price"
            value={landDetails.price}
            onChange={(e) => handleLandDetails(e)}
            />

            <div className='flex justify-between gap-3 w-[480px]'>
            <input className='h-12 w-full border border-gray-300 outline-none p-5 text-md font-normal rounded-md shadow-sm' type="text"
            placeholder='Address'
            name="address"
            value={landDetails.address}
            onChange={(e) => handleLandDetails(e)}
            />

            <input className='h-12 w-full border border-gray-300 outline-none p-5 text-md font-normal rounded-md shadow-sm' type="text"
            placeholder='City'
            name="city"
            value={landDetails.city}
            onChange={(e) => handleLandDetails(e)}
            />
            </div>

            <div className='flex justify-between gap-3 w-[480px]'>
            <input className='h-12 w-full border border-gray-300 outline-none p-5 text-md font-normal rounded-md shadow-sm' type="text"
            placeholder='Size (in sq.ft.)'
            name="size"
            value={landDetails.size}
            onChange={(e) => handleLandDetails(e)}
            />

            <input className='h-12 w-full border border-gray-300 outline-none p-5 text-md font-normal rounded-md shadow-sm' type="text"
            placeholder='Zipcode'
            name="zipcode"
            value={landDetails.zipcode}
            onChange={(e) => handleLandDetails(e)}
            />
            </div>

            <textarea className='h-40 w-[480px] resize-none overflow-y-scroll border border-gray-300 outline-none pl-5 pt-3 text-lg font-normal rounded-md shadow-sm'
            name="description" id="" cols="30" rows="20"  placeholder='Description'
            onChange={(e) => handleLandDetails(e)}
            value={landDetails.description}
            >
            </textarea>

            <input type="file" className="file-input bg-gray-100 border-gray-300 outline-none rounded-md shadow-sm file-input-ghost w-full max-w-xs" 
            multiple
            onChange={(e) => submitData(e)}
            />

            <div className='flex justify-start flex-wrap'>
                {loading?(<p>Please wait , the images are loading...</p>): (
                    landDetails.files?.map((file) => ((
                        <div key={file} className='h-8'> 
                            <img className='object-contain h-full w-full' src={file} alt="" />
                        </div>
                    )))
                )}
            </div>

            <div className='flex justify-end w-full'>
            <button className="btn bg-[#38e078] hover:bg-green-500 px-8"
                disabled={loading} 
                onClick={() =>
                {
                    axios.post("http://localhost:3000/addland" ,{
                        title: landDetails.title, 
                        description: landDetails.description,
                        address: landDetails.address,
                        city: landDetails.city,
                        size: landDetails.size,
                        zipcode: landDetails.zipcode,
                        price: landDetails.price,
                        files: landDetails.files
                    } , {
                        headers: {
                            'Content-Type': 'application/json',
                            "Authorization": localStorage.getItem("token")
                        }
                    })
                    .then((res) => {
                        console.log(res.data.message);
                        notifySuccess();
                    })
                    .catch((error) => {
                        console.error("Error adding land:", error);
                        notifyError();
                    });
        
                    setLandDetails({
                        title: "",
                        description: "",
                        price: 0,
                        files: []
                    });
                    navigate("/alllands")
                }}
            >Add</button>
            </div>
        </form>
        <ToastContainer
            position="top-center"
            autoClose={1999}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
       />
       <ToastContainer
            position="top-center"
            autoClose={1200}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
    </div>

    
  )
}

export default AddLand
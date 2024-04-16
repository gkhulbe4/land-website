import React from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function Land() {

    let { landId } = useParams();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [files, setFiles] = useState();
    const [price, setPrice] = useState("");


    useEffect(() => {
        axios.get(`http://localhost:3000/lands/${landId}`)
        .then((res) => {
            const result = res.data.land;
            setTitle(result.title);
            setDescription(result.description);
            setPrice(result.price)
            setFiles(result.files)
        })
    } ,[files])

  return (
    <div className='flex flex-col justify-center items-center'>
        <div className="carousel w-full flex">
            {files?.map((file , index) => (
                <div key={index+1} id={index+1} className="carousel-item w-full justify-center">
                    <div className='h-96 w-[600px] relative'>
                        <img src={file} className="object-contain h-full w-full" />
                    </div>
                </div> 
            ))}
        </div>
        <div className="flex justify-center w-full py-2 gap-2">
            {files?.map((file, index) => (
                <a key={index} href={`#${index+1}`} className="btn btn-xs">{index+1}</a> 
            ))}
        </div>
        <h1>Title : {title}</h1>
        <h1>Description : {description}</h1>
        <h1>Price : ₹{price}</h1>

            
    </div>
  )
}

export default Land
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import useLandStore from '../../landStore'
import { useNavigate } from "react-router-dom";
import Hero from './Hero';

function Home() {

    const navigate = useNavigate();
    // const [hover , setHover] = useState(false)
    const {landInfo , fetchLandInfo} = useLandStore((state) => ({
      landInfo: state.landInfo,
      fetchLandInfo: state.fetchLandInfo,
    }))

    useEffect(()=>{
        fetchLandInfo()
    } , [])
    
  return (
    <div className='flex flex-col gap-6 bg-gray-200'>
      <div className=' h-[640px]'> 
        <Hero/>
      </div>
        {landInfo.map((land) => (
            <div className="flex bg-white py-7 px-2 cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out border-t mx-5 rounded-lg"
            onClick={() => navigate("/land/"+land._id)}
            >

            <div className="flex relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0" >
              <img className="rounded-xl h-full w-full" src={land.files[0]}/>
            </div>
      
            <div className="flex flex-col flex-grow pl-5">
              <div className="flex justify-between text-right font-light">
                <p>{land.city}</p>
              </div>
              <h4 className="text-xl">{land.title.toUpperCase()}</h4>
              <div className="border-b w-10 pt-2"></div>
      
              <p className="pt-2 text-sm text-gray-500 flex-grow">{land.description}</p>
      
              <div className="flex justify-between items-end pt-5">
                <p className="flex items-center text-right font-light">
                  {land.address} , {land.zipcode}
                </p>
                <div>
                  <p className="text-lg font-semibold lg:text-2xl pr-2">₹{new Intl.NumberFormat("en-IN").format(land.price)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default Home
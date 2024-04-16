import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react';

function Prac3() {

    const [info , setInfo] = useState();
    const {register , handleSubmit , formState: { errors }} = useForm();

    const submitInfo = (data) => {
        setInfo(data)
        console.log(data)
    }
    console.log(errors)
    
  return (
    <div className='flex flex-col justify-center items-center h-screen'> 
    <pre>{JSON.stringify(info , undefined , 2)}</pre>
    <div className='flex flex-col'>
        <h1 className='text-center text-xl font-bold'>Registration Form</h1>

        <form className='flex flex-col w-96 h-max gap-7 justify-between border border-black p-5 bg-gray-100'
        onSubmit={handleSubmit(submitInfo)}
        >
            <div className='flex flex-col justify-between'>
                <label htmlFor="">Username</label>
                <input
                className='border border-black pl-2'
                type="text"
                placeholder='Username'
                {...register('username', {
                    required: 'Username is required',
                    minLength: {
                        value: 4,
                        message: 'Username must be at least 4 characters long',
                    },
                    maxLength: {
                        value: 10,
                        message: 'Username should not exceed 10 characters',
                    }
                })}
                />
                {errors.username && <p className='text-red-600 text-sm font-normal'>{errors.username.message}</p>}
            </div>

            <div className='flex flex-col justify-between'>
                <label htmlFor="">Email</label>
                <input className='border border-black pl-2' type="email" placeholder='Email' 
                {...register('email', { 
                    required: "Email is required",
                    })}/>
                {errors?.email && <p className='text-red-600 text-sm font-normal'>{errors.email.message}</p>}
            </div>

            <div className='flex flex-col justify-between'>
                <label htmlFor="">Password</label>
                <input className='border border-black pl-2' type="password" placeholder='Password'
                {...register('password', { 
                    required: "Password is required",
                    pattern: { 
                        value: /^[0-9]+$/, 
                        message: 'Only numeric characters are allowed' 
                    } 
                })} />
                {errors?.password && <p className='text-red-600 text-sm font-normal'>{errors.password.message}</p>}
            </div>

            <button className='border border-black text-white bg-blue-500 hover:bg-blue-400 mt-3' 
            type='submit'
            >Submit
            </button>

        </form>

    </div>

    </div>
  )
}

export default Prac3

{/* <div className="flex flex-wrap justify-between gap-8 p-10">
        {landInfo.map((land, key) => (
          <div
            key={key}
            className="card card-compact w-96 bg-base-100 shadow-xl border border-white transform transition-transform hover:scale-105"
          >
            <figure>
              <img
                src={land.files[0]}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {land.title}
              </h2>
              <p>{land.description}</p>
              <div className="card-actions justify-end">
                <Button
                  onClick={() => {
                    setDeleteLandId(land?._id);
                  }}
                >
                  Delete
                </Button>

                <button
                  className="btn btn-warning"
                  onClick={() => navigate("/edit/" + land._id)}
                >
                  Edit
                </button>
                <button className="btn btn-primary">Rs.{land.price}</button>
              </div>
            </div> */}
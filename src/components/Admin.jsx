import React from 'react'
import { useNavigate } from 'react-router-dom'

function Admin() {

    const navigate = useNavigate();

  return (
    <div className='flex justify-center items-center gap-6 h-screen'>
        <button className='btn btn-outline btn-info' onClick={() => navigate('/addland')} >Add Land</button>
        <button className='btn btn-outline btn-info' onClick={() => navigate("/alllands")}>All Lands</button>
    </div>
  )
}

export default Admin
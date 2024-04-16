import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useLandStore from '../../landStore'

function Header() {
  const navigate = useNavigate();
  // const [auth, setAuth] = useState(false);
  const {auth , setAuth} = useLandStore((state) => ({
    auth: state.auth,
    setAuth: state.setAuth
  }))

  useEffect(() => {
    axios.get("http://localhost:3000/admin/me" , {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    .then(res => {
      setAuth(true)
    })
    .catch(() => {
      setAuth(false)
    })
  },[])

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md">
      <h1
        className='text-3xl font-bold cursor-pointer text-green-600'
        onClick={() => navigate("/")}
      >
        LOGO
      </h1>
      <div className='flex justify-between items-center gap-6'>
        {auth ? (
          <>
            <button
              className="btn btn-outline btn-error btn-sm"
              onClick={() => {
                localStorage.setItem("token" , '');
                window.location = "/"
              }}
            >
              Logout
            </button>
            <button
              className="btn btn-outline btn-success btn-sm"
              onClick={() => navigate("/addland")}
            >
              Add Land
            </button>
            <button
              className="btn btn-outline btn-success btn-sm"
              onClick={() => navigate("/alllands")}
            >
              All Lands
            </button>
          </>
        ) : (
          <button
            className="btn btn-outline btn-success btn-sm"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}

export default Header;

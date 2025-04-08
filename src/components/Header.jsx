import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useLandStore from "../../landStore";

function Header() {
  const navigate = useNavigate();
  // const [auth, setAuth] = useState(false);
  const { auth, setAuth } = useLandStore((state) => ({
    auth: state.auth,
    setAuth: state.setAuth,
  }));

  useEffect(() => {
    axios
      .get("http://localhost:3000/admin/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setAuth(true);
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md">
      <img
        className="h-10 font-bold cursor-pointer"
        onClick={() => navigate("/")}
        src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXB5cmFtaWQtaWNvbiBsdWNpZGUtcHlyYW1pZCI+PHBhdGggZD0iTTIuNSAxNi44OGExIDEgMCAwIDEtLjMyLTEuNDNsOS0xMy4wMmExIDEgMCAwIDEgMS42NCAwbDkgMTMuMDFhMSAxIDAgMCAxLS4zMiAxLjQ0bC04LjUxIDQuODZhMiAyIDAgMCAxLTEuOTggMFoiLz48cGF0aCBkPSJNMTIgMnYyMCIvPjwvc3ZnPg=="
      />

      <div className="flex justify-between items-center gap-6">
        {localStorage.getItem("token") !== "" ? (
          <>
            <button
              className="btn btn-outline btn-error btn-sm"
              onClick={() => {
                localStorage.setItem("token", "");
                window.location = "/";
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

import React from "react";
// import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const handleOnClick = (option) => {
    window.open(`http://localhost:5000/apis/auth/${option}`, "_self");
  };
  return (
    <div className="w-full flex items-center justify-center gap-4 h-full mt-10">
      <button
        onClick={() => {
          handleOnClick("google");
        }}
        className="w-[100px] h-[30px] rounded-md text-white bg-blue-500"
      >
        GG
      </button>
      <button
        onClick={() => {
          handleOnClick("facebook");
        }}
        className="w-[100px] h-[30px] rounded-md text-white bg-red-500"
      >
        FB
      </button>
    </div>
  );
};

export default Login;

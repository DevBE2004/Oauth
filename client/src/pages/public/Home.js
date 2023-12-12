import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/authSlice";
import { apiGetUser } from "../../apis/auth";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogin, token } = useSelector((state) => state.auth);
  const fetchUser = async () => {
    const response = await apiGetUser(token);
  };
  useEffect(() => {
    token && fetchUser();
  }, [token]);
  return (
    <div className="w-full flex items-center justify-center gap-4 h-full mt-10">
      {!isLogin ? (
        <button
          onClick={() => navigate("/login")}
          className="w-[100px] h-[30px] rounded-md text-white bg-blue-500"
        >
          login
        </button>
      ) : (
        <button
          onClick={() => dispatch(logout())}
          className="w-[100px] h-[30px] rounded-md text-white bg-red-500"
        >
          logout
        </button>
      )}
    </div>
  );
};

export default Home;

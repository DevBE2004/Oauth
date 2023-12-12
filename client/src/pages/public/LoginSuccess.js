import React, { useEffect } from "react";
import { getCurrent } from "../../store/auth/asyncAction";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const LoginSuccess = () => {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  const { uid, tokenUrl } = useParams();
  useEffect(() => {
    dispatch(getCurrent({ id: uid, tokenUrl }));
  }, []);
  return (
    <div>
      {isLogin ? (
        <Navigate to={"/"} replace={true} />
      ) : (
        <h3>vui long dang nhap</h3>
      )}
    </div>
  );
};

export default LoginSuccess;

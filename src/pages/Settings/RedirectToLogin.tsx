import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";

const RedirectToLogin: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("In Logout..");
    dispatch(logout());
    history.push("/listings");
  }, []);
  return null;
};

export default RedirectToLogin;

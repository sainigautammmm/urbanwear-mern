import React, { useEffect, useState } from "react";
import { verifyOtpaction } from "../REDUX/ACTION/user";
import { Toaster, toast } from "sonner";
import {  useDispatch, useSelector,  } from "react-redux";
import { useNavigate } from "react-router-dom";

import { EMPTY_USER_FAILURE_MESSAGE } from "../REDUX/Constant/user";
function Otp() {
  const [formData, setFormData] = useState({
    email: localStorage.getItem("email") ? localStorage.getItem("email") : "",
    otp: "",
  });

  const isloading = useSelector((state) => state.myuser.isloading);
  const sucess = useSelector((state) => state.myuser.sucess);
  const failure = useSelector((state) => state.myuser.failure);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(verifyOtpaction(formData, navigate));
  };

  useEffect(() => {
    if (sucess) {
      toast.success(sucess);
    }
  }, [sucess]);

  useEffect(() => {
    if (failure) {
      toast.error(failure);
      dispatch({type :  EMPTY_USER_FAILURE_MESSAGE });
    }
  }, [failure]);

  return (
    <div>
      <Toaster richColor position="bottom-right"></Toaster>
      <div className="w-100 bg-body-secondary vh-100 d-flex justify-content-center align-items-center">
        <div className="bg-white w-25 border px-4 py-5">
          <h1 className="text-danger text-center mb-5">
            OTP Verification Form
          </h1>
          <form
            className="d-flex flex-column gap-4"
            onSubmit={handleFormSubmit}
          >
            <input
              className="form-control"
              type="text"
              placeholder="Enter your OTP"
              value={formData.otp}
              onChange={(e) =>
                setFormData({ ...formData, otp: Number(e.target.value) })
              }
            />

            <button className="btn btn-danger">
              {isloading ? (
                <div className="spinner-border text-light" role="status">
                  <span className="visually-hidden">loading...</span>
                </div>
              ) : (
                <span>Verify otp</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Otp;

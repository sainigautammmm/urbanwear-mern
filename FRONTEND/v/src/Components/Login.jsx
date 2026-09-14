// 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginuseraction } from "../REDUX/ACTION/user";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import { EMPTY_USER_FAILURE_MESSAGE } from "../REDUX/Constant/user";

function Login() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const isloading = useSelector(
    (state) => state.myuser.isloading
  );

  const sucess = useSelector(
    (state) => state.myuser.sucess
  );

  const failure = useSelector(
    (state) => state.myuser.failure
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    if (sucess) {
      toast.success(sucess);
    }
  }, [sucess]);


  useEffect(() => {
    if (failure) {
      toast.error(failure);

      dispatch({
        type: EMPTY_USER_FAILURE_MESSAGE
      });
    }
  }, [failure, dispatch]);


  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      loginuseraction(formData, navigate)
    );
  };


  return (
    <>
      <Toaster
        richColors
        position="bottom-right"
      />

      {/* Main Background */}
      <div
        className="vh-100 d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: "#f1f3f5"
        }}
      >

        {/* Login Card */}
        <div
          className="card shadow-lg border-0"
          style={{
            width: "400px",
            borderRadius: "15px"
          }}
        >

          <div className="card-body p-5">

            <h2 className="text-center fw-bold mb-2">
              Welcome Back
            </h2>

            <p className="text-center text-muted mb-4">
              Login to your UrbanWear account
            </p>


            <form
              className="d-flex flex-column gap-3"
              onSubmit={handleFormSubmit}
            >

              {/* Email */}
              <div>

                <label className="form-label">
                  Email
                </label>

                <input
                  className="form-control"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value
                    })
                  }
                  required
                />

              </div>


              {/* Password */}
              <div>

                <label className="form-label">
                  Password
                </label>

                <input
                  className="form-control"
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      password: e.target.value
                    })
                  }
                  required
                />

              </div>


              {/* Login Button */}
              <button
                type="submit"
                className="btn btn-dark mt-2"
                disabled={isloading}
              >

                {isloading ? (
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading...
                    </span>
                  </div>
                ) : (
                  "LOGIN"
                )}

              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default Login;
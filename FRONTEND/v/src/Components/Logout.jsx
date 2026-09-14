
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutuseraction } from "../REDUX/ACTION/user";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";
import { EMPTY_USER_FAILURE_MESSAGE } from "../REDUX/Constant/user";

function Logut() {

  const isloading = useSelector(
    (state) => state.myuser.isloading
  );

  const failure = useSelector(
    (state) => state.myuser.failure
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {

    if (failure) {

      toast.error(failure);

      dispatch({
        type: EMPTY_USER_FAILURE_MESSAGE
      });

    }

  }, [failure, dispatch]);


  const handleButtonclick = () => {

    dispatch(
      logoutuseraction(navigate)
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


        {/* Logout Card */}
        <div
          className="card shadow-lg border-0 text-center"
          style={{
            width: "400px",
            borderRadius: "15px"
          }}
        >

          <div className="card-body p-5">

            <h2 className="fw-bold mb-3">
              Logout
            </h2>

            <p className="text-muted mb-4">
              Are you sure you want to logout?
            </p>


            <div className="d-flex justify-content-center gap-2">

              <button
                onClick={handleButtonclick}
                className="btn btn-dark px-4"
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

                  "Logout"

                )}

              </button>

            </div>

          </div>

        </div>

      </div>

    </>
  );
}

export default Logut;
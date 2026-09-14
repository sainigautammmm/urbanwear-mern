// import React, { Suspense, useEffect, useState } from "react";
// import {  useDispatch, useSelector,  } from "react-redux";
// import { registerUseraction } from "../REDUX/ACTION/user";
// import { toast, Toaster } from "sonner";
// import { useNavigate } from "react-router-dom";
// import { EMPTY_USER_FAILURE_MESSAGE, EMPTY_USER_SUCESS_MESSAGE } from "../REDUX/Constant/user";

// function Register() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const user = useSelector((state) => state.myuser.user);
//   const isloading = useSelector((state) => state.myuser.isloading);
//   const sucess = useSelector((state) => state.myuser.sucess);
//   const failure = useSelector((state) => state.myuser.failure);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
//     dispatch(registerUseraction(formData, navigate));
//   };

//   useEffect(() => {
//     if (sucess) {
//       toast.success(sucess);
//       dispatch({ type: EMPTY_USER_SUCESS_MESSAGE });
//     }
//   }, [sucess]);

//   useEffect(() => {
//     if (failure) {
//       toast.error(failure);
//       dispatch({ type: EMPTY_USER_FAILURE_MESSAGE });
//     }
//   }, [failure]);

//   return (
//     <>
//       <Toaster richColors position="bottom-right"></Toaster>
//       <div className="w-100   bg-danger-subtle vh-100 d-flex flex-colum justifu-content-center align-item-center">
//         <div className="align-item-center justify-content-center bg-white">
//           <h1 className=" text-danger  align-item-center justify-content-center m-5 ">
//             REGISTER
//           </h1>
//           <form
//             className="align-item-center justify-content-center gap-4 bg-white m-5 "
//             onSubmit={handleFormSubmit}
//           >
//             <input
//               type="text"
//               placeholder="enter name"
//               className="form-control"
//               value={formData.name}
//               onChange={(e) =>
//                 setFormData({ ...formData, name: e.target.value })
//               }
//             ></input>
//             <input
//               type="text"
//               placeholder="enter email"
//               className="form-control"
//               value={formData.email}
//               onChange={(e) =>
//                 setFormData({ ...formData, email: e.target.value })
//               }
//             ></input>
//             <input
//               type="password"
//               placeholder="enter password"
//               className="form-control"
//               value={formData.password}
//               onChange={(e) =>
//                 setFormData({ ...formData, password: e.target.value })
//               }
//             ></input>
//             <button className="btn btn-primary mt-4">
//               {isloading ? (
//                 <div className="spinner-border text-light" role="status">
//                   <span className="visually-hidden">Loading...</span>
//                 </div>
//               ) : (
//                 <span>REGISTER</span>
//               )}
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Register;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUseraction } from "../REDUX/ACTION/user";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  EMPTY_USER_FAILURE_MESSAGE,
  EMPTY_USER_SUCESS_MESSAGE
} from "../REDUX/Constant/user";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const user = useSelector((state) => state.myuser.user);
  const isloading = useSelector((state) => state.myuser.isloading);
  const sucess = useSelector((state) => state.myuser.sucess);
  const failure = useSelector((state) => state.myuser.failure);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    dispatch(
      registerUseraction(formData, navigate)
    );
  };

  useEffect(() => {
    if (sucess) {
      toast.success(sucess);

      dispatch({
        type: EMPTY_USER_SUCESS_MESSAGE
      });
    }
  }, [sucess, dispatch]);

  useEffect(() => {
    if (failure) {
      toast.error(failure);

      dispatch({
        type: EMPTY_USER_FAILURE_MESSAGE
      });
    }
  }, [failure, dispatch]);


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

        {/* Register Box */}
        <div
          className="card shadow-lg border-0"
          style={{
            width: "400px",
            borderRadius: "15px"
          }}
        >

          <div className="card-body p-5">

            <h2 className="text-center mb-4 fw-bold">
              Create Account
            </h2>

            <p className="text-center text-muted mb-4">
              Join UrbanWear today
            </p>


            <form onSubmit={handleFormSubmit}>

              {/* Name */}
              <div className="mb-3">

                <label className="form-label">
                  Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value
                    })
                  }
                  required
                />

              </div>


              {/* Email */}
              <div className="mb-3">

                <label className="form-label">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control"
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
              <div className="mb-4">

                <label className="form-label">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  className="form-control"
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


              {/* Register Button */}
              <button
                type="submit"
                className="btn btn-dark w-100"
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
                  "CREATE ACCOUNT"
                )}

              </button>

            </form>

          </div>

        </div>

      </div>
    </>
  );
}

export default Register;
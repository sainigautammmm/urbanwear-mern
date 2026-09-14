
import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { removefromcartaction } from "../REDUX/ACTION/cart";

function Cart() {

  const cartitems = useSelector(
    (state) => state.mycart.cartitems
  );


const dispatch = useDispatch();


  return (
    <div className="row justify-content-center">

      <h1>Your Shopping Cart</h1>

      {cartitems.length === 0 ? (

        <p>Cart is empty</p>

      ) : (

        <div className="row">

          {cartitems.map((item) => (

            <div
              className="card m-3"
              style={{ width: "18rem" }}
              key={item.productid}
            >

              {/* Product Image */}
              <img
                src={item.productthumbnail}
                className="card-img-top"
                alt={item.producttitle}
              />

              <div className="card-body">

                {/* Product Name */}
                <h5 className="card-title">
                  {item.productname}
                </h5>

                {/* Product Price */}
                <p className="card-text">
                  Price: ₹{item.productprice}
                </p>

                {/* Rating */}
                <p className="card-text">
                  Rating: {item.productrating}
                </p>

                {/* Category */}
                <p className="card-text">
                  Category: {item.productcategory}
                </p>

                {/* Quantity */}
                <p className="card-text">
                  Quantity: {item.productquantity}
                </p>

<button
className="btn btn-danger"
  onClick={() => dispatch(removefromcartaction(item.productid))}
>
  Remove
</button>
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Cart;
import React from "react";
import { useSelector } from "react-redux";

function Pricing() {

  const cartitems = useSelector(
    (state) => state.mycart.cartitems
  );

  // Total calculate
  const grandTotal = cartitems.reduce(
    (total, item) =>
      total +
      Number(item.productprice) *
      Number(item.productquantity),
    0
  );

  return (
    <div className="container py-5">

      <h1 className="text-center mb-4">
        Order Summary
      </h1>

      {cartitems.length === 0 ? (

        <div className="text-center">
          <h4>Your cart is empty</h4>
          <p>Add some products to create your bill.</p>
        </div>

      ) : (

        <div className="row justify-content-center">

          {/* Products */}
          <div className="col-md-8">

            {cartitems.map((item) => (

              <div
                className="card mb-3"
                key={item.productid}
              >

                <div className="row g-0 align-items-center">

                  {/* Product Image */}
                  <div className="col-md-3">

                    <img
                      src={item.productthumbnail}
                      className="img-fluid rounded-start"
                      alt={item.productname}
                      style={{
                        height: "150px",
                        width: "100%",
                        objectFit: "cover"
                      }}
                    />

                  </div>

                  {/* Product Details */}
                  <div className="col-md-9">

                    <div className="card-body">

                      <h5 className="card-title">
                        {item.productname}
                      </h5>

                      <p className="card-text">
                        Category: {item.productcategory}
                      </p>

                      <p className="card-text">
                        Price: ₹{item.productprice}
                      </p>

                      <p className="card-text">
                        Quantity: {item.productquantity}
                      </p>

                      <h5>
                        Item Total: ₹
                        {Number(item.productprice) *
                          Number(item.productquantity)}
                      </h5>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>


          {/* Bill */}
          <div className="col-md-4">

            <div className="card shadow">

              <div className="card-body">

                <h3 className="card-title mb-4">
                  Bill Details
                </h3>

                <div className="d-flex justify-content-between">
                  <span>Items</span>
                  <span>{cartitems.length}</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>₹{grandTotal}</span>
                </div>

                <div className="d-flex justify-content-between">
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>

                <hr />

                <div className="d-flex justify-content-between">

                  <h4>Total</h4>

                  <h4>
                    ₹{grandTotal}
                  </h4>

                </div>

                <button
                  className="btn btn-dark w-100 mt-3"
                >
                  Proceed to Checkout
                </button>

              </div>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Pricing;
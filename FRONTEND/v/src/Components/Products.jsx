import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchproductaction } from "../REDUX/ACTION/products";
import { toast, Toaster } from "sonner";
import { addtocartaction } from "../REDUX/ACTION/cart";

function Products() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.myproduct.products);
  const isLoading = useSelector((state) => state.myproduct.isloading);
  const success = useSelector((state) => state.myproduct.success);
  const failure = useSelector((state) => state.myproduct.failure);

  useEffect(() => {
    dispatch(fetchproductaction());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: "CLEAR_PRODUCT_SUCCESS" });
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (failure) {
      toast.error(failure);
      dispatch({ type: "CLEAR_PRODUCT_FAILURE" });
    }
  }, [failure, dispatch]);

  // Add product to cart
  const handleAddToCart = (product) => {
    const productquantity = 1;

    dispatch(
      addtocartaction(
        product,
        productquantity,
        product.productprice
      )
    );
  };

  return (
    <div className="">
      <Toaster richColors position="bottom-right" />

      {isLoading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row justify-content-center">
          {products.map((item) => (
            <div
              className="card m-3"
              style={{ width: "18rem" }}
              key={item.productid}
            >
              <img
                src={item.productthumbnail}
                className="card-img-top"
                alt={item.producttitle}
              />

              <div className="card-body">
                <h5 className="card-title">
                  {item.productname}
                </h5>

                <p className="card-text">
                  Price: ₹{item.productprice}
                </p>

                <p className="card-text">
                  Rating: {item.productrating}
                </p>

                <p className="card-text">
                  Category: {item.productcategory}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() => handleAddToCart(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
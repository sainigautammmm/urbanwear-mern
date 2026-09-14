import React from "react";

function Slider() {
  return (
    <div
      id="clothingSlider"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#clothingSlider"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
        ></button>

        <button
          type="button"
          data-bs-target="#clothingSlider"
          data-bs-slide-to="1"
        ></button>

        <button
          type="button"
          data-bs-target="#clothingSlider"
          data-bs-slide-to="2"
        ></button>
      </div>

      {/* Slides */}
      <div className="carousel-inner">

        <div className="carousel-item active">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=80"
            className="d-block w-100"
            alt="T-Shirts"
            style={{ height: "500px", objectFit: "cover" }}
          />

          <div className="carousel-caption d-none d-md-block">
            <h2>New Collection</h2>
            <p>Discover our latest fashion collection</p>
            <button className="btn btn-light">
              Shop Now
            </button>
          </div>
        </div>


        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1600&q=80"
            className="d-block w-100"
            alt="Jeans"
            style={{ height: "500px", objectFit: "cover" }}
          />

          <div className="carousel-caption d-none d-md-block">
            <h2>Premium Jeans</h2>
            <p>Upgrade your everyday style</p>
            <button className="btn btn-light">
              Shop Jeans
            </button>
          </div>
        </div>


        <div className="carousel-item">
          <img
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&q=80"
            className="d-block w-100"
            alt="Fashion"
            style={{ height: "500px", objectFit: "cover" }}
          />

          <div className="carousel-caption d-none d-md-block">
            <h2>Look Your Best</h2>
            <p>Style for every occasion</p>
            <button className="btn btn-light">
              Explore Collection
            </button>
          </div>
        </div>

      </div>

      {/* Previous */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#clothingSlider"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
        <span className="visually-hidden">
          Previous
        </span>
      </button>

      {/* Next */}
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#clothingSlider"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
        <span className="visually-hidden">
          Next
        </span>
      </button>

    </div>
  );
}

export default Slider;
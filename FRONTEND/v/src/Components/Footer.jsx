import React from "react";

function Footer() {
  return (
    <footer className="bg-dark text-white ">
      <div className="container py-5">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold">MyShop</h4>
            <p className="text-light">
              Your one-stop online shopping destination. 
              Find quality products at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="/cart" className="text-white text-decoration-none">
                  CART
                </a>
              </li>
              <li className="mb-2">
                <a href="/Pricing" className="text-white text-decoration-none">
                  PRICING
                </a>
              </li>
              <li>
                <a href="/ai-stylist" className="text-white text-decoration-none">
                  ✨ AI Stylist
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Contact Us</h5>
            <p className="mb-2">📧 Email: sainigautam1705@gmail.com</p>
            <p className="mb-2">📞 Phone: 6283127796</p>
            <p>📍 Ludhiana, Punjab, India</p>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          <p className="mb-0">
            © {new Date().getFullYear()} MyShop. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
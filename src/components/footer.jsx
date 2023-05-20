import React from "react";

const footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer__addr">
          <h1 className="footer__logo">Intuitive DevStack Pvt Ltd</h1>
        </div>

        <div className="legal">
          <p>&copy; 2023 Intuitive DevStack Pvt Ltd. All rights reserved.</p>

          <div className="legal__links">
            <a
              className="footer__btn"
              href="mailto:ajaykumarjha05072000@gmail.com"
            >
              Email Us
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default footer;

/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const Cta = ({ className, divClassName, text = "Explore" }) => {
  return (
    <button className={`CTA ${className}`}>
      <div className={`explore ${divClassName}`}>{text}</div>
    </button>
  );
};

Cta.propTypes = {
  text: PropTypes.string,
};

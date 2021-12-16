import React from "react";

const Footer = () => {
  const cardStyle = {
    backgroundColor: "rgb(243, 243, 243)",
  };
  return(
    <footer className="p-3 text-center" style={{cardStyle}}>
      <div className="logo" />
      <p>Project for Runtime Revolution - onboarding by João Veríssimo</p>
    </footer>
  );
};

export default Footer;

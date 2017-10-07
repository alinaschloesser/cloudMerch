import React from "react";
import "./StoreLogin.css";

const StoreLogin = props => (
	<div className="everything">
    <section className="hero">
   <div className="hero-body">
    <div className="container">
      <h1 className="title">
        {props.userName}
      </h1>
      <h2 className="subtitle">
        {props.userDescription}
      </h2>
    </div>
  </div>
  </section>
    <div className="section">
      {props.children}
    </div>
</div>
);

export default StoreLogin;

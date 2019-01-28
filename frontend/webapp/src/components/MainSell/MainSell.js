import React from "react";
import "./MainSell.scss";
import { NavLink } from "react-router-dom";
import logo from "../../media/vectors/logoBlack.svg";
import SellInfoList from "../SellInfo/SellInfo";

export default function MainSell(props) {
  return (
    <div className="main-sell">
      <NavLink to="/" className="logo">
        <img src={logo} alt="Logo" />
      </NavLink>
      <SellInfoList {...props} />
    </div>
  );
}

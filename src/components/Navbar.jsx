import React from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useDispatch, useSelector } from "react-redux";

import { Dark, Light } from "../action/changeMode";
import { Link } from "react-router-dom";

const Navbar = () => {
  const changeMode = useSelector((state) => state.changeMode);
  const dispatch = useDispatch();
  const toggleModeSwitch = () => {
    changeMode === "dark" ? dispatch(Light()) : dispatch(Dark());
  };
  return (
    <div className={changeMode === "dark" && "dark-mode"}>
      <nav className="shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <header>
              <Link to="/">
                <div className="nav-title">Where in the world ?</div>
              </Link>
            </header>
            <div>
              <button onClick={toggleModeSwitch}>
                {changeMode === "dark" ? (
                  <LightModeIcon />
                ) : (
                  <DarkModeOutlinedIcon />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

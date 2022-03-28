import React, { useState } from "react";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useDispatch, useSelector } from "react-redux";

import { Dark, Light } from "../action/changeMode";

const Navbar = () => {
  const [modeSwitch, setModeSwitch] = useState(false);

  const changeMode = useSelector((state) => state.changeMode);
  const dispatch = useDispatch();

  // dispatch(Dark());

  // console.log(changeMode);
  const toggleModeSwitch = () => {
    changeMode == "dark" ? dispatch(Light()) : dispatch(Dark());
    // setModeSwitch(!modeSwitch);
  };
  return (
    <div className={changeMode == "dark" && "dark-mode"}>
      <nav className="shadow-sm">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <header>
              <div>Where in the world ?</div>
            </header>
            <div>
              <button onClick={toggleModeSwitch}>
                {changeMode == "dark" ? (
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

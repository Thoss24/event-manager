import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";

const MainNavigation = () => {
  const [iconRotate, setIconRotate] = useState(false);

  const isActive = ({ isActive }) => {
    return isActive ? classes.active : classes["list-item"];
  };

  const handleNavIcon = () => {
    setIconRotate((state) => {
      return !state;
    });
  };

  return (
    <nav className={classes["main-nav"]}>
      <div className={classes["nav-small-screen"]}>
        <CiMenuBurger onClick={handleNavIcon} className={`${classes["nav-icon"]} ${iconRotate && classes['rotate']}`} />
      </div>
      <div className={classes["nav-large-screen"]}>
        <ul>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"/"}>
              Home
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"events"}>
              Events
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"booked-events"}>
              Booked Events
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;

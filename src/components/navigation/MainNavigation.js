import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import NavModal from "../ui/NavModal";
import NotificationSystem from "../utility_components/Notifications";

const MainNavigation = () => {
  const [navDisplaying, setNavDisplaying] = useState(false);

  const isActive = ({ isActive }) => {
    return isActive ? classes.active : classes["list-item"];
  };

  const handleNavIcon = () => {
    setNavDisplaying((state) => {
      return !state;
    });
  };

  const hideNavModalHandler = () => {
    console.log("Hide nav")
    setNavDisplaying(false)
  };

  return (
    <>
    {navDisplaying && <NavModal isNavDisplaying={navDisplaying} hideNavModal={hideNavModalHandler}/>}
    <nav className={classes["main-nav"]}>
      <div className={classes["nav-small-screen"]}>
        <CiMenuBurger onClick={!navDisplaying ? handleNavIcon : null} className={`${classes["nav-icon"]} ${navDisplaying && classes['rotate']}`} />
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
        <NotificationSystem />
      </div>
    </nav>
    </>
  );
};

export default MainNavigation;

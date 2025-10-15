import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import NavModal from "../ui/NavModal";
import NotificationSystem from "../utility_components/Notifications";
import useWindowResize from "../../hooks/use-window-resize";
import { logoutUser } from "../../utility/authentication/auth_actions";

interface LogoutPageProps {
  onLogout: () => void; // callback for navigation
}

const MainNavigation: React.FC<LogoutPageProps> = ({onLogout}) => {
  const [mobileNavDisplaying, setMobileNavDisplaying] = useState(false);

  const width = useWindowResize();

  const mobileNavModalModalDisplaying = width && width <= 520 && mobileNavDisplaying === true;

  const isActive = ({ isActive }: {isActive: boolean}) => {
    return isActive ? classes.active : classes["list-item"];
  };

  const handleNavIcon = () => {
    setMobileNavDisplaying((state) => {
      return !state;
    });
  };

  const hideNavModalHandler = () => {
    console.log("Hide nav")
    setMobileNavDisplaying(false)
  };

  const handleLogout = async () => {
    try {
      const response = await logoutUser();

      console.log("Logout response", response)

      if (response === 200) {
        onLogout()
      } else {
        console.log("Unable to log out")
      }
    } catch (error) {
      console.log("Error logging out", error)
    }
  }

  return (
    <>
    {mobileNavModalModalDisplaying && <NavModal hideNavModal={hideNavModalHandler} onLogout={onLogout}/>}
    <nav className={classes["main-nav"]}>
      <div className={classes["nav-small-screen"]}>
        <CiMenuBurger
          onClick={!mobileNavModalModalDisplaying ? handleNavIcon : undefined}
          className={`${classes["nav-icon"]} ${mobileNavModalModalDisplaying && classes["rotate"]}`}
        />
      </div>
      <div className={classes["nav-large-screen"]}>
        <ul>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to="/app/home">
              Home
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to="/app/events">
              Events
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to="/app/booked-events">
              Booked Events
            </NavLink>
          </li>
        </ul>
      </div>
      <NotificationSystem />
      <button className={classes['logout-button']} onClick={handleLogout}>Logout</button>
    </nav>
    </>
  );
};

export default MainNavigation;

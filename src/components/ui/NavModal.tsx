import React from "react";
import classes from "./NavModal.module.css";
import { NavLink } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface NavModalProps {
  hideNavModal: () => void
}

const NavModal = ({ hideNavModal}: NavModalProps) => {

  const isActive = ({ isActive }: {isActive: boolean}) => {
    return isActive ? classes.active : classes["list-item"];
  };

  // `box ${animateEnter ? 'animate-enter' : ''} ${animateExit ? 'animate-exit' : ''}`

  return (
    <div className={classes["nav-modal"]}>
      <div className={classes.menu}>
        <IoIosCloseCircleOutline className={classes.close} onClick={hideNavModal}/>
        <ul className={classes['nav-menu-list']}>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"/app/home"} onClick={hideNavModal}>
              Home
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"events"} onClick={hideNavModal}>
              Events
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"booked-events"} onClick={hideNavModal}>
              Booked Events
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavModal;

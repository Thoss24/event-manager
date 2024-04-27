import classes from "./NavModal.module.css";
import { NavLink } from "react-router-dom";
import { IoIosCloseCircleOutline } from "react-icons/io";

const NavModal = (props) => {

  const isActive = ({ isActive }) => {
    return isActive ? classes.active : classes["list-item"];
  };

  // `box ${animateEnter ? 'animate-enter' : ''} ${animateExit ? 'animate-exit' : ''}`

  return (
    <div className={classes["nav-modal"]}>
      <div className={classes.menu}>
        <IoIosCloseCircleOutline className={classes.close} onClick={props.hideNavModal}/>
        <ul className={classes['nav-menu-list']}>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"/"} onClick={props.hideNavModal}>
              Home
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"events"} onClick={props.hideNavModal}>
              Events
            </NavLink>
          </li>
          <li className={classes["list-item"]}>
            <NavLink className={isActive} to={"booked-events"} onClick={props.hideNavModal}>
              Booked Events
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavModal;

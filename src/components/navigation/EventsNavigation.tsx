import React from "react";
import { Link } from "react-router-dom";
import classes from "./EventsNavigation.module.css";
import { useEffect, useState } from "react";
import { checkAccountType } from "../../utility/authentication/auth_actions";

const EventsNavigation = () => {
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    checkAccountType().then((response) => {
      if (response) {
        setUserAuth(response.data[0].account_type);
      }
    });
  }, [userAuth]);

  return (
    <nav className={classes["events-nav"]}>
      <ul>
        <li>
          <Link className={classes["nav-link"]} to={""}>
            Events
          </Link>
        </li>
        {userAuth === 'admin' && (
          <li>
            <Link className={classes["nav-link"]} to={"new-event"}>
              New Event
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default EventsNavigation;

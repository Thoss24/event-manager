import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserInfo from "../../utility/users/get_user_info";
import { User as UserType } from "../../types/users";
import { RouteParams } from "../../types/misc";
import ErrorElement from "../ui/ErrorElement";
import axios from "axios";
import classes from "./UserProfileInfo.module.css";

const UserProfileInfo = ({user_id, email, first_name, last_name, account_type, profile_color, profile_image,}: UserType) => {
  // const { userId } = useParams<RouteParams>(); // Use the defined RouteParams
  //const { userId } = useParams() as { userId: string };

  return (
    <div>
      <div className={classes["user-profile-card"]}>
        {user_id ? (
          <div>
            <div
              className={classes["user-profile-avatar"]}
              style={{
                backgroundColor: `#${profile_color}`,
              }}
              aria-label={`Profile image for ${first_name} ${last_name}`}
            >
              {profile_image}
            </div>
            <div className={classes["user-profile-info"]}>
              <h2 className={classes["user-profile-name"]}>
                {first_name} {last_name}
              </h2>
              <p className={classes["user-profile-email"]}>{email}</p>
            </div>
          </div>
        ) : (
          <ErrorElement error="Could not load user details" />
        )}
      </div>
    </div>
  );
};

export default UserProfileInfo;

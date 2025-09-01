import classes from "./Members.module.css";
import { Link } from "react-router-dom";
import React from "react";
import { MemberComponentProps } from "../../types/users";

const Member = ({firstName, lastName, key, id, profileImgColor, profileImage, eventForm, addMemberToEvent}: MemberComponentProps) => {

    const firstNameCapitalized = firstName && firstName.charAt(0).toUpperCase() + firstName.slice(1);
    const lastNameCapitalized = lastName && lastName.charAt(0).toUpperCase() + lastName.slice(1);

    const addMemberToEventHandler = () => {
        const member = {
            id:id,
            profileImage:profileImage,
            firstName: firstName,
            lastName: lastName,
            profileImageColor: profileImgColor
        }
        addMemberToEvent && addMemberToEvent(member) // new event form - define type to functions here
    }

    let member = eventForm ? (
         <div className={classes['member']} onClick={addMemberToEvent && addMemberToEventHandler}>
                <div style={{backgroundColor: `#${profileImgColor}`}} className={classes['profile_image']}>{profileImage}</div>
                <div className={classes.name}>
                <p>{firstNameCapitalized}</p>
                <p>{lastNameCapitalized}</p>
                </div>
            </div>
    ) : (<Link to={`/${id}`}>
            <div className={classes['member']} onClick={addMemberToEvent && addMemberToEventHandler}>
                <div style={{backgroundColor: `#${profileImgColor}`}} className={classes['profile_image']}>{profileImage}</div>
                <div className={classes.name}>
                <p>{firstNameCapitalized}</p>
                <p>{lastNameCapitalized}</p>
                </div>
            </div>
        </Link>)

    return member
}

export default Member;
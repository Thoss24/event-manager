import React from "react";
import classes from "./Loading.module.css";
import { UpcommingEventsProps } from "../../types/misc";

const Message = ({message}: UpcommingEventsProps) => {
    return <h2 className={classes.loading}>{message}</h2>
};

export default Message
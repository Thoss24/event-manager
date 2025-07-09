import React from "react";
import classes from './ErrorElement.module.css';
import { ErrorElementProps } from "../../types/misc";

const ErrorElement = ({ error }: ErrorElementProps) => {
  return (
    <div>
      <p className={classes.error}>{error}</p>
    </div>
  )
}

export default ErrorElement
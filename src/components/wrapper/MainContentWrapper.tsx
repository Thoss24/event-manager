import React from "react";
import { ReactNode } from "react";
import classes from "./MainContentWrapper.module.css";

type MainContentWrapperProps = {
  children: ReactNode;
};

const MainContentWrapper = ({ children }: MainContentWrapperProps) => {
  return <div className={classes.content}>{children}</div>;
};

export default MainContentWrapper;

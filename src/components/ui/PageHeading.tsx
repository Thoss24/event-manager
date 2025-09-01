import classes from './PageHeading.module.css';
import React from "react";

interface PageHeadingProps {
    header: string
}

const PageHeading = ({header}: PageHeadingProps) => {
    return (
        <h1 className={classes.heading}>{header}</h1>
    )
};

export default PageHeading
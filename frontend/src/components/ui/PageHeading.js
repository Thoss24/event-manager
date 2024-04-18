import classes from './PageHeading.module.css'

const PageHeading = (props) => {
    return (
        <h1 className={classes.heading}>{props.header}</h1>
    )
};

export default PageHeading
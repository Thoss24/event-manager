import classes from "./Loading.module.css";

const Message = (props) => {
    return <h2 className={classes.loading}>{props.message}</h2>
};

export default Message
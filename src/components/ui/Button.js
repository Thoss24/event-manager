import { Link } from "react-router-dom";
import classes from "./Button.module.css";

const Button = (props) => {
    return (
        <button disabled={props.disable} className={classes.button} onSubmit={props.onsubmit} onClick={props.onclick}><Link to={props.link}>{props.text}</Link></button>
    )
};

export default Button
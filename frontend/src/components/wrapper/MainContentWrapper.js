import classes from './MainContentWrapper.module.css';

const MainContentWrapper = (props) => {
    return (
        <div className={classes.content}>{props.children}</div>
    )
};

export default MainContentWrapper
import classes from './ErrorElement.module.css';

const ErrorElement = (props) => {
  return (
    <div>
      <p className={classes.error}>{props.error}</p>
    </div>
  )
}

export default ErrorElement
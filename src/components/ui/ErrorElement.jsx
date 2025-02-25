import classes from './ErrorElement.module.css';

const ErrorElement = (props) => {
  return (
    <div>
      <p>{props.error}</p>
    </div>
  )
}

export default ErrorElement
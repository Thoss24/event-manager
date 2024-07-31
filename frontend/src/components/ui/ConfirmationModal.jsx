import classes from "./ConfirmationModal.module.css";

const ConfirmationModal = (props) => {
  return (
    <div className={classes["confirmation-modal"]}>
      <div className={classes.backdrop} />
      <div className={classes.confirmation}>
        <p>{props.message}</p>
        <div className={classes['confirmation-buttons']}>
          <button onClick={props.hideModal}>Yes</button>
          <button onClick={props.hideModal}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

import classes from "./ConfirmationModal.module.css";

const ConfirmationModal = (props) => {
  
  const confirmActionHandler = (confirm) => {
    props.confirmAction(true);
  };

  const denyActionHandler = (confirm) => {
    props.confirmAction(false);
  };

  return (
    <div className={classes["confirmation-modal"]}>
      <div className={classes.backdrop} />
      <div className={classes.confirmation}>
        <p>{props.message}</p>
        <p>{props.confirmationMessage}</p>
        <div className={classes["confirmation-buttons"]}>
          <button onClick={confirmActionHandler}>Yes</button>
          <button onClick={denyActionHandler}>No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

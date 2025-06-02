import classes from "./ConfirmationModal.module.css";
import { useState } from "react";

const ConfirmationModal = (props) => {
  const [actionConfirmed, setActionConfirmed] = useState(false);

  const confirmActionHandler = (confirm) => {
    setActionConfirmed(true)
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
        {!actionConfirmed && (
          <div className={classes["confirmation-buttons"]}>
            <button onClick={confirmActionHandler}>Yes</button>
            <button onClick={denyActionHandler}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;

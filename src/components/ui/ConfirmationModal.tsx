import React from "react";
import classes from "./ConfirmationModal.module.css";
import { useState } from "react";
import { confirmationModalComponentProps } from "../../types/misc";

const ConfirmationModal = ({confirmAction, message}: confirmationModalComponentProps) => {
  const [actionConfirmed, setActionConfirmed] = useState(false);

  const confirmActionHandler = () => {
    setActionConfirmed(true)
    confirmAction(true);
  };

  const denyActionHandler = () => {
    confirmAction(false);
  };

  return (
    <div className={classes["confirmation-modal"]}>
      <div className={classes.backdrop} />
      <div className={classes.confirmation}>
        <p>{message}</p>
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

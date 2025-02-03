import removeBookedEvent from "../../../utility/events_actions/remove-booked-event";
import classes from "./BookedEvents.module.css";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/event_details_modal_slice";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { useState, useEffect } from "react";
import checkAccountType from "../../../utility/authentication/check_account_type";
import Responses from "../../utility_components/Responses";

const BookedEventDetails = (props) => {

  const dispatch = useDispatch();
  const [confirmationMsg, setConfirmationMsg] = useState(null);
  const [userAuth, setUserAuth] = useState();

  useEffect(() => {
    checkAccountType().then((response) => {
      if (response) {
        console.log(response)
        setUserAuth(response.data[0]);
      }
    });
  }, []);

  const removeBookedEventModalDisplaying = useSelector(
    (state) => state.eventsModal.removeBookedEventModalDisplaying
  );

  const removeBookedEventHandler = () => {
    dispatch(modalActions.showRemoveBookedEventModal())
  };

  const confirmRemoveBookedEventHandler = async (confirm) => {
    if (confirm) {
        try {
            const response = await removeBookedEvent(props.id, userAuth.user_id); // booked event id + user id

            if (response.status === 200) {
              setConfirmationMsg(response.data.message)
            }

            setTimeout(() => {
              setConfirmationMsg("");
              dispatch(modalActions.hideRemoveBookedEventModal());
              window.location.href = "http://localhost:3000/"
            }, 2000);
            
        } catch (error) {
          console.log(error)
            setConfirmationMsg("Could not remove booked event. Please try again later.")
        }
    } else {
        dispatch(modalActions.hideRemoveBookedEventModal())
    }
  };

  return (
    <div>
      {removeBookedEventModalDisplaying && (
        <ConfirmationModal
          confirmationMessage={confirmationMsg}
          confirmAction={confirmRemoveBookedEventHandler}
          message={"Are you sure you want to remove this event from your booked events?"}
        />
      )}
      <div>
        <h1>{props.name}</h1>
        <h1>{props.date}</h1>
        <button onClick={removeBookedEventHandler}>Delete</button>
      </div>
      <Responses />
    </div>
  );

};

export default BookedEventDetails;

import removeBookedEvent from "../../../utility/events_actions/remove-booked-event";
import classes from "./BookedEvents.module.css";
import { useDispatch, useSelector } from "react-redux";
import { modalActions } from "../../../store/event_details_modal_slice";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { useState, useEffect } from "react";
import checkAccountType from "../../../utility/authentication/check_account_type";
import Responses from "../../utility_components/Responses";
import fetchEvent from "../../../utility/events_actions/fetch-event-data";
import { useParams } from "react-router-dom";

const BookedEventDetails = (props) => {

  const dispatch = useDispatch();
  const [confirmationMsg, setConfirmationMsg] = useState(null);
  const [userAuth, setUserAuth] = useState();
  const [eventItem, setEventItem] = useState();
  const [modalDefaultMessage, setModalDefaultMessage] = useState("Are you sure you want to remove this event from your booked events?")

  useEffect(() => {

    const fetchAccountData = async (res) => {
      try {
        const response = await checkAccountType();

        if (response.status === 200) {
          console.log("Account info collected successfully.")
          setUserAuth(response.data[0]);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    const fetchEventData = async (res) => {
      try {
        const response = await fetchEvent(props.id);

        if (response.status === 200) {
          console.log("Event data collected successfully");
          setEventItem(response.data);
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    }

    fetchEventData();
    fetchAccountData();
  }, []);

  const removeBookedEventModalDisplaying = useSelector(
    (state) => state.eventsModal.removeBookedEventModalDisplaying
  );

  const removeBookedEventHandler = () => {
    dispatch(modalActions.removeBookedEventModalHandler())
  };

  const confirmRemoveBookedEventHandler = async (confirm) => {
    if (confirm) {
        try {
            const response = await removeBookedEvent(props.id, userAuth.user_id); // booked event id + user id

            if (response.status === 200) {
              setConfirmationMsg(response.data)
              setModalDefaultMessage(null)
            }

            setTimeout(() => {
              dispatch(modalActions.removeBookedEventModalHandler());
              window.location.href = "http://localhost:3000/"
            }, 2000);
            
        } catch (error) {
          setConfirmationMsg(error.response ? error.response.data : "Unable to remove event");
        }
    } else {
        dispatch(modalActions.removeBookedEventModalHandler())
    }
  };

  return (
    <div>
      {removeBookedEventModalDisplaying && (
        <ConfirmationModal
          confirmationMessage={confirmationMsg}
          confirmAction={confirmRemoveBookedEventHandler}
          message={modalDefaultMessage}
        />
      )}
      <div>
        <h1>{props.name}</h1>
        <h1>{props.date}</h1>
        <button onClick={removeBookedEventHandler}>Delete</button>
      </div>
      <Responses bookedEventId={props.id} />
    </div>
  );

};

export default BookedEventDetails;

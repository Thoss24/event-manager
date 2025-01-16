import Button from "../../ui/Button";
import classes from "./EventDetails.module.css";
import { useNavigate } from "react-router-dom";
import checkAccountType from "../../../utility/authentication/check_account_type";
import { useEffect, useState } from "react";
import bookEvent from "../../../utility/events_actions/book_event";
import { modalActions } from "../../../store/event_details_modal_slice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import ConfirmationModal from "../../ui/ConfirmationModal";
import { deleteEvent } from "../../../utility/events_actions/delete_event";
import Member from "../../users_elements/Member";

const EventDetails = (props) => {

  const [userAuth, setUserAuth] = useState();
  const [confirmationMsg, setConfirmationMsg] = useState('')

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    checkAccountType().then((response) => {
      if (response) {
        setUserAuth(response.data[0].account_type);
      }
    });
  }, [userAuth]);

  const proceedToEdit = () => {
    navigate("edit");
  };

  const bookEventHandler = () => {

  }

  const deleteEventModalDisplaying = useSelector(
    (state) => state.eventsModal.deleteEventDetailsModalDisplaying
  );

  const deleteEventHandler = () => {
    dispatch(modalActions.showEventDetailsModal())
  }

  const confirmDeleteEventHandler = async (confirm) => {
    if (confirm) {
      const deletedEvent = await deleteEvent(props.id)
      
      if (deletedEvent.status === 200) {
        setConfirmationMsg("Event successfully deleted.");
      }

      setTimeout(() => {
        setConfirmationMsg("");
        dispatch(modalActions.hideEventDetailsModal());
        window.location.href = "/events";
      }, 3000)
    }
  }

  return (
    
    <div className={classes.container}>
    {deleteEventModalDisplaying && <ConfirmationModal confirmationMessage={confirmationMsg} confirmAction={confirmDeleteEventHandler} message={'Are you sure you want to delete this event?'}/>}

      <div className={classes.details}>
        <h1>{props.name}</h1>
        <h3>{props.description}</h3>
        <h4>{props.date}</h4>
        <div className={classes.members}>
          <h3>Members</h3>
          <div>
            {props.users.map(user => (
              <Member firstName={user.firstName} lastName={user.lastName} key={user.userId} profileImgColor={user.profileColor} profileImage={user.profileImage}/>
            ))}
          </div>
        </div>
      </div>
      <div className={classes.buttons}>
        {userAuth === "admin" && (
          <Button text={"Edit"} onclick={proceedToEdit} />
        )}
        <Button text={"Delete"} onclick={deleteEventHandler}/>
        <Button text={"Book Event"}/>
        <Button link={".."} text={"Back"} />
      </div>
      
    </div>
    
  );
};

export default EventDetails;

import MainNavigation from "../../components/navigation/MainNavigation";
import { Outlet } from "react-router-dom";
import classes from "./AppRoot.module.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import ConfirmationModal from "../../components/ui/ConfirmationModal";
import { modalActions } from "../../store/event_details_modal_slice";

const AppRoot = () => {
  const deleteEventModalDisplaying = useSelector(
    (state) => state.eventsModal.deleteEventDetailsModalDisplaying
  );

  const dispatch = useDispatch();

  const hideDeleteEventModalDisplay = () => {
    dispatch(modalActions.hideEventDetailsModal());
  }

  return (
    <div>
      {deleteEventModalDisplaying && <ConfirmationModal hideModal={hideDeleteEventModalDisplay}  message={'Are you sure you want to delete this event?'}/>}
      <MainNavigation />
      <main className={classes.content}>
        <Outlet />
      </main>
    </div>
  );
};

export default AppRoot;

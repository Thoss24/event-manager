import Button from "../../ui/Button";
import classes from "./EventDetails.module.css";
import { useDispatch } from "react-redux";
import { redirect, useParams } from "react-router-dom";
import { bookedEventsActions } from "../../../store/booked_events_slice";
import { useSubmit, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import checkAccountType from "../../../utility/authentication/check_account_type";
import { useEffect, useState } from "react";

const EventDetails = (props) => {

  const [userAuth, setUserAuth] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    checkAccountType().then((response) => {
      if (response) {
        console.log("Response event details", response)
        setUserAuth(response.data[0].account_type);
      }
    });
    console.log("Account type: ", userAuth)
  }, [userAuth]);

  const proceedToEdit = () => {
   
    navigate("edit");
  
  };

  return (
    <div className={classes.container}>
      <div className={classes.details}>
        <h1>{props.name}</h1>
        <h3>{props.description}</h3>
        <h4>{props.date}</h4>
      </div>
      <div className={classes.buttons}>
        {userAuth === "admin" && (
          <Button text={"Edit"} onclick={proceedToEdit} />
        )}
        <Button text={"Delete"} />
        <Button text={"Book Event"} />
        <Button link={".."} text={"Back"} />
      </div>
    </div>
  );
};

export default EventDetails;

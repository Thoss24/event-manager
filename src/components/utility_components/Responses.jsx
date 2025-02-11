import classes from "./Responses.module.css";
import { useRef } from "react";
import createResponse from "../../utility/users/create_response";

const Responses =  (props) => {

  const textAreaRef = useRef(null);

  const createResponseHandler = async (event) => {

    event.preventDefault();

    const userResponse = {
      response: textAreaRef.current.value,
      eventId: props.bookedEventId
    };

    try {
      const response = await createResponse(userResponse);

      if (response.status === 200) {
        console.log("Response added.")
      }
    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div>
      <form action="" onSubmit={createResponseHandler}>
      <textarea name="responses" placeholder="Add a reponse..." ref={textAreaRef}>

      </textarea>
      <button type="submit">Add</button>
      </form>
      <section>
        {/* responses area */}
      </section>
    </div>
  ) 
}

export default Responses;
import classes from "./Responses.module.css";
import { useRef, useEffect, useState } from "react";
import createResponse from "../../utility/users/create_response";
import getResponses from "../../utility/users/get_responses";
import ResponseListItem from "./ResponseListItem";

const Responses = (props) => {
  const textAreaRef = useRef(null);
  const [responses, setResponses] = useState(null);

  useEffect(() => {
    const getResponsesHandler = async () => {
      const bookedEventObj = {
        eventId: props.bookedEventId,
      };

      try {
        const response = await getResponses(bookedEventObj);

        if (response) {
          setResponses(response.data);
          console.log("Responses loaded successfully.");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getResponsesHandler();
  }, [props.bookedEventId]);

  const createResponseHandler = async (event) => {
    event.preventDefault();

    const userResponse = {
      response: textAreaRef.current.value,
      eventId: props.bookedEventId,
    };

    try {
      const response = await createResponse(userResponse);

      if (response.status === 200) {
        console.log("Response added.");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  responses && console.log(responses)

  return (
    <div>
      <form action="" onSubmit={createResponseHandler}>
        <textarea
          name="responses"
          placeholder="Add a reponse..."
          ref={textAreaRef}
        ></textarea>
        <button type="submit">Add</button>
      </form>
      <section>
        {responses &&
          responses.map((response) => (
            <ResponseListItem response={response.response} key={response.id}/>
          ))}
      </section>
    </div>
  );
};

export default Responses;

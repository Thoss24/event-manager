import React, { FormEvent } from "react";
import classes from "./Responses.module.css";
import { useRef, useEffect, useState } from "react";
import { createResponse, getResponses } from "../../utility/users/user_actions";
import ResponseListItem from "./ResponseListItem";
import { ResponseParams } from "../../types/misc";

interface ResponsesProps {
  bookedEventId: number;
}

const Responses = ({bookedEventId}: ResponsesProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [responses, setResponses] = useState<ResponseParams[] | null>(null);

  useEffect(() => {
    const getResponsesHandler = async () => {

      try {
        const response = await getResponses(bookedEventId);

        if (response) {
          setResponses(response.data);
          console.log("Responses loaded successfully.");
        }
      } catch (error) {
        console.log("Error: ", error);
      }
    };

    getResponsesHandler();
  }, [bookedEventId]);

  const createResponseHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userResponse: ResponseParams = {
      response: textAreaRef.current?.value ?? undefined,
      eventId: bookedEventId,
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
          responses.map((responseItem) => (
            <ResponseListItem response={responseItem.response} key={responseItem.eventId}/>
          ))}
      </section>
    </div>
  );
};

export default Responses;

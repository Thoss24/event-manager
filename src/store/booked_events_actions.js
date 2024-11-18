import { bookedEventsActions } from "./booked_events_slice";

const getBookedEventsData = async (dispatch) => {
    const response = await fetch('https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/booked-events.json');

    if (!response.ok) {
        throw new Error("Could not load cart!")
    };

    const data = await response.json();

    dispatch(bookedEventsActions.replaceBookedEvents(data));

    return data
};

export const addEventData = async (cart) => {
    
    const response = await fetch('https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/booked-events.json', {
        method: 'PUT',
        body: JSON.stringify(cart)
    });

    if (!response.ok) {
        throw new Error("Could not load cart!")
    };

};

export const editBookedEvent = async () => {
    
};



export default getBookedEventsData;
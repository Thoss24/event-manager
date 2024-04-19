import { json, redirect } from "react-router-dom";
import axios from "axios"

export const action = async ({request, params}) => {

    const method = request.method;

    console.log(method);

    const data = await request.formData();

    const name = data.get('name');
    const date = data.get('date');
    const description = data.get('description')

    const newEvent = {
        name: name,
        date: date,
        description: description
    };

    let url = "http://localhost:3001/";

    if (method === 'PATCH') {
        const id = params.eventId
        url = `https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`
    };

    const response = axios.post(url, newEvent)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })

    if (!response.ok) {
        throw json({message: "could not find event"}, {status: 500})
    };

    return redirect('/events');
};
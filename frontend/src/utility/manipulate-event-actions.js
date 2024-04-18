import { json, redirect } from "react-router-dom";

export const action = async ({request, params}) => {

    const method = request.method;

    console.log(method);

    const data = await request.formData();

    const name = data.get('name');

    const date = data.get('date');

    const newFormData = {
        name: name,
        date: date
    };

    let url = "https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/events.json";

    if (method === 'PATCH') {
        const id = params.eventId
        url = `https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`
    };

    const response = await fetch(url, {
        method: method,
        body: JSON.stringify(newFormData)
    });

    if (!response.ok) {
        throw json({message: "could not find event"}, {status: 500})
    };

    return redirect('/events');
};
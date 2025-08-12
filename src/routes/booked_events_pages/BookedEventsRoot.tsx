import React from "react";
import { Outlet } from "react-router-dom";
import BookedEventsNavigation from "../../components/navigation/BookedEventsNavigation";

const BookedEventsRoot = () => {
    return (
        <div>
            <BookedEventsNavigation />
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default BookedEventsRoot
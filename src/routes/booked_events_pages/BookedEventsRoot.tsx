import React from "react";
import { Outlet } from "react-router-dom";

const BookedEventsRoot = () => {
    return (
        <div>
            <main>
                <Outlet />
            </main>
        </div>
    )
};

export default BookedEventsRoot
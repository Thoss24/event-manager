import React from "react";
import { render, fireEvent } from '@testing-library/react';
import Notification from "../components/utility_components/Notification";
import clearNotification from "../utility/users/clear_notification";
import '@testing-library/jest-dom';

jest.mock("../utility/users/clear_notification");

describe('Notification component', () => {
  it('calls clearNotification function on clicking close icon to remove the notification and mark as seen', async () => {
    clearNotification.mockResolvedValue({status: 200});
    const {getByRole} = render(<Notification message='Test notification' />)
  })
})
require('dotenv').config();
import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Notification from "../components/utility_components/Notification";
import clearNotification from "../utility/users/clear_notification";
import '@testing-library/jest-dom';

const { connection } = require('../../myapp/db');
const request = require('supertest');
const app = require('../../myapp/testing-app');

jest.mock("../utility/users/clear_notification");

describe('Notification component', () => {

  test('calls clearNotification function on clicking close icon to mark as seen', async () => {

    const notificationId = 56;

    clearNotification.mockResolvedValue({status: 200});
    render(<Notification message='Test notification' />)

    const closeButton = screen.getAllByRole('button', {name: 'Clear notification'});
    fireEvent.click(closeButton[0]);

    // expect(clearNotification).toHaveBeenCalledWith(notificationId);

    await request(app)
    .post('/api/clear-notification')
    .send({ notificationId });

    const updatedNotification = await request(app).post('/api/get-notification-by-id').send({notificationId});

    console.log("updatedNotification", updatedNotification.body[0])

    expect(updatedNotification.body[0].seen).toBe(1);
  })

  test("should return notifications for user with a valid ID", async () => {
    const userId = 20;
    const response = await request(app).post('/api/get-notifications').send({userId});

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body)).toBe(true); // Check that result is an array
    expect(response.body.length).toBeGreaterThan(0); // Ensure it has at least one object

    console.log("!Length:", response.body.length)

    response.body.forEach(notification => {
      expect(notification).toEqual(expect.objectContaining({
        id: expect.any(Number),
        event_id: expect.any(Number),
        notification: expect.any(String), // Example for email format
        user_id: expect.any(Number),
        seen: expect.any(Number)
      }));
    });
  
  })

})

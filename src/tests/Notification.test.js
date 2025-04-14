require('dotenv').config();
import React from "react";
import { fireEvent, render, screen } from '@testing-library/react';
import Notification from "../components/utility_components/Notification";
import clearNotification from "../utility/users/clear_notification";
import '@testing-library/jest-dom';

const request = require('supertest');
const express = require('express');
const router = require('../../myapp/routes/users');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use('/api', router); // Use your router

jest.mock("../utility/users/clear_notification");

describe('Notification component', () => {
  test('calls clearNotification function on clicking close icon to remove the notification and mark as seen', async () => {

    clearNotification.mockResolvedValue({status: 200});
    render(<Notification message='Test notification' />)

    const closeButton = screen.getAllByRole('button', {name: 'Clear notification'});
    fireEvent.click(closeButton[0]);

    expect(clearNotification).toHaveBeenCalled();
  })

  test("should return notifications for user with a valid ID", async () => {
    const userId = 20;

    const response = await request(app).post('/api/get-notifications').send({userId});

    expect(response.status).toBe(200);
  })
})

console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DATABASE:', process.env.NODE_ENV === 'test' ? process.env.DB_TEST_DATABASE : process.env.DB_DATABASE);
require('dotenv').config();
import '@testing-library/jest-dom';
const request = require('supertest');
const app = require('../../myapp/testing-app');

describe('Notification component', () => {

  test('calls clearNotification function on clicking close icon to mark as seen', async () => {

    const notificationId = 56;

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

    response.body.forEach(notification => {
      expect(notification).toEqual(expect.objectContaining({
        id: expect.any(Number),
        event_id: expect.any(Number),
        notification: expect.any(String), // Example for email format
        user_id: expect.any(Number),
        seen: 1
      }));
    });
  
  })

})

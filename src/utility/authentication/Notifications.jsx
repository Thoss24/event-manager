import React, { useEffect, useState } from 'react';

function NotificationSystem() {
  const [notifications, setNotifications] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket('ws://localhost:4000');

    // Set the WebSocket instance
    setSocket(ws);

    // Listen for incoming messages
    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
    };

    // Handle WebSocket errors
    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    // Cleanup on component unmount
    return () => {
      ws.close();
    };
  }, []);

  const sendNotification = () => {
    if (socket) {
      const notification = {
        message: 'New notification!',
      };
      socket.send(JSON.stringify(notification));
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Notification System</h1>
      <button
        onClick={sendNotification}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Send Notification
      </button>
      <div className="space-y-2">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className="p-2 border rounded bg-gray-100 shadow-sm"
          >
            <p className="text-sm font-medium">{notif.type}</p>
            <p className="text-sm">{notif.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationSystem;
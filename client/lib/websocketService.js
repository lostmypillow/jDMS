// const socket = new WebSocket('ws://your-websocket-server-url');

// socket.onopen = () => {
//   console.log('WebSocket connection established');
// };

// socket.onmessage = (event) => {
//   // Handle incoming messages
//   console.log('Message from server:', event.data);
// };

// socket.onclose = () => {
//   console.log('WebSocket connection closed');
// };

// socket.onerror = (error) => {
//   console.error('WebSocket error:', error);
// };

// export default {
//   sendMessage(message) {
//     if (socket.readyState === WebSocket.OPEN) {
//       socket.send(message);
//     } else {
//       console.error('WebSocket is not open');
//     }
//   },
//   onMessage(callback) {
//     socket.onmessage = (event) => callback(event.data);
//   },
//   close() {
//     if (socket.readyState === WebSocket.OPEN) {
//       socket.close();
//     }
//   }
// };

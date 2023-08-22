const io = require("socket.io-client");

// Replace 'http://localhost:your_port' with the actual URL of your server
const socket1 = io.connect("http://localhost:3001");
const socket2 = io.connect("http://localhost:3001");
// Add more sockets as needed for additional clients

// Listen for 'connect' event
socket1.on("connect", () => {
	console.log("Socket 1 연결");
	// Emit a 'private chat' event to simulate sending a private message
	socket1.emit("private chat", {
		token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6IuyhsOuMgOywrCIsImVtYWlsIjoiZGFlY2hhbjQ3NkBnbWFpbC5jb20iLCJpYXQiOjE2OTI2ODE5OTYsImV4cCI6MTY5Mjc2ODM5NiwiaXNzIjoiUGluZWFwcGxlIFBpenphIn0.xiDL7Ad0nW7lXjv7lNV4uvyevbuab6BA-7cQBH_zjaE'",
		targetUserId: 5, // Replace with the target user's ID
		content: "어서와 Socket 1",
	});
});

// Listen for 'new private message' event
socket2.on("새로운 private message", (message) => {
	console.log("Socket 2 received new private message:", message);
});

socket1.disconnect();
socket2.disconnect();

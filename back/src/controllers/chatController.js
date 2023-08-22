import chatService from "../services/chatService";

async function handleJoinChatRoom(socket, senderId, recipientId) {
	const roomId = await chatService.createChatRoom(senderId, recipientId);
	socket.join(roomId);
	socket.emit("chat_room_joined", roomId);
}

async function handleSendMessage(io, roomId, senderId, content) {
	const message = await chatService.createMessage(roomId, senderId, content);
	io.to(roomId).emit("receive_message", message);
}
async function getChatRoomsForUser(socket, userId) {
	const chatRooms = await chatService.getChatRoom(userId);
	socket.emit("user_chat_rooms", chatRooms);
}

async function getChatRoomMessages(socket, roomId, userId) {
	const messages = await chatService.getMessages(roomId, userId);
	socket.emit("chat_room_messages", messages);
}

module.exports = {
	handleJoinChatRoom,
	handleSendMessage,
	getChatRoomsForUser,
	getChatRoomMessages,
};

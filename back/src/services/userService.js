const { PrismaClient } = require("@prisma/client");
// const { addSuffix } = require('yarn/lib/cli');
const prisma = new PrismaClient();

/** @description 모든 유저 정보 */
const getAllUsers = async () => {
    try{
        return await prisma.user.findMany({
			select: {
				id: true,
				nickname: true,
				about: true,
				activity: true,
			},
		});
    } catch (error) {
        throw error;
    }
};


/** @description 유저 찾기 */
const searchUsers = async (nickname) => {
	try {
		return await prisma.user.findUnique({
			where: {
				nickname: nickname,
			},
			select: {
				id: true,
				nickname: true,
				about: true,
				activity: true,
			},
		});
	} catch (error) {
		throw error;
	}
};


/** @description 유저 찾기(id) */
const searchUserId = async (userId) => {
	try {
		return await prisma.user.findUnique({
			where: {
				id: userId,
			},
			select: {
				id: true,
				nickname: true,
				about: true,
				activity: true,
			},
		});
	} catch (error) {
		throw error;
	}
};


/** @description 랜덤 유저 */
const getRandomUsers = async () => {
	try {
		const randomCount = await prisma.user.count();
		const skip = Math.floor(Math.random() * randomCount);
		return await prisma.user.findMany({
		take: 3,
		skip: skip,
		orderBy: {
				id: "desc",
			},
		select: {
			id: true,
			nickname: true,
			about: true,
			activity: true,
			},
		});
	} catch (error) {
		throw error;
	}
};


/** @description 유저 정보 */
const getUserInfo = async (userId) => {
	try {
		return await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
	} catch (error) {
		throw error;
	}
};


/** @description 친구 요청 */
const friendRequest = async (userId,  requestId ) => {
	try {
		await prisma.friendship.createMany({
			data: [
					{
					userAId: userId,
					userBId: requestId,
					isAccepted: false,
					},
					{
					userAId: requestId,
					userBId: userId,
					isAccepted: false,
					},
				],
		});
		return friendRequest;
	} catch (error) {
		throw error;
	}
};

/** @description 친구 요청 목록 */
const friendRequestList = async  (userId) => {
	try {
		return await prisma.friendship.findMany({
				where: {
					userBId : userId,
					isAccepted: false,
				},
		});
	} catch (error) {
		throw  error;
	}
};


/** @description 친구 수락 */
const acceptFriend = async  (userId, requestId) => {
	try {
		return await prisma.friendship.updateMany({
			where: {
				OR : [
						{userAId: requestId, userBId: userId},
						{userAId: userId, userBId: requestId},
				],
			},
			data:{
					isAccepted: true
				},
		});
	} catch (error) {
		throw  error;
	}
};


/** @description 친구 거절 */
const rejectFriend = async  (userId, requestId) => {
	try {
		return await prisma.friendship.deleteMany({
		where: {
				OR : [
						{userAId: requestId, userBId: userId},
						{userAId: userId, userBId: requestId},
				],
			},
		});
	} catch (error) {
		throw  error;
	}
};


/** @description 친구 목록 */
const getMyFriends = async  (userId) => {
	try {
		return await prisma.friendship.findMany({
			where: {
				userAId: userId,
				isAccepted: true,
			},
			select:{
				userB : {
					select : {
						id: true,
						nickname: true,
						about: true,
						activity: true,
					}
				}
			},
		});
	} catch (error) {
		throw  error;
	}
};

/** @description 친구 삭제 */
const deleteFriend = async (userId, friendId) => {
	try {
		return await prisma.friendship.deleteMany({
			where: {
					OR: [
						{userAId: userId, userBId: friendId},
						{userAId: friendId, userBId: userId}
					],
			},
		});
	} catch (error) {
		throw error;
	}
}




/** @description 친구의 최신 게시물 */
const friendsPost = async  (userId) => {
	try {
		return await prisma.friendship.findMany({
			where: {
				userAId: userId,
				isAccepted: true,
			},
			include:{
				userB : {
					select : {
						id: true,
						nickname: true,
						about: true,
						activity: true,
					}
				}
			},
		});
	} catch (error) {
		throw  error;
	}
}


/** @description 나의 인증 횟수, 랭킹 */
const myCertPost = async (userId) => {
	try {
		return await prisma.user.count({
			where: {
				writerId: userId,
				certPost: true,
				},
			include: {
				certPostImage: true,
			},
		});
	} catch (error) {
		throw error;
	}
}


module.exports = {
	getAllUsers,
	searchUsers,
	searchUserId,
	getUserInfo,
	friendRequest,
	friendRequestList,
	acceptFriend,
	rejectFriend,
	getMyFriends,
	deleteFriend,
	getRandomUsers,
	myCertPost,
};

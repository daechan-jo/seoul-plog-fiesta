const { PrismaClient } = require("@prisma/client");
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
		return await prisma.user.findMany({
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



/** @description 친구 추가 */
const addAsFriend = async (userAId, userBId ) => {
	try {
		await prisma.friendship.create({
			data: {
					userAId,
					userBId,
					},
		});
		return addAsFriend;
	} catch (error) {
		throw error;
	}
}


/** @description 친구 목록 */
const getMyFriends = async (userAId) => {
	try {
		return await prisma.friendship.findMany({
			where: {
				userAId: userAId,
			},
			select: {
				userBId: true,
			},
		});
	} catch (error) {
		throw error;
	}
};


/** @description 친구 삭제 */
const deleteFriend = async (userAId, userBId) => {
	try {
		return await prisma.friendship.delete({
			where: {
					userAId_userBId: {
						userAId: userAId,
						userBId: userBId,
					},
			},
		});
	} catch (error) {
		throw error;
	}
};

/** @description 친구의 최신 게시물 */


/** @description 나의 인증 횟수, 랭킹 */



module.exports = {
	getAllUsers,
	searchUsers,
	searchUserId,
	getUserInfo,
	addAsFriend,
	getMyFriends,
	deleteFriend,
	getRandomUsers,
};

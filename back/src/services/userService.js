const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// /** @description 모든 유저 정보 */
// const getAllUsers = async () => {
//     try{
//         return await prisma.user.findMany();
//     } catch (e) {
//         throw error("에러다 에러!");
//     }
// };

//todo 넘겨받는값이 없음ㅎㅎ;
/** @description 유저 찾기 */
// const searchUsers = async () => {
// 	try {
// 		return await prisma.user.findMany({
// 			where: {
// 				OR: [
// 					{ id: userId },
// 					{ name: userName },
// 					{ nickname: userNickname },
// 				],
// 			},
// 		});
// 	} catch (error) {
// 		throw error("에러다 에러!");
// 	}
// };

//todo 아몰랑 ㅎㅎ
const getRandomUsers = async () => {
	try {
		return await prisma.user.findMany({
			take: 1,
			orderBy: { id: "desc" },
			select: {
				nickname: true,
				activity: true,
				authCount: true,
			},
		});
	} catch (error) {
		throw error("에러다 에러!");
	}
};

/** @description 유저 정보 */
const getUserInfo = async (userId) => {
	try {
		return await prisma.user.findUnique(userId);
	} catch (error) {
		throw error("에러다 에러!");
	}
};

const getMyFriendship = async (friendshipId) => {
	try {
		return await prisma.friendship.findUnique({
			where: {
				id: friendshipId,
			},
			include: {
				AND: [{ id: userAId }, { id: userBId }],
			},
		});
	} catch (error) {
		throw error("에러다 에러!");
	}
};

const deleteMyfriendship = async (friendshipId) => {
	try {
		return await prisma.friendship.delete({
			where: {
				id: friendshipId,
			},
			include: {
				AND: [{ id: userAId }, { id: userBId }],
			},
		});
	} catch (error) {
		throw error("에러다 에러!");
	}
};

module.exports = {
	// searchUsers,
	getUserInfo,
	getMyFriendship,
	deleteMyfriendship,
	getRandomUsers,
};

import userService from "../services/userService.js";

// /** @description 모든 유저  */
// const getAllUsers = async ( req, res, next ) => {
//     try{
//         const users = await userService.getAllUsers();
//         res.status(200).json({ message: "모든 유저", users });
//     } catch (e) {
//         console.error(e);
//         error.status = 500;
//         next(error);
//     }
// };

/** @description 유저 검색 */
// const searchUsers = async (req, res, next) => {
// 	try {
// 		const users = await userService.searchUsers();
// 		res.status(200).json({ message: "유저 검색 결과", users });
// 	} catch (error) {
// 		console.error(error);
// 		error.status = 500;
// 		next(error);
// 	}
// };

/** @description 랜덤 유저 정보 */
const getRandomUsers = async (req, res, next) => {
	try {
		const randomUsers = await userService.getRandomUsers();
		res.status(200).json({ message: "랜덤 유", randomUsers });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
	console.log(getRandomUsers);
};

/** @description 현재 사용자 */
const currentUser = async (req, res, next) => {
	try {
		const userId = req.currnetUserId;
		const currentUserInfo = await userService.getUserInfo(userId);

		if (currentUserInfo.erroMessage) {
			throw new Error(currentUserInfo.errorMessage);
		}
		res.status(200).json({ message: "나의 상세 정보", currentUserInfo });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 리스트 */
const getMyFriendship = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const friendship = await userService.getMyFriendship(userId);
		res.status(200).json({ message: "친구 리스트", friendship });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 삭제 */
const deleteMyfriendship = async (req, res, next) => {
	try {
		const friendshipId = req.params.id;
		const deletedMyfriendship = await userService.deleteMyfriendship(
			friendshipId,
		);
		res.status(204).json({ message: "친구삭제", deletedMyfriendship });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = {
	// searchUsers,
	getRandomUsers,
	currentUser,
	getMyFriendship,
	deleteMyfriendship,
};

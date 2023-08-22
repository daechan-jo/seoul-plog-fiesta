import userService from "../services/userService.js";

/** @description 모든 유저  */
const getAllUsers = async ( req, res, next ) => {
    try{
        const users = await userService.getAllUsers();
		console.log(users);
        res.status(200).json({ message: "모든 유저", users });
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};


/** @description 유저 검색 */
const searchUsers = async (req, res, next) => {
	const nickname = req.params.name;
	try {
		const searchNickname = await userService.searchUsers(nickname);
		console.log(searchNickname);
		res.status(200).json({ message: "유저 검색 결과", searchNickname });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 유저 찬기(id) */
const searchUserId = async (req, res, next) => {
	const userId = parseInt(req.params.id);
	try {
		const searchId = await userService.searchUserId(userId);
		console.log(searchId);
		res.status(200).json({ message: "유저 검색 결과(id)", searchId });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 랜덤 유저 */
const getRandomUsers = async (req, res, next) => {
	try {
		const randomUsers = await userService.getRandomUsers();
		console.log(randomUsers);
		res.status(200).json({ message: "랜덤 유저", randomUsers });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};


/** @description 현재 사용자 */
const currentUser = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const currentUserInfo = await userService.getUserInfo(userId);
		console.log(currentUserInfo);
		res.status(200).json({ message: "나의 상세 정보", currentUserInfo });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};




/** @description 친구 추가 */
const addAsFriend = async ( req, res, next ) => {
	try {
		const userAId = req.user.id;
		const userBId = parseInt(req.params.id);
		if (userAId == userBId) return res.status(404).json({ message: "나 자신과는 친구가 될 수 없어!"});
		const addAsFriend = await userService.addAsFriend(userAId, userBId)
		console.log(addAsFriend);
		res.status(200).json({ message: "친구 요청", addAsFriend});
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
}


/** @description 친구 목록 */
const getMyFriends = async (req, res, next) => {
	// const userId = req.user.id;
	try {
		const userAId = req.user.id;
		const myFriendList = await userService.getMyFriends(userAId);
		console.log(myFriendList);
		res.status(200).json({ message: "친구 목록", myFriendList});
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};


/** @description 친구 삭제 */
const deleteFriend = async (req, res, next) => {
	try {
		// const userId = req.user.id;
		// const friendId = parseInt(req.params.id);
		const userAId = req.user.id;
		const userBId = parseInt(req.params.id);
		const deleteFriend = await userService.deleteFriend(
			userAId, userBId
		);
		res.status(200).json({ message: "친구 삭제", deleteFriend});
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};




module.exports = {
	getAllUsers,
	searchUsers,
	searchUserId,
	getRandomUsers,
	currentUser,
	addAsFriend,
	getMyFriends,
	deleteFriend,
};

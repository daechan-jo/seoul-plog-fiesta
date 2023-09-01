import userService from '../services/userService.js';
import ploService from '../services/ploService.js';

/** @description 모든 유저  */
const getAllUsers = async (req, res, next) => {
	try {
		const page = req.query.page !== undefined ? parseInt(req.query.page) : null;
		const limit = req.query.limit !== undefined ? parseInt(req.query.limit) : null;

		const users = await userService.getAllUsers(page, limit);

		if (users == 0) {
			return res.status(404).json({ message: '유저 없음' });
		}

		res.status(200).json({ message: '모든 유저', users });
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

		if (!searchNickname) {
			return res.status(404).json({ message: '검색 결과 없음' });
		}

		res.status(200).json({ message: '유저 검색 결과', searchNickname });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 유저 찬기(id) */
const searchUserId = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.id);
		const searchId = await userService.searchUserId(userId);

		if (!searchId) {
			return res.status(404).json({ message: '검색 결과 없음' });
		}

		res.status(200).json({ message: '유저 검색 결과(id)', searchId });
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
		res.status(200).json({ message: '랜덤 유저', randomUsers });
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
		res.status(200).json({ message: '나의 상세 정보', currentUserInfo });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 요청 */
const friendRequest = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const requestId = parseInt(req.params.id);

		if (userId === requestId) {
			return res
				.status(400)
				.json({ message: '나 자신과는 친구가 될 수 없어!' });
		}
		const weAreFriends = await userService.weAreFriends(userId, requestId);
		if (weAreFriends) {
			return res.status(400).json({ message: '이미 요청 했거나 우린 친구!' });
		}
		const existingFriendRequest = await userService.weAreFriends(
			requestId,
			userId,
		);
		if (existingFriendRequest) {
			return res.status(400).json({ message: '이미 요청 했거나 우린 친구!' });
		}
		const request = await userService.createFriendship(userId, requestId);
		res.status(200).json({ message: '친구 요청 완료', request });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 요청 목록 */
const friendRequestList = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const friendRequest = await userService.friendRequestList(userId);
		res.status(200).json({ message: '친구 요청 리스트', friendRequest });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 수락 */
const acceptFriend = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const requestId = parseInt(req.params.id);
		const acceptFriend = await userService.acceptFriend(userId, requestId);
		res.status(200).json({ message: '친구 수락', acceptFriend });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 거절 */
const rejectFriend = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const requestId = parseInt(req.params.id);
		const rejectFriend = await userService.rejectFriend(userId, requestId);
		res.status(200).json({ message: '친구 거절', rejectFriend });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 목록 */
const getMyFriends = async (req, res, next) => {
	try {
		const page = req.query.page !== undefined ? parseInt(req.query.page) : null;
		const limit = req.query.limit !== undefined ? parseInt(req.query.limit) : null;
		const userId = req.user.id;
		const friendsList = await userService.getMyFriends(userId, page, limit);
		res.status(200).json({ message: '친구 목록', friendsList });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 친구 삭제 */
const deleteFriend = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const friendId = parseInt(req.params.id);
		const deleteFriend = await userService.deleteFriend(userId, friendId);
		res.status(200).json({ message: '친구 삭제', deleteFriend });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 나의 인증 */
const myScoreNRank = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const myCertPostCount = await userService.myScoreNRank(userId);
		const myScore = myCertPostCount * 353;
		const myRank = await ploService.getUserRank(userId)
		res.status(200).json({ message: '나의 점수 / 랭킹', data :{myScore, myRank} });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};


/** @description 친구 최신 게시물 */
const friendsRecentPost = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const friendsRecentPost = await userService.friendsRecentPost(userId);
		res.status(200).json({ message: '친구 최신 게시물', friendsRecentPost });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getCertPostsByUserId = async (req, res, next) => {
	try {
		const page = req.query.page !== undefined ? parseInt(req.query.page) : null;
		const limit = req.query.limit !== undefined ? parseInt(req.query.limit) : null;
		const userId = req.user.id;
		const certPosts = await userService.getCertPostsByUserId(userId, page, limit);
		res.status(200).json(certPosts);
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
	friendRequest,
	friendRequestList,
	acceptFriend,
	rejectFriend,
	getMyFriends,
	deleteFriend,
	myScoreNRank,
	friendsRecentPost,
	getCertPostsByUserId,
};

import userService from '../services/userService';
import ploService from '../services/ploService';

const getAllUsers = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '모든 유저'
   * #swagger.description = '모든 유저 정보를 가져온다.'
   */
  try {
    const page = req.query.page !== undefined ? Number(req.query.page) : null;
    const limit =
      req.query.limit !== undefined ? Number(req.query.limit) : null;

    const users = await userService.getAllUsers(page, limit);

    if (users.length === 0) {
      return res.status(404).json({ message: '유저 없음' });
    }

    return res.status(200).json({ message: '모든 유저', users });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const searchUsers = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '유저 검색'
   * #swagger.description = '유저 닉네임으로 검색한다.'
   */
  const nickname = req.params.name;
  try {
    const searchNickname = await userService.searchUsers(nickname);

    if (!searchNickname) {
      return res.status(404).json({ message: '검색 결과 없음' });
    }

    return res.status(200).json({ message: '유저 검색 결과', searchNickname });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const searchUserId = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '유저 검색(id)'
   * #swagger.description = '유저 id로 검색한다.'
   */
  try {
    const userId = Number(req.params.id);
    const searchId = await userService.searchUserId(userId);

    if (!searchId) {
      return res.status(404).json({ message: '검색 결과 없음' });
    }

    return res.status(200).json({ message: '유저 검색 결과(id)', searchId });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getRandomUsers = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '랜덤 유저'
   * #swagger.description = '랜덤 유저 5명을 가져온다.'
   */
  try {
    const randomUsers = await userService.getRandomUsers();
    return res.status(200).json({ message: '랜덤 유저', randomUsers });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const currentUser = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '나의 상세 정보'
   * #swagger.description = '나의 상세 정보를 가져온다.'
   */
  try {
    const userId = req.user.id;
    const currentUserInfo = await userService.getUserInfo(userId);
    return res.status(200).json({ message: '나의 상세 정보', currentUserInfo });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const friendRequest = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '친구 요청'
   * #swagger.description = '중복 요청 불가 '
   */
  try {
    const userId = req.user.id;
    const requestId = Number(req.params.id);

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
    return res.status(200).json({ message: '친구 요청 완료', request });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const friendRequestList = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '친구 요청 리스트'
   */
  try {
    const userId = req.user.id;
    const friendRequests = await userService.friendRequestList(userId);
    return res
      .status(200)
      .json({ message: '친구 요청 리스트', friendRequests });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const acceptFriend = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '친구 수락'
   */
  try {
    const userId = req.user.id;
    const requestId = Number(req.params.id);
    const accepted = await userService.acceptFriend(userId, requestId);
    return res.status(200).json({ message: '친구 수락', accepted });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const rejectFriend = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '친구 거절'
   */
  try {
    const userId = req.user.id;
    const requestId = Number(req.params.id);
    const rejected = await userService.rejectFriend(userId, requestId);
    return res.status(200).json({ message: '친구 거절', rejected });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getMyFriends = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '나의 친구 목록'
   * #swagger.description = 'page, limit을 query로 받아서 페이징 처리'
   */
  try {
    const page = req.query.page !== undefined ? Number(req.query.page) : null;
    const limit =
      req.query.limit !== undefined ? Number(req.query.limit) : null;
    const userId = req.user.id;
    const friendsList = await userService.getMyFriends(userId, page, limit);
    return res.status(200).json({ message: '친구 목록', friendsList });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const deleteFriend = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '친구 삭제'
   */
  try {
    const userId = req.user.id;
    const friendId = Number(req.params.id);
    const deletedFriend = await userService.deleteFriend(userId, friendId);
    return res.status(204).json({ message: '친구 삭제', deletedFriend });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const myScoreNRank = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '나의 점수 / 랭킹'
   */
  try {
    const userId = req.user.id;
    const myCertPostCount = await userService.myScoreNRank(userId);
    const myScore = myCertPostCount * 353;
    const myRank = await ploService.getUserRank(userId);
    return res
      .status(200)
      .json({ message: '나의 점수 / 랭킹', data: { myScore, myRank } });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const friendsRecentPost = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '친구 최신 게시물'
   */
  try {
    const userId = req.user.id;
    const recentPost = await userService.friendsRecentPost(userId);
    return res.status(200).json({ message: '친구 최신 게시물', recentPost });
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

const getCertPostsByUserId = async (req, res, next) => {
  /**
   * #swagger.tags = ['User']
   * #swagger.summary = '유저의 인증 게시글'
   * #swagger.description = 'page, limit을 query로 받아서 페이징 처리'
   */
  try {
    const page = req.query.page !== undefined ? Number(req.query.page) : null;
    const limit =
      req.query.limit !== undefined ? Number(req.query.limit) : null;
    const userId = req.user.id;
    const certPosts = await userService.getCertPostsByUserId(
      userId,
      page,
      limit,
    );
    return res.status(200).json(certPosts);
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export default {
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

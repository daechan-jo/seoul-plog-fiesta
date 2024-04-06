import router from 'express';
import userController from './userController';
import authenticateJWT from '../../middlewares/authenticateJWT';

const userRoute = router();

/** @description 모든 유저 정보 */
userRoute.get('/users', userController.getAllUsers);

/** @description 랜덤 유저 */
userRoute.get('/user/random', userController.getRandomUsers);

/** @description 유저 찾기
 * @CHANGED authenticateJWT 인가 삭제 */
userRoute.get('/user/:name', userController.searchUsers);

/**
 * @description 유저 찾기(id)
 * @CHANGED authenticateJWT 인가 삭제 */
userRoute.get('/search/:id', userController.searchUserId);

/** @description 현재 사용자 */
userRoute.get('/user', authenticateJWT, userController.currentUser);

/** @description 친구 요청 */
userRoute.post('/req/:id', authenticateJWT, userController.friendRequest);

/**
 * @description 친구 요청 리스트 */

userRoute.get('/req/list', authenticateJWT, userController.friendRequestList);

/** @description 친구 수락 */
userRoute.post('/accept/:id', authenticateJWT, userController.acceptFriend);

/** @description 친구 거절 */
userRoute.delete('/reject/:id', authenticateJWT, userController.rejectFriend);

/** @description 친구 목록 */
userRoute.get('/friends', authenticateJWT, userController.getMyFriends);

/** @description 친구 삭제 */
userRoute.delete(
	'/user/drop/:id',
	authenticateJWT,
	userController.deleteFriend,
);

/** @description 나의 점수 /랭킹 */
userRoute.get('/count', authenticateJWT, userController.myScoreNRank);

/** @description 친구 최신 게시물 */
userRoute.get(
	'/user/list/info',
	authenticateJWT,
	userController.friendsRecentPost,
);

/** @description 나의 인증 게시글 리스트 */
userRoute.get(
	'/user/cert/list',
	authenticateJWT,
	userController.getCertPostsByUserId,
);

export default userRoute;

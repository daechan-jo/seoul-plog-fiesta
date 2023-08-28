import router from 'express';
import userController from '../controllers/userController';
import authenticateJWT from '../middlewares/authenticateJWT';
const userRouter = router();

/** @description 모든 유저 정보 */
userRouter.get('/users', userController.getAllUsers);

/** @description 랜덤 유저 */
userRouter.get('/user/random', userController.getRandomUsers);

/**
 * @description 유저 찾기
 * @CHANGED authenticateJWT 인가 삭제*/
userRouter.get('/user/:name', userController.searchUsers);

/**
 * @description 유저 찾기(id)
 * @CHANGED authenticateJWT 인가 삭제 */
userRouter.get('/search/:id', userController.searchUserId);

/** @description 현재 사용자 */
userRouter.get('/user', authenticateJWT, userController.currentUser);

/** @description 친구 요청 */
userRouter.post('/req/:id', authenticateJWT, userController.friendRequest);

/**
 * @description 친구 요청 리스트 */

userRouter.get('/req/list', authenticateJWT, userController.friendRequestList);

/** @description 친구 수락 */
userRouter.post('/accept/:id', authenticateJWT, userController.acceptFriend);

/** @description 친구 거절 */
userRouter.delete('/reject/:id', authenticateJWT, userController.rejectFriend);

/** @description 친구 목록 */
userRouter.get('/friends', authenticateJWT, userController.getMyFriends);

/** @description 친구 삭제 */
userRouter.delete(
	'/user/drop/:id',
	authenticateJWT,
	userController.deleteFriend,
);

/** @description 나의 인증 */
userRouter.get('/user/count', authenticateJWT, userController.myCertPost);

/** @description 친구 최신 게시물 */
userRouter.get(
	'/user/list/info',
	authenticateJWT,
	userController.friendsRecentPost,
);

/** @description 나의 인증 게시글 리스트 */
userRouter.get(
	'/user/cert/list',
	authenticateJWT,
	userController.getCertPostsByUserId,
);

module.exports = userRouter;

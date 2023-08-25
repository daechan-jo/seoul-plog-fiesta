import router from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import ploController from '../controllers/ploController';
const ploRouter = router();

/** @description 인증게시글 작성 */
ploRouter.post('/plo/post', authenticateJWT, ploController.postPlo);

/** @description 모든 인증 게시글 */
ploRouter.get('/plo/post', ploController.getAllCertPosts);

/** @description 특정 인증 게시글 */
ploRouter.get('/plo/post/:postid', ploController.getCertPost);

/** @description 인증 게시글 수정 */
ploRouter.put(
	'/plo/post/:postid',
	authenticateJWT,
	ploController.updateCertPost,
);

/** @description 인증 게시글 삭제 */
ploRouter.delete(
	'/plo/post/:postid',
	authenticateJWT,
	ploController.deleteCertPost,
);

/** @description top5 인증 게시글 */
ploRouter.get('/plo/five', ploController.getTopCertPostContributors);

/** @description top100 인증 게시글 */
ploRouter.get('/plo/hundred', ploController.getTopUsers);

/** @description 유저 순위 */
ploRouter.get('/plo/rank/user', authenticateJWT, ploController.getUserRank);

/** @description 그룹 순위 */
ploRouter.get('/plo/rank/:groupname', ploController.getGroupRank);

module.exports = ploRouter;

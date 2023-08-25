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
ploRouter.get('/plo/topfive', ploController.getTopCertPostContributors);

module.exports = ploRouter;

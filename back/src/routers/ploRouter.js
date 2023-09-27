import router from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import ploController from '../controllers/ploController';
import ploValidate from '../middlewares/validates/ploValidate';

const ploRouter = router();

/** @description 인증게시글 작성 */
ploRouter.post(
  '/plo/post',
  authenticateJWT,
  ploValidate.validateCertCreation,
  ploController.createCertPost,
);

/** @description 모든 인증 게시글 */
ploRouter.get('/plo/post', ploController.getAllCertPosts);

/** @description 특정 인증 게시글 */
ploRouter.get('/plo/post/:postid', ploController.getCertPost);

/** @description 인증 게시글 수정 */
ploRouter.put(
  '/plo/post/:postid',
  authenticateJWT,
  ploValidate.validateCertUpdateCreation,
  ploController.updateCertPost,
);

/** @description 인증 게시글 삭제 */
ploRouter.delete(
  '/plo/post/:postid',
  authenticateJWT,
  ploController.deleteCertPost,
);

/** @description 메인화면 top5 유저 */
ploRouter.get('/plo/main/five', ploController.getTopMainCertPostContributors);

/** @description top5 유저, 그룹 */
ploRouter.get('/plo/five', ploController.getTopCertPostContributors);

/** @description top100 유저 */
ploRouter.get('/plo/hundred', ploController.getTopUsers);

/** @description 유저 순위 */
ploRouter.get('/plo/rank/user', authenticateJWT, ploController.getUserRank);

/** @description 그룹 순위 */
ploRouter.get('/plo/rank/:groupname', ploController.getGroupRank);

ploRouter.get(
  '/plo/count/user/:userid',
  ploController.getUserCertPostsRegionCount,
);

ploRouter.get(
  '/plo/count/group/:groupname',
  ploController.getGroupCertPostsRegionCount,
);

ploRouter.get('/plo/count/all', ploController.getAllCertPostsRegionCount);

export default ploRouter;

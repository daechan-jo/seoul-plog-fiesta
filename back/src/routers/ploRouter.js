import router from 'express';
import authenticateJWT from '../middlewares/authenticateJWT';
import ploController from '../controllers/ploController';
const ploRouter = router();

ploRouter.post('/plo/post', authenticateJWT, ploController.postPlo);

ploRouter.get('/plo/post', ploController.getAllCertPosts);

ploRouter.get('/plo/post/:postid', ploController.getCertPost);

ploRouter.put(
	'/plo/post/:postid',
	authenticateJWT,
	ploController.updateCertPost,
);

module.exports = ploRouter;

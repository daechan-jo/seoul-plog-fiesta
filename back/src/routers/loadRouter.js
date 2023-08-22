import router from 'express';
import * as path from 'path';
const loadRouter = router();
import express from 'express';
import loadController from '../controllers/loadController';

loadRouter.get(
	'/profileimg/:userid',
	express.static(path.join(__dirname, 'upload')),
	loadController.loadProfileImage,
);

loadRouter.get(
	'/postimg/:postid',
	express.static(path.join(__dirname, 'upload')),
	loadController.loadPostImage,
);

loadRouter.get(
	'/groupimg/:groupid',
	express.static(path.join(__dirname, 'upload')),
	loadController.loadGroupImage,
);

module.exports = loadRouter;

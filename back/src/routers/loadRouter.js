import router from 'express';
// import * as path from 'path';
const loadRouter = router();
// import express from 'express';
import loadController from '../controllers/loadController';

loadRouter.get('/profileimg/:userid', loadController.loadProfileImage);

loadRouter.get('/postimg/:postid', loadController.loadPostImage);

loadRouter.get('/groupimg/:groupid', loadController.loadGroupImage);

loadRouter.get('/certimg/:certid', loadController.loadCertPostImage);

module.exports = loadRouter;

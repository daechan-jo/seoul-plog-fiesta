import ploService from '../services/ploService.js';

const postPlo = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const certPostData = req.body;
		const createdCertPost = await ploService.createCertPost(
			userId,
			certPostData,
		);
		res.status(201).json(createdCertPost);
	} catch (error) {
		console.error(error);
		res.status(500);
		next(error);
	}
};

const getAllCertPosts = async (req, res, next) => {
	try {
		const certPosts = await ploService.getAllCertPosts();
		res.status(200).json(certPosts);
	} catch (error) {
		console.error(error);
		res.status(500);
		next(error);
	}
};

module.exports = { postPlo, getAllCertPosts };

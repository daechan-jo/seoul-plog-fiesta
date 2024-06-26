import ploService from './ploService';

const createCertPost = async (req, res, next) => {
	try {
		/**
		 * #swagger.tags = ['Plo']
		 * #swagger.summary = '인증 게시글 작성'
		 */
		const userId = req.user.id;
		const certPostData = req.body;
		const createdCertPost = await ploService.createCertPost(
			userId,
			certPostData,
		);
		return res.status(201).json(createdCertPost);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getAllCertPosts = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '인증 게시글 조회'
	 * #swagger.description = '모든 인증 게시글 조회 / 서버사이드 페이지네이션'
	 */
	try {
		const page = req.query.page !== undefined ? Number(req.query.page) : null;
		const limit =
			req.query.limit !== undefined ? Number(req.query.limit) : null;
		const certPosts = await ploService.getAllCertPosts(page, limit);
		return res.status(200).json(certPosts);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getCertPost = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '인증 게시글 상세 조회'
	 */
	try {
		const certPostId = Number(req.params.postid);
		const detailedCertPost = await ploService.getCertPostDetails(certPostId);
		return res.status(200).json(detailedCertPost);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const updateCertPost = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '인증 게시글 수정'
	 * #swagger.description = '작성자 권한'
	 */
	try {
		const certPostId = Number(req.params.postid);
		const certPostData = req.body;
		const updatedCertPost = await ploService.updateCertPost(
			certPostId,
			certPostData,
		);
		return res.status(201).json(updatedCertPost);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const deleteCertPost = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '인증 게시글 삭제'
	 * #swagger.description = '작성자 권한'
	 */
	try {
		const userId = req.user.id;
		const certPostId = Number(req.params.postid);
		const certPost = await ploService.getCertPostDetails(certPostId);
		if (!certPost || certPost.writerId !== userId)
			return res.status(403).json({ message: '권한이 없음' });

		await ploService.deleteCertPostImages(certPostId);
		await ploService.deleteCertPost(certPostId);

		return res.status(204).json({ message: '삭제 완료' });
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getTopMainCertPostContributors = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = 'intro 페이지 top5 유저'
	 */
	try {
		const topUsers = await ploService.getTopMainCertPostContributors();
		return res.status(200).json(topUsers);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getTopCertPostContributors = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = 'top5 유저, 그룹'
	 */
	try {
		const topUsers = await ploService.getTopCertPostContributorsUsers();
		const topGroups = await ploService.getTopCertPostContributorsGroups();
		return res.status(200).json({ topUsers, topGroups });
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getTopUsers = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = 'top100 유저'
	 */
	try {
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const topUsers = await ploService.getTopUsers(page, limit);
		return res.status(200).json(topUsers);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getUserRank = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '유저 순위'
	 */
	try {
		const userId = req.user.id ? Number(req.query.id) : req.user.id;
		const rank = await ploService.getUserRank(userId);
		return res.status(200).json(rank);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getGroupRank = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '그룹 순위'
	 */
	try {
		const groupName = req.params.groupname;
		const groupRank = await ploService.getGroupRank(groupName);
		return res.status(200).json(groupRank);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getUserCertPostsRegionCount = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '유저 인증 게시글 지역별 개수'
	 * #swagger.description = '지도 시각화 데이터'
	 */
	try {
		const userId = Number(req.params.userid);
		const regionCount = await ploService.getUserCertPostsRegionCount(userId);
		return res.status(200).json(regionCount);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getGroupCertPostsRegionCount = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '그룹 인증 게시글 지역별 개수'
	 * #swagger.description = '지도 시각화 데이터'
	 */
	try {
		const groupName = req.params.groupname;
		const regionCount = await ploService.getGroupCertPostsRegionCount(
			groupName,
		);
		return res.json(regionCount);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getAllCertPostsRegionCount = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Plo']
	 * #swagger.summary = '전체 인증 게시글 지역별 개수'
	 * #swagger.description = '지도 시각화 데이터'
	 */
	try {
		const regions = await ploService.getAllCertPostsRegions();
		return res.json(regions);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

export default {
	createCertPost,
	getAllCertPosts,
	getCertPost,
	updateCertPost,
	deleteCertPost,
	getTopCertPostContributors,
	getTopUsers,
	getUserRank,
	getGroupRank,
	getUserCertPostsRegionCount,
	getGroupCertPostsRegionCount,
	getAllCertPostsRegionCount,
	getTopMainCertPostContributors,
};

import ploService from '../services/ploService.js';

const postPlo = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const certPostData = req.body;
    const createdCertPost = await ploService.createCertPost(
      userId,
      certPostData,
    );
    return res.status(201).json(createdCertPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllCertPosts = async (req, res, next) => {
  try {
    const page = req.query.page !== undefined ? parseInt(req.query.page) : null;
    const limit =
      req.query.limit !== undefined ? parseInt(req.query.limit) : null;
    const certPosts = await ploService.getAllCertPosts(page, limit);
    return res.status(200).json(certPosts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getCertPost = async (req, res, next) => {
  try {
    const certPostId = parseInt(req.params.postid);
    const detailedCertPost = await ploService.getCertPostDetails(certPostId);
    return res.status(200).json(detailedCertPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateCertPost = async (req, res, next) => {
  try {
    const certPostId = parseInt(req.params.postid); // Assuming the ID is passed as a parameter
    const certPostData = req.body;
    const updatedCertPost = await ploService.updateCertPost(
      certPostId,
      certPostData,
    );
    return res.status(201).json(updatedCertPost);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteCertPost = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const certPostId = parseInt(req.params.postid);
    const certPost = await ploService.getCertPostDetails(certPostId);
    if (!certPost || certPost.writerId !== userId)
      return res.status(403).json({ message: '권한이 없음' });

    await Promise.all([
      ploService.deleteCertPostImages(certPostId),
      ploService.deleteCertPostParticipants(certPostId),
      ploService.deleteCertPost(certPostId),
    ]);
    return res.status(204).json({ message: '삭제 완료' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTopMainCertPostContributors = async (req, res, next) => {
  try {
    const topUsers = await ploService.getTopMainCertPostContributors();
    return res.status(200).json(topUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTopCertPostContributors = async (req, res, next) => {
  try {
    const topUsers = await ploService.getTopCertPostContributorsUsers();
    const topGroups = await ploService.getTopCertPostContributorsGroups();

    return res.status(200).json({ topUsers, topGroups });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getTopUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || null;
    const limit = parseInt(req.query.limit) || null;
    const topUsers = await ploService.getTopUsers(page, limit);
    return res.status(200).json(topUsers);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUserRank = async (req, res, next) => {
  try {
    const userId = req.user.id ? Number(req.query.id) : req.user.id;
    const rank = await ploService.getUserRank(userId);
    return res.status(200).json(rank);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getGroupRank = async (req, res, next) => {
  try {
    const groupName = req.params.groupname;
    const groupRank = await ploService.getGroupRank(groupName);
    return res.status(200).json(groupRank);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getUserCertPostsRegionCount = async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userid);
    const regionCount = await ploService.getUserCertPostsRegionCount(userId);
    return res.status(200).json(regionCount);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getGroupCertPostsRegionCount = async (req, res, next) => {
  try {
    const groupName = req.params.groupname;
    const regionCount = await ploService.getGroupCertPostsRegionCount(
      groupName,
    );
    return res.json(regionCount);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getAllCertPostsRegionCount = async (req, res, next) => {
  try {
    const regions = await ploService.getAllCertPostsRegions();
    return res.json(regions);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = {
  postPlo,
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

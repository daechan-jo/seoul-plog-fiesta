import groupService from "../services/groupService.js";
import commentService from "../services/commentService.js";
import imageService from "../services/imageService.js";
const groupUtils = require("../utils/groupUtils");

/** @description 그룹 생성 */
const createGroup = async (req, res, next) => {
	const groupData = req.body;
	const managerId = req.user.id;
	try {
		const group = await groupService.createGroup(groupData, managerId);
		res.status(201).json(group);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 전체 리스트 */
const getAllGroups = async (req, res, next) => {
	try {
		const groups = await groupService.getALlGroups();
		res.status(200).json(groups);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 상세 정보 */
const getGroupDetails = async (req, res, next) => {
	const groupId = parseInt(req.params.groupid);
	try {
		const group = await groupService.getGroupDetails(groupId);
		if (!group) return res.status(404).json({ message: "그룹 없음" });
		res.status(200).json(group);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 가입 신청 */
const requestToJoinGroup = async (req, res, next) => {
	const userId = req.user.id;
	const groupId = parseInt(req.params.groupid);
	try {
		const group = await groupService.getGroupDetails(groupId);
		if (!group) return res.status(404).json({ message: "그룹 없음" });

		const isMember = await groupService.isUserGroupMember(userId, groupId);
		if (isMember)
			return res.status(400).json({ message: "이미 가입된 그룹" });

		await groupService.requestToJoinGroup(userId, groupId);
		res.status(200).json({ message: "그룹 가입 신청 완료" });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 가입 신청 목록 */
const getGroupJoinRequests = async (req, res, next) => {
	const managerId = req.user.id;
	try {
		const groupJoinRequests = await groupService.getGroupJoinRequests(
			managerId,
		);
		res.status(200).json(groupJoinRequests);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 가입 신청 승인 */
const acceptRegistration = async (req, res, next) => {
	const managerId = req.user.id;
	const groupId = parseInt(req.params.groupid);
	const userId = parseInt(req.params.userid);
	try {
		const acceptedRequest = await groupService.acceptRegistration(
			managerId,
			groupId,
			userId,
		);
		// await groupService.acceptRegistration(groupId, userId);

		res.status(200).json(acceptedRequest);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 가입 신청 거절 */
const rejectGroupJoinRequest = async (req, res, next) => {
	const userId = parseInt(req.params.userid);
	const groupId = parseInt(req.params.groupid);
	// const { userId, groupId } = parseInt(req.params);
	const managerId = req.user.id;
	try {
		const success = await groupService.rejectGroupJoinRequest(
			managerId,
			userId,
			groupId,
		);
		if (success) {
			res.status(200).json({ message: "그룹 가입 거절" });
		} else {
			res.status(400).json({ message: "그룹 가입 거절 실패" });
		}
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 나의 그룹 리스트 */
const getMyGroups = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const groups = await groupService.getMyGroups(userId);
		res.status(200).json(groups);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 작성 */
const createPost = async (req, res, next) => {
	const userId = req.user.id;
	const groupId = parseInt(req.params.groupid);
	const { title, content, isNotice } = req.body;
	try {
		const post = await groupService.createPost(
			userId,
			groupId,
			title,
			content,
			isNotice,
		);
		res.status(201).json(post);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 소속 그룹 최신 인증글 리스트 */
const getRecentPosts = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const posts = await groupService.getRecentPosts(userId);
		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 전체 리스트 */
const getAllPosts = async (req, res, next) => {
	const groupId = parseInt(req.params.groupid);
	try {
		const posts = await groupService.getAllPosts(groupId);
		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 상세 정보 */
const getPostById = async (req, res, next) => {
	const postId = parseInt(req.params.postid);
	try {
		const post = await groupService.getPostById(postId);
		if (!post) return res.status(404).json({ message: "게시글 없음" });
		res.status(200).json(post);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 수정 */
const editPost = async (req, res, next) => {
	const postId = parseInt(req.params.postid);
	const userId = req.user.id;
	const postData = req.body;
	try {
		const updatedPost = await groupService.editPost(
			postId,
			userId,
			postData,
		);
		res.status(200).json(updatedPost);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 삭제 */
const deletePost = async (req, res, next) => {
	const postId = parseInt(req.params.postid);
	const userId = req.user.id;

	try {
		const post = await groupService.getPostById(postId);
		if (!post) return res.status(404).json({ message: "게시글 없음" });
		if (post.writerId !== userId) {
			const groupUser = await groupService.getGroupUserByUserIdAndGroupId(
				userId,
				post.groupId,
			);
			if (!(groupUser && groupUser.isAdmin))
				return res.status(403).json({ message: "권한 없음" });
		}
		//todo promise.all 을 사용할 수 있지 않을까?
		await commentService.deleteCommentsByPostId(postId);
		await imageService.deleteImagesByPostId(postId);
		await groupService.deletePost(postId, userId);
		res.status(200).json({ message: `게시글 삭제 : ${postId}` });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 탈퇴 */
const leaveGroup = async (req, res, next) => {
	const userId = req.user.id;
	const groupId = parseInt(req.params.groupid);

	try {
		const isMember = await groupUtils.isUserGroupMember(userId, groupId);
		if (!isMember)
			return res.status(400).json({ message: "가입되지 않은 그룹" });

		await groupService.leaveGroup(userId, groupId);
		res.status(200).json({ message: `그룹 탈퇴 : ${groupId}` });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹원 강퇴 */
const removeGroupMember = async (req, res, next) => {
	const managerId = req.user.id;
	const groupId = parseInt(req.params.groupid);
	const userId = parseInt(req.params.userid);

	try {
		if (!(await groupService.isUserGroupAdmin(managerId, groupId)))
			return res.status(403).json({ message: "권한 없음" });

		const isRemoved = await groupService.removeGroupMember(userId, groupId);
		if (isRemoved) {
			res.status(200).json({ message: `그룹원 강퇴 : ${userId}` });
		} else {
			res.status(404).json({ message: "그룹원 없음" });
		}
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 그룹 폭⭐파️ */
const dropGroup = async (req, res, next) => {
	const managerId = req.user.id;
	const groupId = parseInt(req.params.groupid);

	try {
		if (!(await groupUtils.isUserGroupAdmin(managerId, groupId)))
			return res.status(403).json({ message: "권한 없음" });

		const isDeleted = await groupService.dropGroup(groupId);
		if (isDeleted) {
			res.status(200).json({ message: `그룹 삭제 : ${groupId}` });
		} else {
			res.status(404).json({ message: "그룹 없음" });
		}
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = {
	createGroup,
	getAllGroups,
	getGroupDetails,
	requestToJoinGroup,
	acceptRegistration,
	rejectGroupJoinRequest,
	getMyGroups,
	createPost,
	getAllPosts,
	getPostById,
	editPost,
	deletePost,
	leaveGroup,
	removeGroupMember,
	dropGroup,
	getGroupJoinRequests,
	getRecentPosts,
};

import groupService from '../services/groupService.js';
import commentService from '../services/commentService.js';
import imageService from '../services/imageService.js';
const groupUtils = require('../utils/groupUtils');

const createGroup = async (req, res, next) => {
	try {
		const groupData = req.body;
		const managerId = req.user.id;

		const group = await groupService.createGroup(groupData, managerId);
		console.log(group);
		res.status(201).json(group);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getAllGroups = async (req, res, next) => {
	try {
		const groups = await groupService.getAllGroups();
		console.log(groups);
		res.status(200).json(groups);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getGroupDetails = async (req, res, next) => {
	try {
		const groupId = parseInt(req.params.groupid);
		const group = await groupService.getGroupDetails(groupId);
		if (!group) return res.status(404).json({ message: '그룹 없음' });
		console.log(group);
		res.status(200).json(group);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const requestToJoinGroup = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const groupId = parseInt(req.params.groupid);

		const group = await groupService.getGroupDetails(groupId);
		if (!group) return res.status(404).json({ message: '그룹 없음' });

		const isMember = await groupService.isUserGroupMember(userId, groupId);
		if (isMember)
			return res
				.status(400)
				.json({ message: '이미 가입된 그룹 또는 가입 신청한 그룹' });

		await groupService.requestToJoinGroup(userId, groupId);
		console.log('그룹 가입 신청 성공');
		res.status(200).json('그룹 가입 신청 성공');
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getGroupJoinRequests = async (req, res, next) => {
	try {
		const managerId = req.user.id;
		const groupJoinRequests = await groupService.getGroupJoinRequests(
			managerId,
		);
		console.log(groupJoinRequests);
		res.status(200).json(groupJoinRequests);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const acceptRegistration = async (req, res, next) => {
	try {
		const managerId = req.user.id;
		const groupId = parseInt(req.params.groupid);
		const userId = parseInt(req.params.userid);
		const acceptedRequest = await groupService.acceptRegistration(
			managerId,
			groupId,
			userId,
		);
		console.log(acceptedRequest);
		res.status(200).json(acceptedRequest);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getGroupJoinRequestsByGroupId = async (req, res, next) => {
	try {
		const groupId = parseInt(req.params.groupid);
		const managerId = req.user.id;
		const groupJoinRequests = await groupService.getGroupJoinRequestsByGroupId(
			groupId,
			managerId,
		);
		if (!groupJoinRequests) {
			return res.status(403).json({ message: '권한 없음' });
		}
		console.log(groupJoinRequests);
		res.status(200).json(groupJoinRequests);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const rejectGroupJoinRequest = async (req, res, next) => {
	try {
		const userId = parseInt(req.params.userid);
		const groupId = parseInt(req.params.groupid);
		const managerId = req.user.id;

		const success = await groupService.rejectGroupJoinRequest(
			managerId,
			groupId,
			userId,
		);
		if (success) {
			console.log(success);
			res.status(200).json({ message: '그룹 가입 거절' });
		} else {
			res.status(400).json({ message: '그룹 가입 거절 실패' });
		}
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getMyGroups = async (req, res, next) => {
	try {
		const userId = req.user.id;

		const groups = await groupService.getMyGroups(userId);

		console.log(groups);
		res.status(200).json(groups);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const createPost = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const groupId = parseInt(req.params.groupid);
		const { title, content, isNotice } = req.body;

		const post = await groupService.createPost(
			userId,
			groupId,
			title,
			content,
			isNotice,
		);
		console.log(post);
		res.status(201).json(post);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getRecentPosts = async (req, res, next) => {
	try {
		const userId = req.user.id;

		const posts = await groupService.getRecentPosts(userId);
		console.log(posts);
		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getAllPosts = async (req, res, next) => {
	try {
		const groupId = parseInt(req.params.groupid);

		const posts = await groupService.getAllPosts(groupId);
		console.log(posts);
		res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const getPostById = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.postid);
		const post = await groupService.getPostById(postId);
		if (!post) return res.status(404).json({ message: '게시글 없음' });
		console.log(post);
		res.status(200).json(post);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const editPost = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.postid);
		const userId = req.user.id;
		const postData = req.body;
		const updatedPost = await groupService.editPost(postId, userId, postData);
		console.log(updatedPost);
		res.status(200).json(updatedPost);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const deletePost = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.postid);
		const userId = req.user.id;
		const post = await groupService.getPostById(postId);
		if (!post) return res.status(404).json({ message: '게시글 없음' });
		if (post.writerId !== userId) {
			const groupUser = await groupService.getGroupUserByUserIdAndGroupId(
				userId,
				post.groupId,
			);
			if (!(groupUser && groupUser.isAdmin))
				return res.status(403).json({ message: '권한 없음' });
		}
		await Promise.all([
			commentService.deleteCommentsByPostId(postId),
			imageService.deleteImagesByPostId(postId),
			groupService.deletePost(postId, userId),
		]);
		console.log('게시글 삭제 성공');
		res.status(202).json({ message: `게시글 삭제 : ${postId}` });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const leaveGroup = async (req, res, next) => {
	const userId = req.user.id;
	const groupId = parseInt(req.params.groupid);

	try {
		const isMember = await groupUtils.isUserGroupMember(userId, groupId);
		console.log(isMember);
		if (!isMember)
			return res.status(400).json({ message: '가입되지 않은 그룹' });
		if (isMember.isAdmin === true)
			return res.status(400).json({ message: '관리자는 탈퇴할 수 없음' });
		await groupService.leaveGroup(userId, groupId);
		console.log('그룹 탈퇴 성공');
		res.status(200).json({ message: `그룹 탈퇴 : ${groupId}` });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const removeGroupMember = async (req, res, next) => {
	try {
		const managerId = req.user.id;
		const groupId = parseInt(req.params.groupid);
		const userId = parseInt(req.params.userid);

		if (!(await groupService.isUserGroupAdmin(managerId, groupId)))
			return res.status(403).json({ message: '권한 없음' });

		const isRemoved = await groupService.removeGroupMember(userId, groupId);
		if (isRemoved) {
			console.log(isRemoved);
			res.status(200).json({ message: `그룹원 추방 : ${userId}` });
		} else {
			res.status(404).json({ message: '그룹원 없음' });
		}
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const dropGroup = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const groupId = parseInt(req.params.groupid);
		await groupService.dropGroup(groupId, userId);
		console.log('그룹 폭⭐파️');
		res.status(200).json({ message: '삭제 완료' });
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
	getGroupJoinRequestsByGroupId,
};

import groupService from "../services/groupService.js";
const groupUtils = require("../utils/groupUtils");

/** @description 그룹 생성 */
const createGroup = async (req, res, next) => {
	const groupData = req.body; // passport 완성되면 그냥 user에서 추출해도...
	try {
		const group = await groupService.createGroup(groupData);
		res.status(201).json({ message: "그룹 생성", group });
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
		res.status(200).json({ message: "그룹 전체 리스트", groups });
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
	const userId = req.user.id; // pasport에서 user를 req에 넣어줌. 아직 미구현
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

/** @description 그룹 가입 신청 승인 */
const approveRegistration = async (req, res, next) => {
	const groupId = parseInt(req.params.groupid);
	const userId = parseInt(req.params.userid);
	try {
		await groupService.approveRegistration(groupId, userId);

		res.status(200).json({ message: "그룹 가입 승인 완료" });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 나의 그룹 리스트 */
const getUserGroups = async (req, res, next) => {
	const userId = req.user.id;
	try {
		const groups = await groupService.getUserGroups(userId);
		res.status(200).json({ message: "나의 그룹 리스트", groups });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 랜덤 그룹 리스트 */
const getRandomGroups = async (req, res, next) => {
	try {
		const randomGroups = await groupService.getRandomGroups();
		res.status(200).json({ message: "랜덤 그룹 리스트", randomGroups });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 제공된 문자열이 포함된 모든 그룹 */
const searchGroupsByName = async (req, res, next) => {
	const groupName = req.params.groupname;
	try {
		const groups = await groupService.searchGroupsByName(groupName);
		res.status(200).json({ message: "그룹 검색 결과", groups });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 작성 */
const createPost = async (req, res, next) => {
	const postData = req.body;
	try {
		const post = await groupService.createPost(postData, req.user);
		res.status(201).json({ message: "게시글 작성", post });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 댓글 작성 */
const createComment = async (req, res, next) => {
	const commentData = req.body;
	try {
		const comment = await groupService.createComment(commentData, req.user);
		res.status(201).json({ message: "댓글 작성", comment });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 전체 리스트 */
const getAllPosts = async (req, res, next) => {
	try {
		const posts = await groupService.getAllPosts();
		res.status(200).json({ message: "게시글 리스트", posts });
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
		res.status(200).json({ message: "게시글 상세 정보", post });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 게시글 수정 */
const editPost = async (req, res, next) => {
	const postId = parseInt(req.params.postid);
	const postData = req.body;
	try {
		const updatedPost = await groupService.editPost(postId, postData);
		res.status(200).json({ message: "게시글 수정", post: updatedPost });
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
		await groupService.deletePost(postId, userId);
		res.status(200).json({ message: `게시글 삭제 : ${postId}` });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 댓글 수정 */
const editComment = async (req, res, next) => {
	const userId = req.user.id;
	const commentId = parseInt(req.params.commentid);
	const { content } = req.body;
	try {
		const comment = await groupService.getCommentDetails(commntId);
		if (!comment) return res.status(404).json({ message: "댓글 없음" });

		const isCommenter = comment.writerId === userId;
		if (!isCommenter)
			return res.status(400).json({ message: "댓글 작성자만 수정 가능" });

		const updatedComment = await groupService.deditComment(
			commentId,
			content,
		);
		res.status(200).json({ message: "댓글 수정", comment: updatedComment });
	} catch (error) {}
};

/** @description 댓글 삭제 */
const deleteComment = async (req, res, next) => {
	const userId = req.user.id;
	const commentId = parseInt(req.params.commentid);

	try {
		const comment = await groupService.getCommentDetails(commentId);
		if (!comment) return res.status(404).json({ message: "댓글 없음" });

		const isCommenter = comment.writerId === userId;
		const isGroupAdmin = await groupUtils.isUserGroupMember(
			userId,
			comment.post.groupId,
		);
		if (!isCommenter && !isGroupAdmin)
			return res.status(400).json({ message: "권한 없음" });

		await groupService.deleteComment(commentId);
		res.status(200).json({ message: `댓글 삭제 : ${commentId}` });
	} catch (error) {}
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
	approveRegistration,
	getUserGroups,
	getRandomGroups,
	searchGroupsByName,
	createPost,
	createComment,
	getAllPosts,
	getPostById,
	editPost,
	deletePost,
	editComment,
	deleteComment,
	leaveGroup,
	removeGroupMember,
	dropGroup,
};

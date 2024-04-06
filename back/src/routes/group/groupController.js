import groupService from './groupService';
import groupUtils from '../../utils/groupUtils';
import localService from '../../services/localService';

const createGroup = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 생성'
	 * #swagger.description = '1인당 5개 생성 제한 / 그룹 이름 중복 불가'
	 */
	try {
		const groupData = req.body;
		const managerId = req.user.id;

		const group = await groupService.createGroup(groupData, managerId);
		return res.status(201).json(group);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getAllGroups = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '모든 그룹 조회'
	 * #swagger.description = '서버사이드 페이지네이션'
	 */
	try {
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const groups = await groupService.getAllGroups(page, limit);
		return res.status(200).json(groups);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getGroupDetails = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 상세 조회'
	 */
	try {
		const groupId = Number(req.params.groupid);
		const group = await groupService.getGroupDetails(groupId);
		if (!group) return res.status(404).json({ message: '그룹 없음' });
		return res.status(200).json(group);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const requestToJoinGroup = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 가입 신청'
	 * #swagger.description = 'GroupUser 테이블에 isMember = false로 생성'
	 */
	try {
		const userId = req.user.id;
		const groupId = Number(req.params.groupid);

		const { group, membership } = await groupService.getGroupAndMembership(
			userId,
			groupId,
		);
		if (!group)
			return res.status(404).json({ message: '그룹을 찾을 수 없습니다.' });
		if (membership)
			return res
				.status(400)
				.json({ message: '이미 가입된 그룹 또는 가입 신청한 그룹' });

		await groupService.requestToJoinGroup(userId, groupId);
		return res.status(200).json('그룹 가입 신청 성공');
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getGroupJoinRequests = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 가입 신청 목록'
	 * #swagger.description = '그룹 생성자 권한'
	 */
	try {
		const managerId = req.user.id;
		const groupJoinRequests = await groupService.getGroupJoinRequests(
			managerId,
		);
		return res.status(200).json(groupJoinRequests);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const acceptRegistration = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 가입 신청 수락'
	 * #swagger.description = '그룹 생성자 권한'
	 */
	try {
		const managerId = req.user.id;
		const groupId = Number(req.params.groupid);
		const userId = Number(req.params.userid);
		const acceptedRequest = await groupService.acceptRegistration(
			managerId,
			groupId,
			userId,
		);
		return res.status(200).json(acceptedRequest);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getGroupJoinRequestsByGroupId = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '해당 그룹 가입 신청 목록'
	 * #swagger.description = '그룹 생성자 권한'
	 */
	try {
		const groupId = Number(req.params.groupid);
		const managerId = req.user.id;
		const groupJoinRequests = await groupService.getGroupJoinRequestsByGroupId(
			groupId,
			managerId,
		);
		if (!groupJoinRequests) {
			return res.status(403).json({ message: '권한 없음' });
		}
		return res.status(200).json(groupJoinRequests);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const rejectGroupJoinRequest = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 가입 신청 거절'
	 * #swagger.description = '그룹 생성자 권한'
	 */
	try {
		const userId = Number(req.params.userid);
		const groupId = Number(req.params.groupid);
		const managerId = req.user.id;

		const success = await groupService.rejectGroupJoinRequest(
			managerId,
			groupId,
			userId,
		);
		return success
			? res.status(200).json({ message: '그룹 가입 거절' })
			: res.status(404).json({ message: '가입 신청 없음' });
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getMyGroups = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '사용자 소속 그룹 목록'
	 * #swagger.description = '서버사이드 페이지네이션'
	 */
	try {
		const userId = req.user.id;
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const groups = await groupService.getMyGroups(userId, page, limit);
		return res.status(200).json(groups);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getGroupMembers = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '해당 그룹원 닉네임 배열 반환'
	 */
	try {
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const groupName = req.params.groupname;
		const userId = req.user.id;
		const members = await groupService.getGroupMembers(
			groupName,
			userId,
			page,
			limit,
		);
		return res.status(200).json(members);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const createPost = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 게시글 작성'
	 * #swagger.description = 'isNotice는 기본값 false / true 라면 공지글'
	 */
	try {
		const userId = req.user.id;
		const groupId = Number(req.params.groupid);
		const { title, content } = req.body;
		const isNotice =
			req.body.isNotice !== undefined ? req.body.isNotice : false;

		const post = await groupService.createPost(
			userId,
			groupId,
			title,
			content,
			isNotice,
		);
		return res.status(201).json(post);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getRecentPosts = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '사용자 소속 그룹 최신 게시글 목록'
	 * #swagger.description = '서버사이드 페이지네이션'
	 */
	try {
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const userId = req.user.id;
		const posts = await groupService.getRecentPosts(userId, page, limit);
		return res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getAllPosts = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '해당 그룹 모든 게시글 목록'
	 * #swagger.description = '서버사이드 페이지네이션'
	 */
	try {
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const groupId = Number(req.params.groupid);

		const posts = await groupService.getAllPosts(groupId, page, limit);
		return res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getPostById = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 게시글 상세조회'
	 */
	try {
		const postId = Number(req.params.postid);
		const post = await groupService.getPostById(postId);
		if (!post) return res.status(404).json({ message: '게시글 없음' });
		return res.status(200).json(post);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const editPost = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 게시글 수정'
	 * #swagger.description = '작성자 권한'
	 */
	try {
		const postId = Number(req.params.postid);
		const userId = req.user.id;
		const postData = req.body;
		const updatedPost = await groupService.editPost(postId, userId, postData);
		return res.status(201).json(updatedPost);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const deletePost = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 게시글 삭제'
	 * #swagger.description = '작성자 또는 관리자 권한'
	 */
	try {
		const postId = Number(req.params.postid);
		const userId = req.user.id;
		const post = await groupService.getPostById(postId);
		if (!post) return res.status(404).json({ message: '게시글 없음' });
		if (post.writerId !== userId) {
			const groupUser = await groupService.getGroupUserByUserIdAndGroupId(
				userId,
				post.groupId,
			);
			if (!groupUser?.isAdimin)
				return res.status(403).json({ message: '권한 없음' });
		}

		await groupService.deletePost(postId, userId);

		return res.status(204).json({ message: `게시글 삭제 : ${postId}` });
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const leaveGroup = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 탈퇴'
	 * #swagger.description = '사용자의 게시글 및 댓글은 유지 / 관리자는 탈퇴 불가'
	 */
	const userId = req.user.id;
	const groupId = Number(req.params.groupid);
	try {
		const isMember = await groupUtils.isUserGroupMember(userId, groupId);
		if (!isMember)
			return res.status(400).json({ message: '가입되지 않은 그룹' });
		if (isMember.isAdmin === true)
			return res.status(400).json({ message: '관리자는 탈퇴할 수 없음' });

		await groupService.leaveGroup(userId, groupId);
		return res.status(200).json({ message: `그룹 탈퇴 : ${groupId}` });
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const removeGroupMember = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 추방'
	 * #swagger.description = '해당 유저의 게시글 및 댓글 유지 / 관리자 권한'
	 */
	try {
		const managerId = req.user.id;
		const groupId = Number(req.params.groupid);
		const userId = Number(req.params.userid);

		if (!(await groupService.isUserGroupAdmin(managerId, groupId)))
			return res.status(403).json({ message: '권한 없음' });

		const isRemoved = await groupService.removeGroupMember(userId, groupId);
		if (isRemoved) {
			return res.status(200).json({ message: `그룹원 추방 : ${userId}` });
		}
		return res.status(404).json({ message: '그룹원 없음' });
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const dropGroup = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 삭제'
	 * #swagger.description = '관리자 권한 / 해당 그룹 관련 모든 데이터 삭제 및 그룹원 탈퇴 처리'
	 */
	try {
		const userId = req.user.id;
		const groupId = Number(req.params.groupid);
		const group = await groupService.getGroupDetails(groupId);
		if (!group || group.managerId !== userId)
			return res.status(403).json({ message: '권한 없음' });

		await localService.LocalStorageClearByDropGroup(groupId);
		await groupService.dropGroup(groupId);

		return res.status(204).json({ message: '삭제 완료' });
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getGroupCertPosts = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '소속 그룹 최신 인증글'
	 * #swagger.description = '서버사이드 페이지네이션'
	 */
	try {
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const userId = req.user.id;
		const posts = await groupService.getUserGroupCertPosts(userId, page, limit);
		return res.status(200).json(posts);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

const getCertPostsByGroupName = async (req, res, next) => {
	/**
	 * #swagger.tags = ['Group']
	 * #swagger.summary = '그룹 인증 게시글 상세조회'
	 * #swagger.description = '참여자 정보 포함 / 서버사이드 페이지네이션'
	 */
	try {
		const page = Number(req.query.page) || null;
		const limit = Number(req.query.limit) || null;
		const groupName = req.params.groupname;
		const certPostDetails = await groupService.getCertPostsByGroupName(
			groupName,
			page,
			limit,
		);
		return res.status(200).json(certPostDetails);
	} catch (error) {
		console.error(error);
		return next(error);
	}
};

export default {
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
	getGroupCertPosts,
	getGroupJoinRequestsByGroupId,
	getGroupMembers,
	getCertPostsByGroupName,
};

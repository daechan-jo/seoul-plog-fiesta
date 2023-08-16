import groupService from "../services/groupService.js";

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

module.exports = {
	createGroup,
	getAllGroups,
	getGroupDetails,
	requestToJoinGroup,
	approveRegistration,
	getUserGroups,
	getRandomGroups,
	searchGroupsByName,
};

import groupService from "../services/groupService.js";

/** @description 그룹 생성 */
const createGroup = async (req, res, next) => {
	const groupData = req.body;
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
	const groupId = parseInt(req.params.id);
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
	const userId = req.user.id; // pasport에서 user를 req에 넣어줌
	const groupId = parseInt(req.params.id);
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

module.exports = {
	createGroup,
	getAllGroups,
	getGroupDetails,
	requestToJoinGroup,
};

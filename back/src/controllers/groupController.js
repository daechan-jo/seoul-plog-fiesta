import groupService from "../services/groupService.js";

/** @description 그룹 생성 */
const createGroup = async (req, res, next) => {
	const { name, managerId, goal, region, introduction, memberLimit } =
		req.body;
	try {
		const group = await groupService.createGroup({
			name,
			managerId,
			goal,
			region,
			introduction,
			memberLimit,
		});
		res.status(201).json({ message: "그룹 생성 성공", group });
	} catch (error) {
		error.status = 500;
		error.message = "그룹 생성 실패";
		next(error);
	}
};

/** @description 그룹 전체 리스트 */
const getAllGroups = async (req, res, next) => {
	try {
		const groups = await groupService.getALlGroups();
		res.status(200).json({ message: "그룹 전체 리스트", groups });
	} catch (error) {
		error.status = 500;
		error.message = "그룹 전체 리스트 실패";
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
		error.status = 500;
		error.message = "그룹 상세 정보 조회 실패";
		next(error);
	}
};

module.exports = { createGroup, getAllGroups, getGroupDetails };

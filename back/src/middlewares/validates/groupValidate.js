const Joi = require("joi");

const createGroupSchema = Joi.object({
	name: Joi.string().min(1).max(50).required().messages({
		"string.base": "그룹명이 문자열이 아닙니다.",
		"string.min": "그룹명이 너무 짧습니다.",
		"string.max": "그룹명이 너무 깁니다.",
		"any.required": "그룹명이 없습니다.",
	}),
	goal: Joi.string().min(1).max(1000).optional().allow("").messages({
		"string.base": "목표가 문자열이 아닙니다.",
		"string.min": "목표가 너무 짧습니다.",
		"string.max": "목표가 너무 깁니다.",
	}),
	region: Joi.string().min(1).max(1000).optional().allow("").messages({
		"string.base": "활동지역이 문자열이 아닙니다.",
		"string.min": "활동지역이 너무 짧습니다.",
		"string.max": "활동지역이 너무 깁니다.",
	}),
	introduction: Joi.string().min(1).max(1000).optional().allow("").messages({
		"string.base": "소개가 문자열이 아닙니다.",
		"string.min": "소개가 너무 짧습니다.",
		"string.max": "소개가 너무 깁니다.",
	}),
});
const validateGroupCreation = (req, res, next) => {
	const validGroup = createGroupSchema.validate(req.body);
	if (validGroup.error) {
		return res.status(400).json({
			message: "유효성 검사 실패.",
			details: validGroup.error.details,
		});
	}
	next();
};

const createGroupPostSchema = Joi.object({
	title: Joi.string().min(1).max(50).required().messages({
		"string.base": "제목이 문자열이 아닙니다.",
		"string.min": "제목이 너무 짧습니다.",
		"string.max": "제목이 너무 깁니다.",
		"any.required": "제목이 없습니다.",
	}),
	content: Joi.string().min(1).max(1000).required().messages({
		"string.base": "내용이 문자열이 아닙니다.",
		"string.min": "내용이 너무 짧습니다.",
		"string.max": "내용이 너무 깁니다.",
		"any.required": "내용이 없습니다.",
	}),
	isNotice: Joi.boolean().optional().messages({
		"boolean.base": "공지여부가 불린이 아닙니다.",
	}),
});
const validateGroupPostCreation = (req, res, next) => {
	const validGroup = createGroupPostSchema.validate(req.body);
	if (validGroup.error) {
		return res.status(400).json({
			message: "유효성 검사 실패.",
			details: validGroup.error.details,
		});
	}
	next();
};

const updateGroupPostSchema = Joi.object({
	title: Joi.string().min(1).max(50).optional().messages({
		"string.base": "제목이 문자열이 아닙니다.",
		"string.min": "제목이 너무 짧습니다.",
		"string.max": "제목이 너무 깁니다.",
	}),
	content: Joi.string().min(1).max(1000).optional().messages({
		"string.base": "내용이 문자열이 아닙니다.",
		"string.min": "내용이 너무 짧습니다.",
		"string.max": "내용이 너무 깁니다.",
	}),
	isNotice: Joi.boolean().optional().messages({
		"boolean.base": "공지여부가 불린이 아닙니다.",
	}),
});
const validateGroupPostUpdate = (req, res, next) => {
	const validGroup = updateGroupPostSchema.validate(req.body);
	if (validGroup.error) {
		return res.status(400).json({
			message: "유효성 검사 실패.",
			details: validGroup.error.details,
		});
	}
	next();
};

module.exports = {
	validateGroupCreation,
	validateGroupPostCreation,
	validateGroupPostUpdate,
};

const Joi = require('joi');

const createCertPostSchema = Joi.object({
	title: Joi.string().min(1).max(50).required().messages({
		'string.base': '그룹명이 문자열이 아닙니다.',
		'string.min': '그룹명이 너무 짧습니다.',
		'string.max': '그룹명이 너무 깁니다.',
		'any.required': '그룹명이 없습니다.',
	}),
	region: Joi.string().min(1).max(1000).optional().allow('').messages({
		'string.base': '목표가 문자열이 아닙니다.',
		'string.min': '목표가 너무 짧습니다.',
		'string.max': '목표가 너무 깁니다.',
	}),
	location: Joi.string().min(1).max(1000).optional().allow('').messages({
		'string.base': '활동지역이 문자열이 아닙니다.',
		'string.min': '활동지역이 너무 짧습니다.',
		'string.max': '활동지역이 너무 깁니다.',
	}),
	distance: Joi.string().min(1).max(1000).optional().allow('').messages({
		'string.base': '소개가 문자열이 아닙니다.',
		'string.min': '소개가 너무 짧습니다.',
		'string.max': '소개가 너무 깁니다.',
	}),
	trashAmount: Joi.string().min(1).max(1000).optional().allow('').messages({}),
	averagePace: Joi.string().min(1).max(1000).optional().allow('').messages({}),
	description: Joi.string().min(1).max(1000).optional().allow('').messages({}),
	startTime: Joi.string().min(1).max(1000).optional().allow('').messages({}),
	endTIme: Joi.string().min(1).max(1000).optional().allow('').messages({}),
	isGroupPost: Joi.boolean().optional().messages({}),
	groupName: Joi.string().min(1).max(1000).optional().allow('').messages({}),
});
const validateCertCreation = (req, res, next) => {
	const validGroup = createCertPostSchema.validate(req.body);
	if (validGroup.error) {
		return res.status(400).json({
			message: '유효성 검사 실패.',
			details: validGroup.error.details,
		});
	}
	next();
};

module.exports = { validateCertCreation };

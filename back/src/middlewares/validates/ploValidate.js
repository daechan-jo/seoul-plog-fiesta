const Joi = require('joi');

const createCertPostSchema = Joi.object({
	title: Joi.string().min(1).max(50).required().messages({
		'string.base': '제목이 문자열이 아닙니다.',
		'string.min': '제목이 너무 짧습니다.',
		'string.max': '제목이 너무 깁니다.',
		'any.required': '제목이 없습니다.',
	}),
	region: Joi.string().min(1).max(20).required().allow('').messages({
		'string.base': '자치구가 문자열이 아닙니다.',
		'string.min': '자치구가 너무 짧습니다.',
		'string.max': '자치구가 너무 깁니다.',
	}),
	location: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '위치가 문자열이 아닙니다.',
		'string.min': '위치가 너무 짧습니다.',
		'string.max': '위치가 너무 깁니다.',
	}),
	distance: Joi.string().min(1).max(1000).optional().allow('').messages({
		'string.base': '거리가 문자열이 아닙니다.',
		'string.min': '거리가 너무 짧습니다.',
		'string.max': '거리가 너무 깁니다.',
	}),
	trashAmount: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '쓰레기 양이 문자열이 아닙니다.',
		'string.min': '쓰레기 양이 너무 짧습니다.',
		'string.max': '쓰레기 양이 너무 깁니다.',
	}),
	averagePace: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '평균 속도가 문자열이 아닙니다.',
		'string.min': '평균 속도가 너무 짧습니다.',
		'string.max': '평균 속도가 너무 깁니다.',
	}),
	description: Joi.string().min(1).max(1000).optional().allow('').messages({
		'string.base': '설명이 문자열이 아닙니다.',
		'string.min': '설명이 너무 짧습니다.',
		'string.max': '설명이 너무 깁니다.',
	}),
	startTime: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '시작 시간이 문자열이 아닙니다.',
		'string.min': '시작 시간이 너무 짧습니다.',
		'string.max': '시작 시간이 너무 깁니다.',
	}),
	endTime: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '종료 시간이 문자열이 아닙니다.',
		'string.min': '종료 시간이 너무 짧습니다.',
		'string.max': '종료 시간이 너무 깁니다.',
	}),
	isGroupPost: Joi.boolean().optional().messages({
		'boolean.base': 'isGroupPost가 boolean이 아닙니다.',
	}),
	groupName: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '그룹 이름이 문자열이 아닙니다.',
		'string.min': '그룹 이름이 너무 짧습니다.',
		'string.max': '그룹 이름이 너무 깁니다.',
	}),
	participants: Joi.array().items(Joi.string()).optional().allow('').messages({
		'string.base': '참여자가 문자열이 아닙니다.',
		'string.min': '참여자가 너무 짧습니다.',
		'string.max': '참여자가 너무 깁니다.',
	}),
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

const updateCertPostSchema = Joi.object({
	title: Joi.string().min(1).max(50).optional().messages({
		'string.base': '제목이 문자열이 아닙니다.',
		'string.min': '제목이 너무 짧습니다.',
		'string.max': '제목이 너무 깁니다.',
		'any.required': '제목이 없습니다.',
	}),
	region: Joi.string().min(1).max(20).optional().allow('').messages({
		'string.base': '자치구가 문자열이 아닙니다.',
		'string.min': '자치구가 너무 짧습니다.',
		'string.max': '자치구가 너무 깁니다.',
	}),
	location: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '위치가 문자열이 아닙니다.',
		'string.min': '위치가 너무 짧습니다.',
		'string.max': '위치가 너무 깁니다.',
	}),
	distance: Joi.string().min(1).max(1000).optional().allow('').messages({
		'string.base': '거리가 문자열이 아닙니다.',
		'string.min': '거리가 너무 짧습니다.',
		'string.max': '거리가 너무 깁니다.',
	}),
	trashAmount: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '쓰레기 양이 문자열이 아닙니다.',
		'string.min': '쓰레기 양이 너무 짧습니다.',
		'string.max': '쓰레기 양이 너무 깁니다.',
	}),
	averagePace: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '평균 속도가 문자열이 아닙니다.',
		'string.min': '평균 속도가 너무 짧습니다.',
		'string.max': '평균 속도가 너무 깁니다.',
	}),
	description: Joi.string().min(1).max(1000).optional().allow('').messages({
		'string.base': '설명이 문자열이 아닙니다.',
		'string.min': '설명이 너무 짧습니다.',
		'string.max': '설명이 너무 깁니다.',
	}),
	startTime: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '시작 시간이 문자열이 아닙니다.',
		'string.min': '시작 시간이 너무 짧습니다.',
		'string.max': '시작 시간이 너무 깁니다.',
	}),
	endTime: Joi.string().min(1).max(50).optional().allow('').messages({
		'string.base': '종료 시간이 문자열이 아닙니다.',
		'string.min': '종료 시간이 너무 짧습니다.',
		'string.max': '종료 시간이 너무 깁니다.',
	}),
	isGroupPost: Joi.boolean().optional().messages({
		'boolean.base': 'isGroupPost가 boolean이 아닙니다.',
	}),
});
const validateCertUpdateCreation = (req, res, next) => {
	const validGroup = updateCertPostSchema.validate(req.body);
	if (validGroup.error) {
		return res.status(400).json({
			message: '유효성 검사 실패.',
			details: validGroup.error.details,
		});
	}
	next();
};
module.exports = { validateCertCreation, validateCertUpdateCreation };

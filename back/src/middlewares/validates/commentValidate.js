const Joi = require("joi");

const createCommentSchema = Joi.object({
	content: Joi.string().min(1).max(200).required().messages({
		"string.base": "내용이 문자열이 아닙니다.",
		"string.min": "내용이 너무 짧습니다.",
		"string.max": "내용이 너무 깁니다.",
		"any.required": "내용이 없습니다.",
	}),
	parentId: Joi.number().optional().messages({
		"number.base": "부모댓글이 정수가 아닙니다.",
	}),
});
const validateCommentCreation = (req, res, next) => {
	const validGroup = createCommentSchema.validate(req.body);
	if (validGroup.error) {
		return res.status(400).json({
			message: "유효성 검사 실패.",
			details: validGroup.error.details,
		});
	}
	next();
};

module.exports = { validateCommentCreation };

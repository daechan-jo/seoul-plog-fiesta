const Joi = require("joi");

const createGroupSchema = Joi.object({
	name: Joi.string().min(1).max(255).required(),
	goal: Joi.string().min(1).max(255).optional().allow(""),
	region: Joi.string().min(1).max(255).optional().allow(""),
	introduction: Joi.string().min(1).max(65535).optional().allow(""),
});
const validateGroupCreation = (req, res, next) => {
	const validGroup = createGroupSchema.validate(req.body);
	if (validGroup.error) {
		return res.status(400).json({
			message: "잘못된 요청입니다.",
			details: validGroup.error.details,
		});
	}
	next();
};

module.exports = { validateGroupCreation };

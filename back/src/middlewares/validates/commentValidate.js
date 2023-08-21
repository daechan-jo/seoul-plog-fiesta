const Joi = require("joi");

// const createGroupSchema = Joi.object({
// 	name: Joi.string().min(1).max(50).required(),
// 	goal: Joi.string().min(1).max(1000).optional().allow(""),
// 	region: Joi.string().min(1).max(1000).optional().allow(""),
// 	introduction: Joi.string().min(1).max(1000).optional().allow(""),
// });
// const validateGroupCreation = (req, res, next) => {
// 	const validGroup = createGroupSchema.validate(req.body);
// 	if (validGroup.error) {
// 		return res.status(400).json({
// 			message: "유효성 검사 실패.",
// 			details: validGroup.error.details,
// 		});
// 	}
// 	next();
// };

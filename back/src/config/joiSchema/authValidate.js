const Joi = require("joi");
const namePattern = /^[a-zA-Z가-힣\s]+$/;
const passwordPattern = /^[a-zA-Z0-9!@#$%^&*()-=_+[\]{}|;:',.<>/?]+$/;
const paramIdPattern = /^[0-9a-fA-F]{24}$/;
class authValidate {
	static join(req, res, next) {
		const { name, email, password } = req.body;
		const schema = Joi.object({
			name: Joi.string()
				.min(2)
				.max(20)
				.regex(namePattern)
				.required()
				.messages({
					"string.min": "이름은 최소 2자 이상 이어야 합니다.",
					"string.max": "이름은 최대 10자 이하 여야 합니다.",
					"string.pattern.base":
						"이름은 한글, 영문 대소 문자만 입력 가능 합니다.",
					"any.required": "이름은 필수 입력 사항 입니다.",
				}),
			email: Joi.string().email().required().messages({
				"string.email": "이메일 형식이 유효하지 않습니다.",
				"any.required": "이메일은 필수 입력 사항 입니다.",
			}),
			password: Joi.string()
				.min(4)
				.max(20)
				.regex(passwordPattern)
				.required()
				.messages({
					"string.min": "비밀번호는 최소 4자 이상 이어야 합니다.",
					"string.max": "비밀번호는 최대 20자 이하 여야 합니다.",
					"string.pattern.base":
						"비밀번호는 영문 대소 문자, 숫자, 특수 문자만 입력 가능 합니다.",
					"any.required": "비밀번호는 필수 입력 사항 입니다.",
				}),
		});
		const { error, value } = schema.validate({ name, email, password });
		if (error) {
			const errorDetails = error.details.reduce(
				(acc, { path, message }) => {
					acc[path[0]] = message;
					return acc;
				},
				{}
			);
			return res
				.status(400)
				.json({ error: "유효성 검사 에러", details: errorDetails });
		}
		req.join = value;
		next();
	}
}

module.exports = authValidate;

const Joi = require('joi');

const updateUserSchema = Joi.object({
  nickname: Joi.string().min(1).max(50).optional().messages({
    'string.base': '닉네임이 문자열이 아닙니다.',
    'string.min': '닉네임이 너무 짧습니다.',
    'string.max': '닉네임이 너무 깁니다.',
  }),
  name: Joi.string().min(1).max(50).optional().messages({
    'string.base': '이름이 문자열이 아닙니다.',
    'string.min': '이름이 너무 짧습니다.',
    'string.max': '이름이 너무 깁니다.',
  }),
  about: Joi.string().min(1).max(50).optional().messages({
    'string.base': '소개가 문자열이 아닙니다.',
    'string.min': '소개가 너무 짧습니다.',
    'string.max': '소개가 너무 깁니다.',
  }),
  password: Joi.string().min(3).optional().messages({
    'string.base': '비밀번호가 문자열이 아닙니다.',
    'string.min': '비밀번호가 너무 짧습니다.',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .optional()
    .strict()
    .messages({
      'any.only': '비밀번호 확인이 일치하지 않습니다.',
    }),
});

const validateUserUpdate = (req, res, next) => {
  const validationResult = updateUserSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: '유효성 검사 실패.',
      details: validationResult.error.details,
    });
  }
  next();
};

module.exports = {
  validateUserUpdate,
};

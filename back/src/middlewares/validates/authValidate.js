const Joi = require('joi');

const updateUserSchema = Joi.object({
  nickname: Joi.string().allow('', null).min(1).max(50).optional().messages({
    'string.base': '닉네임이 문자열이 아닙니다.',
    'string.min': '닉네임이 너무 짧습니다.',
    'string.max': '닉네임이 너무 깁니다.',
  }),
  name: Joi.string().allow('', null).min(1).max(50).optional().messages({
    'string.base': '이름이 문자열이 아닙니다.',
    'string.min': '이름이 너무 짧습니다.',
    'string.max': '이름이 너무 깁니다.',
  }),
  about: Joi.string().allow('', null).min(1).max(50).optional().messages({
    'string.base': '소개가 문자열이 아닙니다.',
    'string.empty': '소개는 비어있을 수 있습니다.',
    'string.min': '소개가 너무 짧습니다.',
    'string.max': '소개가 너무 깁니다.',
  }),
  activity: Joi.string().allow('', null).optional().messages({
    'string.base': '활동구가 문자열이 아닙니다.',
    'string.empty': '활동구는 비어있을 수 있습니다.',
  }),
  password: Joi.string().min(3).optional().messages({
    'string.base': '비밀번호가 문자열이 아닙니다.',
    'string.min': '비밀번호가 너무 짧습니다.',
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
  return next();
};

export default validateUserUpdate;

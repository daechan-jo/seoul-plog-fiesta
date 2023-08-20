import authService from "../services/authService";
const createUser = async (req, res, next) => {
	try {
		const userData = req.body;
		if (userData.password !== userData.confirmPassword)
			throw new Error("비밀번호 확인 불일치");
		const user = await authService.createUser(userData);
		console.log(user);
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const user = {
			token: req.token,
			email: req.user.email,
			nickname: req.user.nickname,
		};
		console.log(user);
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { createUser, login };

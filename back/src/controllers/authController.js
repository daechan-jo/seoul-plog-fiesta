import authService from "../services/authService";

const createUser = async (req, res, next) => {
	const userData = req.body;
	try {
		if (userData.password !== userData.confirmPassword)
			throw new Error("비밀번호 확인 불일치");
		const user = await authService.createUser(userData);
		res.status(201).json({ message: "유저 생성", user });
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
		res.status(200).json({ message: "로그인 성공", user });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { createUser, login };

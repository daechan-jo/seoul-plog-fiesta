const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

const createUser = async (userData) => {
	console.log(userData);
	const { name, nickname, email, password } = userData;
	const existingUser = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	if (existingUser) throw new Error("이미 존재하는 이메일입니다.");
	const hashedPassword = await bcrypt.hash(password, 10);
	const newUser = {
		name,
		nickname,
		email,
		password: hashedPassword,
	};
	try {
		const createdNewUser = await prisma.user.create({
			data: newUser,
		});
		createdNewUser.errorMessage = null;
		return createdNewUser;
	} catch (error) {
		throw error;
	}
};

module.exports = { createUser };

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
import randomPassword from "../utils/randomPassword";

const createUser = async (userData) => {
	const { name, nickname, email, password } = userData;
	const existingUser = await prisma.user.findUnique({
		where: {
			email: email,
		},
	});
	const existingNickname = await prisma.user.findUnique({
		where: {
			nickname: nickname,
		},
	});
	if (existingUser) throw new Error("이미 존재하는 이메일입니다.");
	if (existingNickname) throw new Error("이미 존재하는 닉네임입니다.");

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

const getUserByEmail = async (email) => {
	const existingUser = await prisma.user.findUnique({
		where: {
			email: email
		},
	});
	if (!existingUser) throw new Error("존재하지 않는 사용자입니다.")
	return existingUser;
};

const changePassword = async (email,password) => { //비밀번호 변경
	console.log(email, password);
	const hashedPassword = await bcrypt.hash(password, 10);
	const updateUser = await prisma.user.update({
		where:{
			email: email,
		},
		data:{
			password: hashedPassword,
		}
	})
	return updateUser;
}
module.exports = { createUser, getUserByEmail, changePassword };

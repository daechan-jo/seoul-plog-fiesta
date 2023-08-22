const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

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

//모르는 사람이 이메일로만 비밀번호를 변경한다면 ? => 보안 조치 ?
const changePassword = async (email,password) => { //비밀번호 변경
	//console.log(email, password);
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

const changeInformation = async (userData) => {
	const {id, name, nickname, password, about, activity} = userData;
	try{
		if(!name || !nickname || !password) throw new Error("필수값들을 입력해주세요");
		
		//id는 다른데 nickname이 같은 사람이 있는경우 : nickname이 같으면 id를 대조
		//혹은 모든 사람들의 데이터중에서 nickname이 같은 경우를 찾나 ?
		//이미 unique라 이 전에 오류를 던지는지 => 필요 없는 코드 ?
		/*const sameNicknameUser = await prisma.user.findUnique({
			where: {
				id : {not:id} ,
				nickname: nickname,
			}
		})
		if (sameNicknameUser) throw new Error("이미 존재하는 닉네임입니다.");
		*/
		const updateUser = await prisma.user.update({
			where:{
				id : id,
			},
			data:{
				name: name,
				nickname: nickname,
				password: password,
				about: about, //빈 값 허용
				activity: activity //빈 값 허용
			}
		});
		console.log('유저의 정보를 업데이트했습니다');
		return updateUser;
	}catch (error) {
		throw error;
	}
	/*
	email - 고유값이어야 함
	password = not null
	about
	activity*/
}

module.exports = { createUser, getUserByEmail, changePassword, changeInformation };

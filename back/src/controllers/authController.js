import authService from "../services/authService";
import smtpTransport from "../config/sendEmail";
import randomPassword from "../utils/randomPassword";
import { text } from "express";

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
			id: req.user.id,
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

const findPasswordByEmail = async(req, res, next) =>{
	try {
		const email = req.body.email;
		const existingUser = await authService.getUserByEmail(email);
		const password = randomPassword.createRandomPassword();
		//console.log(existingUser);

		const emailOptions = {
			from: "qweasdzxc0210@naver.com",
			to: email,
			subject: "임시 비밀번호를 알려드립니다.",
			html:
			"<h1>파인애플피자에서 새로운 비밀번호를 알려드립니다.</h1>"+
			"<h2>임시 비밀번호는 "+ password +"입니다.</h2>"+
			'<h3 style="color:crimson;">임시 비밀번호로 로그인 하신 후, 비밀번호를 수정해주세요.</h3>'+
			'<img src="http://file3.instiz.net/data/cached_img/upload/2021/10/01/11/fcd74ebb3fc06be634475b93911b0a7f.jpg">'
		};

		smtpTransport.sendMail(emailOptions, (err,info) =>{
			if(err){
				console.log(err);
			} else{
				console.log("성공적으로 이메일을 전송하였습니다.", info.response);
				smtpTransport.close();
			}
		})

		//해당 유저의 비밀번호를 임시 비밀번호로 변경
		const user = authService.changePassword(email, password);
		res.status(200).json(user); //빈 응답

	} catch(error){
		console.error(error);
		error.status= 500;
		next(error);
	}
}


const changeInformation = async (req, res, next) =>{
	try {
		const userData = req.body
		const user = await authService.changeInformation(userData);
		console.log(user)
		res.status(200).json(user);
	} catch(error){
		console.error(error);
		error.status = 500;
		next(error);
	}
}

const removeUser = async (req, res,next) => {
	try {
		const id = req.body.id;
		const user = await authService.removeUser(id);
		console.log(user);
		res.status(200).json(user);
	} catch(error){
		console.error(error);
		error.status = 500;
		next(error);
	}
}


module.exports = { createUser, login , findPasswordByEmail, changeInformation, removeUser };

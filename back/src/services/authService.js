const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

/** @description 유저 생성*/
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
  if (existingUser) throw new Error('이미 존재하는 이메일입니다.');
  if (existingNickname) throw new Error('이미 존재하는 닉네임입니다.');


    //비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      nickname,
      email,
      password: hashedPassword,
    };

    return prisma.user.create({
			data: newUser,
		});
};

/** @description 이메일로 유저 찾기*/
const getUserByEmail = async (email) => {

    return prisma.user.findUnique({
			where: {
				email: email,
			},
		});
};

/** @description 이메일로 유저 찾아 패스워드 토큰 업데이트*/
const updatePasswordTokenByEmail = async (email, token) => {

    return prisma.user.update({
			where: {
				email: email,
			},
			data: {
				passwordToken: token,
			},
		});
};

/** @description 이메일로 유저 찾아 패스워드 유효기간 업데이트*/
const updatePasswordValidByEmail = async (email) => {
    return prisma.user.update({
			where: {
				email: email,
			},
			data: {
				passwordValid: new Date(),
			},
		});
};

/** @description 비밀번호 변경*/
const changePassword = async (email, password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });

};

const changePasswordByCheckOriginPassword = async (passwordData) => {
  const { id, password, newPassword } = passwordData;
  const passwordUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  //기존 비밀번호와 새로 입력한 비밀번호가 다르면 오류 반환
  const isPasswordMatch = await bcrypt.compare(password, passwordUser.password);

  if (!isPasswordMatch) {
    throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
  }

    //비밀번호 변경
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return prisma.user.update({
			where: {
				id: id,
			},
			data: {
				password: hashedPassword,
			},
		});

};

/** @description 패스워드토큰으로 유저 찾기*/
const getUserByPasswordToken = async (passwordToken) => {
    return prisma.user.findUnique({
      where: {
        passwordToken: passwordToken,
      },
    });
};

/** @description 유저 정보 수정 -> 입력한 비밀번호가 기존 비밀번호여야 함 */
const changeInformation = async (user) => {
  const { id, name, nickname, about, activity, password } = user;
  const passwordUser = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (!passwordUser) throw new Error('존재하지 않는 사용자입니다.');
  //기존 비밀번호와 새로 입력한 비밀번호가 다르면 오류 반환
  const isPasswordMatch = await bcrypt.compare(password, passwordUser.password);

  if (!isPasswordMatch) {
    throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
  }
    //정보 업데이트
    return prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        nickname: nickname,
        about: about,
        activity: activity,
      },
    });
};

/** @description 유저 삭제*/
const removeUser = async (id) => {
    return  prisma.user.delete({
      where: {
        id: id,
      },
    });
};

/** @description 아이디로 가입된 모임 아이디들 찾기 -> 배열 반환*/
const getGroupsByUserId = async (userId) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        groups: true,
      },
    });
    return user.groups.map((group) => group.groupId);
};

/** @description 아이디로 친구 관계인 친구 아이디들 찾기 -> 배열 반환*/
const getFriendIdsByUserId = async (userId) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        friendshipsA: {
          where: {
            isAccepted: true,
          },
          select: {
            userB: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return user.friendshipsA.map((friendship) => friendship.userB.id);
};

module.exports = {
  createUser,
  getUserByEmail,
  changePassword,
  changeInformation,
  removeUser,
  updatePasswordTokenByEmail,
  getUserByPasswordToken,
  updatePasswordValidByEmail,
  getGroupsByUserId,
  getFriendIdsByUserId,
  changePasswordByCheckOriginPassword,
};

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { error } = require('console');
const { accessSync } = require('fs');

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
      email: email,
    },
  });
  if (!existingUser) throw new Error('존재하지 않는 사용자입니다.');
  return existingUser;
};

//이메일로 유저 찾아 유저의 토큰 업데이트
const updatePasswordTokenByEmail = async (email, token) => {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        passwordToken: token,
      },
    });
    console.log(user);
    return user;
  } catch (error) {
    throw error;
  }
};

const updatePasswordValidByEmail = async (email) => {
  try {
    const user = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        passwordValid: new Date(),
      },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const changePassword = async (email, password) => {
  //비밀번호 변경
  //console.log(email, password);
  const hashedPassword = await bcrypt.hash(password, 10);
  const updateUser = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: hashedPassword,
    },
  });
  return updateUser;
};

const getUserByPasswordToken = async (passwordToken) => {
  const user = await prisma.user.findUnique({
    where: {
      passwordToken: passwordToken,
    },
  });
  if (!user) throw new Error('비밀번호 토큰과 일치하는 사용자가 없습니다.');
  return user;
};

const changeInformation = async (user) => {
  const { id, name, nickname, about, activity, password } = user;
  try {
    if (!name || !nickname) throw new Error('필수값들을 입력해주세요');

    //동일 사용자도 동일 닉네임을 사용할 수 없음
    const sameNicknameUser = await prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });
    if (sameNicknameUser) throw new Error('이미 존재하는 닉네임입니다.');

    const hashedPassword = await bcrypt.hash(password, 10);
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        nickname: nickname,
        password: hashedPassword,
        about: about, //빈 값 허용
        activity: activity, //빈 값 허용
      },
    });
    console.log('유저의 정보를 업데이트했습니다');
    return updateUser;
  } catch (error) {
    throw error;
  }
};

const removeUser = async (id) => {
  try {
    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    console.log('탈퇴 완료');
    return deleteUser;
  } catch (error) {
    throw error;
  }
};

const findGroupsById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        groups: true,
      },
    });
    const groupIds = user.groups.map((group) => group.groupId);
    return groupIds;
  } catch (error) {
    throw error;
  }
};

const findFriendIdsById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
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

    const friendIds = user.friendshipsA.map(
      (friendship) => friendship.userB.id,
    );
    console.log(friendIds);

    return friendIds;
  } catch (error) {
    throw error;
  }
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
  findGroupsById,
  findFriendIdsById,
};

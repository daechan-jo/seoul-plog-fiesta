const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const { error } = require('console');
const { accessSync } = require('fs');

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

/** @description 이메일로 유저 찾아 패스워드 토큰 업데이트*/
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
    return user;
  } catch (error) {
    throw error;
  }
};

/** @description 이메일로 유저 찾아 패스워드 유효기간 업데이트*/
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
    return updateUser;
  } catch (error) {
    throw error;
  }
};

const removeUser = async (id) => {
  try {
    //가입한 그룹이 있거나 만든 그룹이 있으면 회원탈퇴 불가
    //

    const deleteUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return deleteUser;
  } catch (error) {
    throw error;
  }
};

/** @description 아이디로 가입된 모임 아이디들 찾기 -> 배열 반환*/
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

/** @description 아이디로 친구 관계인 친구 아이디들 찾기 -> 배열 반환*/
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
    return friendIds;
  } catch (error) {
    throw error;
  }
};
const findProfileImageById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { profileImage: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
};
const deleteUserProfileImageById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { profileImage: true },
    });

    if (!user || !user.profileImage) {
      return { success: false, message: '프로필 이미지가 없습니다.' };
    }
    //프로필 이미지가 존재하면 삭제
    const updatedUser = await prisma.userProfileImage.delete({
      where: { id: user.profileImage.id },
    });

    return { success: true, message: '프로필 이미지 삭제 완료' };
    //return updatedUser;
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
  findProfileImageById,
  deleteUserProfileImageById,
};

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

const checkUserHaveNickname = async (user, nickname) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      nickname: nickname,
    },
  });
  if (existingUser.email !== user.email) {
    throw new Error('일치하는 사용자가 없습니다.');
  }
  return { success: true, message: '일치하는 사용자가 있습니다.' };
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

const changePasswordByCheckOriginPassword = async (passwordData) => {
  const { id, password, newPassword } = passwordData;
  try {
    const passwordUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    //기존 비밀번호와 새로 입력한 비밀번호가 다르면 오류 반환
    const isPasswordMatch = await bcrypt.compare(
      password,
      passwordUser.password,
    );
    if (!isPasswordMatch) {
      throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
    }

    //비밀번호 변경
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
    return updatedUser;
  } catch (error) {
    throw error;
  }
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

/** @description 회원정보 수정 ->
 * 입력한 비밀번호가 기존 비밀번호와 다를 경우 오류 반환
 * 비밀번호와 비밀번호확인문자가 다를 경우 오류 반환*/
const changeInformation = async (user) => {
  const { id, name, nickname, about, activity, password } = user;
  try {
    //동일 사용자도 동일 닉네임을 사용할 수 없음
    /*
    const sameNicknameUser = await prisma.user.findUnique({
      where: {
        nickname: nickname,
      },
    });
    if (sameNicknameUser) throw new Error('이미 존재하는 닉네임입니다.');
    */
    const passwordUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    //기존 비밀번호와 새로 입력한 비밀번호가 다르면 오류 반환
    const isPasswordMatch = await bcrypt.compare(
      password,
      passwordUser.password,
    );

    if (!isPasswordMatch) {
      throw new Error('비밀번호가 틀렸습니다. 다시 입력해주세요');
    }

    //정보 업데이트
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        nickname: nickname,
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
const getGroupsByUserId = async (id) => {
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
const getFriendIdsByUserId = async (id) => {
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

const getProfileImageByUserId = async (id) => {
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

const getCertPostsByUserId = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { certPosts: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getCommentsByUserId = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
      include: { comments: true },
    });
    return user;
  } catch (error) {
    throw error;
  }
};

/**@description 프로필 이미지 삭제*/
const deleteUserProfileImageByUserId = async (id) => {
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

const deleteCertPostImagesByUserId = async (id) => {
  try {
    // 해당 유저의 CertPostImage 가져오기
    const userCertPostImages = await prisma.certPostImage.findMany({
      where: { certPost: { writerId: id } }, // 해당 유저의 인증글 이미지 가져오기
    });

    for (const certPostImage of userCertPostImages) {
      // CertPostImage 삭제
      await prisma.certPostImage.delete({ where: { id: certPostImage.id } });
      console.log(`CertPostImage (ID: ${certPostImage.id}) 삭제 완료`);
    }
    return { success: true, message: '인증 이미지 삭제 완료' };
  } catch (error) {
    throw error;
  }
};

/**@description 개인 인증글과 댓글 삭제*/
const deleteCertPostsAndCommentsByUserId = async (id) => {
  try {
    const certPosts = await prisma.certPost.findMany({
      where: { writerId: id },
      include: { comments: true },
    });

    if (!certPosts) {
      return { success: false, message: '삭제할 게시물이 없습니다.' };
    }

    for (const certPost of certPosts) {
      // 개인 인증글에 해당하는 댓글들 삭제
      for (const comment of certPost.comments) {
        await prisma.comment.delete({ where: { id: comment.id } });
      }

      // 개인 인증글 삭제
      await prisma.certPost.delete({ where: { id: certPost.id } });
    }
    return { success: true, message: '개인 인증글과 댓글 삭제 완료' };
  } catch (error) {
    throw error;
  }
};

/**@description 다른 사용자 인증글에 달린 댓글 및 대댓글 삭제
 * 기존 사용자 탈퇴시 모든 댓글 및 댓글의 부모 댓글도 지워짐*/
const deleteMyCommentsOnOtherUserCertPosts = async (id) => {
  try {
    const myComments = await prisma.comment.findMany({
      where: {
        writerId: id, //자신의 댓글
      },
      include: { children: true }, //대댓글 정보 가져오기
    });

    if (!myComments) {
      return { success: false, message: '삭제할 댓글이 없습니다.' };
    }

    for (const comment of myComments) {
      // 대댓글 삭제
      for (const reply of comment.children) {
        await prisma.comment.delete({ where: { id: reply.id } });
        console.log(`대댓글 (ID: ${reply.id}) 삭제 완료`);
        // 댓글 삭제
      }

      await prisma.comment.delete({ where: { id: comment.id } });
      console.log(`댓글 (ID: ${comment.id}) 삭제 완료`);
    }

    return {
      success: true,
      message: '다른 사용자 인증글에 달린 댓글 및 대댓글 삭제 완료',
    };
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
  getGroupsByUserId,
  getFriendIdsByUserId,
  getProfileImageByUserId,
  deleteUserProfileImageByUserId,
  deleteCertPostsAndCommentsByUserId,
  deleteMyCommentsOnOtherUserCertPosts,
  deleteCertPostImagesByUserId,
  getCertPostsByUserId,
  getCommentsByUserId,
  changePasswordByCheckOriginPassword,
  checkUserHaveNickname,
};

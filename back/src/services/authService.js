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
  try {
    return await prisma.user.create({
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** @description 이메일로 유저 찾기*/
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
    return await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        passwordToken: token,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** @description 이메일로 유저 찾아 패스워드 유효기간 업데이트*/
const updatePasswordValidByEmail = async (email) => {
  try {
    return await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        passwordValid: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** @description 비밀번호 변경*/
const changePassword = async (email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changePasswordByCheckOriginPassword = async (passwordData) => {
  try {
    const { id, password, newPassword } = passwordData;
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
    return await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** @description 패스워드토큰으로 유저 찾기*/
const getUserByPasswordToken = async (passwordToken) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        passwordToken: passwordToken,
      },
    });
    if (!user) throw new Error('비밀번호 토큰과 일치하는 사용자가 없습니다.');
    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** @description 유저 정보 수정 -> 입력한 비밀번호가 기존 비밀번호여야 함 */
const changeInformation = async (user) => {
  try {
    const { id, name, nickname, about, activity, password } = user;
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
    return await prisma.user.update({
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
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** @description 유저 삭제*/
const removeUser = async (id) => {
  try {
    // 다른 테이블의 외래 키 레코드를 먼저 삭제
    await prisma.friendship.deleteMany({
      where: {
        OR: [{ userAId: id }, { userBId: id }],
      },
    });
    return await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error) {
    console.error(error);
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
    return user.groups.map((group) => group.groupId);
  } catch (error) {
    console.error(error);
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

    return user.friendshipsA.map((friendship) => friendship.userB.id);
  } catch (error) {
    console.error(error);
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

    if (!user && !user.profileImage) {
      return { success: false, message: '프로필 이미지가 없습니다.' };
    }
    //프로필 이미지가 존재하면 삭제
    const image = await prisma.userProfileImage.findFirst({
      where: { userId: id },
    });
    if (image)
      fs.unlinkSync(path.join(__dirname, '../..', 'public', image.imageUrl));
    await prisma.userProfileImage.delete({
      where: { id: user.profileImage.id },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/** @description 인증글 이미지 삭제*/
const deleteCertPostImagesByUserId = async (id) => {
  try {
    // 해당 유저의 CertPostImage 가져오기
    const userCertPostImages = await prisma.certPostImage.findMany({
      where: { certPost: { writerId: id } }, // 해당 유저의 인증글 이미지 가져오기
    });

    for (const certPostImage of userCertPostImages) {
      // CertPostImage 삭제
      await prisma.certPostImage.delete({ where: { id: certPostImage.id } });
    }
  } catch (error) {
    console.error(error);
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
  } catch (error) {
    console.error(error);
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
        // 댓글 삭제
      }
      await prisma.comment.delete({ where: { id: comment.id } });
    }
  } catch (error) {
    console.error(error);
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
  deleteUserProfileImageByUserId,
  deleteCertPostsAndCommentsByUserId,
  deleteMyCommentsOnOtherUserCertPosts,
  deleteCertPostImagesByUserId,
  changePasswordByCheckOriginPassword,
};

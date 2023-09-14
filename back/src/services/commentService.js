const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createComment = async (
  postId,
  writerId,
  content,
  parentId,
  isCertPost,
) => {
  try {
    let commentData = {
      writer: {
        connect: { id: writerId },
      },
      content,
    };
    if (isCertPost) {
      commentData.certPost = {
        connect: { id: postId },
      };
    } else {
      commentData.post = {
        connect: { id: postId },
      };
    }
    if (parentId !== undefined && parentId !== null) {
      commentData.parent = {
        connect: { id: parentId },
      };
    }
  } catch (error) {
    console.error(error);
    throw new Error('잘못된 게시글 아이디 입니다.');
  }
  try {
    const newCommentWithWriterInfo = await prisma.comment.create({
      data: commentData,
      include: { writer: true },
    });
    let result = { ...newCommentWithWriterInfo };
    delete result.writer;
    result.nickname = newCommentWithWriterInfo.writer.nickname;
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getCommentById = async (commentId) => {
  try {
    return prisma.comment.findUnique({ where: { id: commentId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateComment = async (commentId, content) => {
  try {
    return prisma.comment.update({
      where: { id: commentId },
      data: { content },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteCommentAndChildren = async (commentId) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  if (!comment) throw new Error('댓글을 찾을 수 없음');
  try {
    async function recursiveDelete(parentId) {
      const children = await prisma.comment.findMany({ where: { parentId } });

      for (const child of children) {
        await recursiveDelete(child.id);
        await prisma.comment.delete({ where: { id: child.id } });
      }
    }
    await recursiveDelete(commentId);
    await prisma.comment.delete({ where: { id: commentId } });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const canDeleteComment = async (commentId, userId) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: { id: commentId },
      include: {
        post: true,
        certPost: true,
      },
    });
    return (
      comment.writerId === userId ||
      (comment.post && comment.post.writerId === userId) ||
      (comment.certPost && comment.certPost.writerId === userId)
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteCommentsByPostId = async (postId) => {
  try {
    await prisma.comment.deleteMany({
      where: {
        postId: postId,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  createComment,
  getCommentById,
  updateComment,
  deleteCommentAndChildren,
  deleteCommentsByPostId,
  canDeleteComment,
};

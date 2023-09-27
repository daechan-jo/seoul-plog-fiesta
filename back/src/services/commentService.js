import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createComment = async (
  postId,
  writerId,
  content,
  parentId,
  isCertPost,
) => {
  const commentData = {
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
  const newCommentWithWriterInfo = await prisma.comment.create({
    data: commentData,
    include: { writer: true },
  });
  const result = { ...newCommentWithWriterInfo };
  delete result.writer;
  result.nickname = newCommentWithWriterInfo.writer.nickname;
  return result;
};

const getCommentById = async (commentId) =>
  prisma.comment.findUnique({ where: { id: commentId } });

const updateComment = async (commentId, content) =>
  prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });

const deleteCommentAndChildren = async (commentId) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  if (!comment) throw new Error('댓글을 찾을 수 없음');
  async function recursiveDelete(parentId) {
    const children = await prisma.comment.findMany({ where: { parentId } });
    await Promise.all(
      children.map(async (child) => {
        await recursiveDelete(child.id);
        await prisma.comment.delete({ where: { id: child.id } });
      }),
    );
  }
  await recursiveDelete(commentId);
  await prisma.comment.delete({ where: { id: commentId } });
};

const canDeleteComment = async (commentId, userId) => {
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
};

export default {
  createComment,
  getCommentById,
  updateComment,
  deleteCommentAndChildren,
  canDeleteComment,
};

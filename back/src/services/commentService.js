const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createComment = async (
	postId,
	writerId,
	content,
	parentId,
	isCertPost,
) => {
	let commentData = {
		writer: {
			connect: { id: writerId },
		},
		content,
	};
	if (isCertPost) {
		const certPostExists = await prisma.certPost.findUnique({
			where: { id: postId },
		});
		if (!certPostExists) {
			throw new Error("인증게시글을 찾을 수 없음");
		}
		commentData.certPost = {
			connect: { id: postId },
		};
	} else {
		const postExists = await prisma.post.findUnique({
			where: { id: postId },
		});
		if (!postExists) {
			throw new Error("게시글을 찾을 수 없");
		}
		commentData.post = {
			connect: { id: postId },
		};
	}
	if (parentId !== undefined && parentId !== null) {
		commentData.parent = {
			connect: { id: parentId },
		};
	}
	try {
		return await prisma.comment.create({
			data: commentData,
		});
	} catch (error) {
		throw error;
	}
};

const getCommentById = async (commentId) => {
	return prisma.comment.findUnique({ where: { id: commentId } });
};

const updateComment = async (commentId, content) => {
	console.log(commentId, content);
	return prisma.comment.update({
		where: { id: commentId },
		data: { content },
	});
};

const deleteComment = async (commentId) => {
	return prisma.comment.delete({ where: { id: commentId } });
};

const deleteCommentsByPostId = async (postId) => {
	await prisma.comment.deleteMany({
		where: {
			postId: postId,
		},
	});
};

module.exports = {
	createComment,
	getCommentById,
	updateComment,
	deleteComment,
	deleteCommentsByPostId,
};

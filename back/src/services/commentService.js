const { PrismaClient } = require('@prisma/client');
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
			throw new Error('인증게시글을 찾을 수 없음');
		}
		commentData.certPost = {
			connect: { id: postId },
		};
	} else {
		const postExists = await prisma.post.findUnique({
			where: { id: postId },
		});
		if (!postExists) {
			throw new Error('게시글을 찾을 수 없');
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

const deleteCommentAndChildren = async (commentId) => {
	try {
		const comment = await prisma.comment.findUnique({
			where: { id: commentId },
		});
		if (!comment) throw new Error('댓글을 찾을 수 없음');
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
		if (!comment) throw new Error('댓글을 찾을 수 없음');
		return (
			comment.writerId === userId ||
			(comment.post && comment.post.writerId === userId) ||
			(comment.certPost && comment.certPost.writerId === userId)
		);
	} catch (error) {
		throw error;
	}
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
	deleteCommentAndChildren,
	deleteCommentsByPostId,
	canDeleteComment,
};

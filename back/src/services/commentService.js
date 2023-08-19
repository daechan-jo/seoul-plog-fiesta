const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createComment = async (
	postId,
	writerId,
	content,
	parentId,
	isCertPost,
) => {
	try {
		let newData = {
			content,
			writer: { connect: { id: writerId } },
			parent: parentId ? { connect: { id: parentId } } : null,
		};

		const updatedData = isCertPost
			? { ...newData, certPost: { connect: { id: postId } } }
			: { ...newData, post: { connect: { id: postId } } };

		return await prisma.comment.create({
			data: updatedData,
		});
	} catch (error) {
		throw error;
	}
};

module.exports = { createComment };

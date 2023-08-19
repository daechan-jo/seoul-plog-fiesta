import commentService from "../services/commentService";

const createComment = async (req, res, next) => {
	const postId = parseInt(req.params.postid);
	const writerId = req.user.id;
	const content = req.body.content;
	const parentId = req.body.parentId; // 대댓글인 경우
	const isCertPost = req.query.post === "false" || req.query.post === "False";
	try {
		const newComment = await commentService.createComment(
			postId,
			writerId,
			content,
			parentId !== undefined ? parentId : null,
			isCertPost,
		);
		res.status(201).json(newComment);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { createComment };

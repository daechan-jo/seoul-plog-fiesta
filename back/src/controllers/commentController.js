import commentService from "../services/groupService";

const createComment = async (req, res, next) => {
	const postId = parseInt(req.params.postid);
	const writerId = req.user.id;
	const content = req.body.content;
	const parentId = req.body.parentId; // 대댓글인 경우
	const isCertPost = req.query.isCertPost === "true";
	try {
		const newComment = await commentService.createComment(
			postId,
			writerId,
			content,
			parentId,
			isCertPost,
		);
		res.status(201).json({
			message: "댓글 작성 완료",
			comment: newComment,
		});
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { createComment };

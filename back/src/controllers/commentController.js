import commentService from "../services/commentService";
import groupService from "../services/groupService";
const createComment = async (req, res, next) => {
	try {
		const postId = parseInt(req.params.postid);
		const writerId = req.user.id;
		const content = req.body.content;
		const parentId = req.body.parentId; // 대댓글인 경우
		const isCertPost =
			req.query.post === "false" || req.query.post === "False";

		const newComment = await commentService.createComment(
			postId,
			writerId,
			content,
			parentId !== undefined ? parentId : null,
			isCertPost,
		);
		console.log(newComment);
		res.status(201).json(newComment);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const updateComment = async (req, res, next) => {
	try {
		const commentId = parseInt(req.params.commentid);
		const userId = req.user.id;
		const content = req.body.content;

		const comment = await commentService.getCommentById(commentId);
		if (!comment) return res.status(404).json({ message: "댓글 없음" });
		if (comment.writerId !== userId)
			return res.status(403).json({ message: "권한 없음" });

		const updatedComment = await commentService.updateComment(
			commentId,
			content,
		);
		console.log(updatedComment);
		res.json(updatedComment);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const deleteComment = async (req, res, next) => {
	try {
		const commentId = parseInt(req.params.commentid);
		const userId = req.user.id;
		const comment = await commentService.getCommentById(commentId);

		if (!comment) return res.status(404).json({ error: "댓글 없음" });
		if (comment.writerId !== userId) {
			const group = await groupService.getGroupByPostId(comment.postId);
			//todo 인증게시판 로직
			// const certPost = await certPostService.getCertPostByCommentId(
			// 	commentId,
			// );
			// 인증게시판 서비스 로직에 들어갈꺼
			//getCertPostByCommentId = async (commentId) => {
			//     return await prisma.certPost.findFirst({
			//         where: { comments: { some: { id: commentId } } },
			//     });
			// };
			if (group) {
				const groupUser =
					await groupService.getGroupUserByUserIdAndGroupId(
						userId,
						group.id,
					);
				if (!(groupUser && groupUser.isAdmin)) {
					return res.status(403).json({
						error: "작성자 또는 그룹관리자만 삭제 가능",
					});
				}
			} /*else if (certPost) {
				나중에 인증게시판 구현되면 추가
			} */ else {
				return res.status(404).json({
					error: "찾을 수 없음",
				});
			}
		}

		await commentService.deleteComment(commentId);
		console.log("댓글 삭제 성공");
		res.json({ message: "댓글 삭제 성공" });
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { createComment, updateComment, deleteComment };

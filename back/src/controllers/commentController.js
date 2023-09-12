import commentService from '../services/commentService';
const createComment = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.postid);
    const writerId = req.user.id;
    const content = req.body.content;
    const parentId = req.body.parentId;
    const isCertPost = req.query.cert === 'true';

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

const updateComment = async (req, res, next) => {
  try {
    const commentId = parseInt(req.params.commentid);
    const userId = req.user.id;
    const content = req.body.content;

    const comment = await commentService.getCommentById(commentId);
    if (!comment) return res.status(404).json({ message: '댓글 없음' });
    if (comment.writerId !== userId)
      return res.status(403).json({ message: '권한 없음' });

    const updatedComment = await commentService.updateComment(
      commentId,
      content,
    );
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
    const canDelete = await commentService.canDeleteComment(commentId, userId);
    if (!canDelete) return res.status(403).json({ message: '권한 없음' });
    await commentService.deleteCommentAndChildren(commentId);
    res.status(204).json({ message: '댓글 삭제 :', commentId });
  } catch (error) {
    console.error(error);
    error.status = 500;
    next(error);
  }
};

module.exports = { createComment, updateComment, deleteComment };

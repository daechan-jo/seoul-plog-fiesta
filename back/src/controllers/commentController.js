import commentService from '../services/commentService';
const createComment = async (req, res, next) => {
  /**
   * #swagger.tags = ['Comment']
   * #swagger.summary = '댓글 작성'
   * #swagger.description = 'parentId가 있으면 대댓글, 없으면 댓글 / isCertPost가 true면 인증글 댓글'
   */
  try {
    const postId = parseInt(req.params.postid);
    const writerId = req.user.id;
    const content = req.body.content;
    const parentId = req.body.parentId;
    const isCertPost = req.query.cert;

    const newComment = await commentService.createComment(
      postId,
      writerId,
      content,
      parentId !== undefined ? parentId : null,
      isCertPost,
    );
    return res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  /**
   * #swagger.tags = ['Comment']
   * #swagger.summary = '댓글 수정'
   * #swagger.description = '댓글 작성자만 수정 가능'
   */
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
    return res.status(201).json(updatedComment);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  /**
   * #swagger.tags = ['Comment']
   * #swagger.summary = '댓글 삭제'
   * #swagger.description = '댓글 작성자와 게시글 작성자 삭제 가능'
   */
  try {
    const commentId = parseInt(req.params.commentid);
    const userId = req.user.id;

    const canDelete = await commentService.canDeleteComment(commentId, userId);

    if (!canDelete) return res.status(403).json({ message: '권한 없음' });
    await commentService.deleteCommentAndChildren(commentId);

    return res.status(204).json({ message: '댓글 삭제 :', commentId });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports = { createComment, updateComment, deleteComment };

import router from 'express';
import authenticateJWT from '../../middlewares/authenticateJWT';
import groupController from './groupController';
import groupValidate from '../../middlewares/validates/groupValidate';

const groupRoute = router();

/** @description 그룹 생성 */
groupRoute.post(
  '/group',
  authenticateJWT,
  groupValidate.validateGroupCreation,
  groupController.createGroup,
);

/** @description 모든 그룹 조회 */
groupRoute.get('/group', groupController.getAllGroups);

/** @description 그룹 가입 신청 */
groupRoute.post(
  '/group/join/:groupid',
  authenticateJWT,
  groupController.requestToJoinGroup,
);

/** @description 그룹 가입 신청 목록 조회 */
groupRoute.get(
  '/group/join',
  authenticateJWT,
  groupController.getGroupJoinRequests,
);

/** @description 개별 그룹 가입 신청 목록 조회 */
groupRoute.get(
  '/group/join/req/:groupid',
  authenticateJWT,
  groupController.getGroupJoinRequestsByGroupId,
);

/** @description 그룹 가입 신청 수락 */
groupRoute.post(
  '/group/accept/:groupid/:userid',
  authenticateJWT,
  groupController.acceptRegistration,
);

/** @description 그룹 가입 신청 거절 */
groupRoute.delete(
  '/group/reject/:groupid/:userid',
  authenticateJWT,
  groupController.rejectGroupJoinRequest,
);

/** @description 내가 가입한 그룹 조회 */
groupRoute.get('/group/mygroup', authenticateJWT, groupController.getMyGroups);

/** @description 그룹 멤버 조회 by groupName */
groupRoute.get(
  '/group/members/:groupname',
  authenticateJWT,
  groupController.getGroupMembers,
);

/** @description 나의 그룹 최신 인증글 리스트 */
groupRoute.get(
  '/group/certpost',
  authenticateJWT,
  groupController.getGroupCertPosts,
);

/** @description 개별 그룹 최신 인증글 리스트 */
groupRoute.get(
  '/group/certpost/:groupname',
  groupController.getCertPostsByGroupName,
);

/** @description 그룹 상세정보(멤버 정보) */
groupRoute.get('/group/:groupid', groupController.getGroupDetails);

/** @description 그룹 게시글 작성 */
groupRoute.post(
  '/group/post/:groupid',
  authenticateJWT,
  groupValidate.validateGroupPostCreation,
  groupController.createPost,
);

/** @description 그룹아이디 해당 게시글 전체 목록 */
groupRoute.get(
  '/group/posts/:groupid',
  authenticateJWT,
  groupController.getAllPosts,
);

/** @description 해당 게시글 상세정보 */
groupRoute.get('/group/post/:postid', groupController.getPostById);

/** @description 내가 속한 그룹 최근 게시글 목록 */
groupRoute.get(
  '/group/recent/posts',
  authenticateJWT,
  groupController.getRecentPosts,
);

/** @description 그룹 게시글 수정 */
groupRoute.put(
  '/group/post/put/:postid',
  groupValidate.validateGroupPostUpdate,
  authenticateJWT,
  groupController.editPost,
);

/** @description 그룹 게시글 삭제 */
groupRoute.delete(
  '/group/post/delete/:postid',
  authenticateJWT,
  groupController.deletePost,
);

/** @description 그룹 탈퇴 */
groupRoute.delete(
  '/group/:groupid',
  authenticateJWT,
  groupController.leaveGroup,
);

/** @description 그룹원 추방 */
groupRoute.delete(
  '/group/expulse/:groupid/:userid',
  authenticateJWT,
  groupController.removeGroupMember,
);

/** @description 그룹 삭제 */
groupRoute.delete(
  '/group/drop/:groupid',
  authenticateJWT,
  groupController.dropGroup,
);

export default groupRoute;

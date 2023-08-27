import Router from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import ploggingController from "../controllers/ploggingController"; 

const ploggingRouter = Router();

// request와 response 처리


// 플로깅 인증 게시글 작성
ploggingRouter.post(
  "/plo/board",
  authenticateJWT,
  ploggingController.createCertification
);

// 플로깅 인증 게시글 조회 (전체)
ploggingRouter.get(
  "/plo/board",
  authenticateJWT,
  ploggingController.getAllCertificationBoards
);  

// 플로깅 인증 게시글 조회 (1개)
ploggingRouter.get(
  "/plo/board/:id",
  authenticateJWT,
  ploggingController.getCertification
);  

// 플로깅 인증 게시글 수정
ploggingRouter.put(
  "/plo/board/:id",
  authenticateJWT,
  ploggingController.updateCertification
);


// 플로깅  인증 게시글 삭제
ploggingRouter.delete(
	"/plo/board/drop/:id",
	authenticateJWT,
	ploggingController.deleteCertification,
);


module.exports = ploggingRouter;

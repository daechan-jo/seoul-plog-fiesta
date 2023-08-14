import morgan from "morgan";
import logger from "../config/logger.js";

const morganMiddleware = morgan((tokens, req, res) => {
	const logMessage = `[${tokens.method(req, res)}] ${tokens.url(
		req,
		res
	)} | ${tokens.status(req, res)} | ${tokens.res(
		req,
		res,
		"content-length"
	)} - ${tokens["response-time"](req, res)} ms | [Response] ${JSON.parse(
		req.body
	)}`;

	const statusCode = res.statusCode;
	// 응답 상태가 400 미만인지 확인(성공 응답)
	if (statusCode < 400) {
		logger.info(logMessage);
	}

	return null; // 로그 출력을 수정하지 않음을 나타내기 위해 null을 반환
});

module.exports = morganMiddleware;

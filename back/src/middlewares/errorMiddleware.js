import logger from "../config/logger.js";
function errorMiddleware(error, req, res, next) {
	//todo 가끔 어떤 에러는 상태코드가 없는경우가 있음.
	// 그럼 에러가 에러를 만들어내는 상황이 생기는데 그러면
	// 뭐때문에 에러가 났는지 판단하기 힘들어짐. 이걸 어떻게 처리해야할지 모르겠음.
	// 혹시나 RangeError: Invalid status code: undefined 에러가 발생하면
	// 아래 코드 한줄을 주석처리하고 res.json(error.message);만 사용하면 됨.
	// 디버깅 끝나면 원복해서 다시 사용하시면 됨니다.
	res.status(error.status).json(error.message);
	// res.json(error.message);
	const stackLines = error.stack.split("\n");
	const truncatedStack = stackLines.slice(0, 50).join("\n");
	const reqBodyString = JSON.stringify(req.body);

	logger.error(
		`[${req.method}] ${req.path} | ${error.status} | [REQUEST] ${reqBodyString} | ${truncatedStack}`,
	);
}
module.exports = errorMiddleware;

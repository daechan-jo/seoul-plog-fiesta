import logger from "../config/logger.js";
function errorMiddleware(error, req, res, next) {
	const statusCode = error.status;
	res.status(statusCode).send(error.message);

	const stackLines = error.stack.split("\n");
	const truncatedStack = stackLines.slice(0, 50).join("\n");
	const reqBodyString = JSON.stringify(req.body);

	logger.error(
		`[${req.method}] ${req.path} | ${statusCode} | [REQUEST] ${reqBodyString} | ${truncatedStack}`,
	);
}
module.exports = errorMiddleware;

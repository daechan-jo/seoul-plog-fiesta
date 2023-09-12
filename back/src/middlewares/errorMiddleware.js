import logger from '../config/logger.js';
function errorMiddleware(error, req, res, next) {
  if (error.status === undefined) error.status = 500;
  res.status(error.status).json(error.message);
  const stackLines = error.stack.split('\n');
  const truncatedStack = stackLines.slice(0, 50).join('\n');
  const reqBodyString = JSON.stringify(req.body);

  logger.error(
    `[${req.method}] ${req.path} | ${error.status} | [REQUEST] ${reqBodyString} | ${truncatedStack}`,
  );
}
module.exports = errorMiddleware;

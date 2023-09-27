import logger from '../config/logger';

function errorMiddleware(error, req, res) {
  const modifiedError = { ...error };
  if (modifiedError.status === undefined) modifiedError.status = 500;
  res.status(modifiedError.status).json(modifiedError.message);
  const stackLines = modifiedError.stack.split('\n');
  const truncatedStack = stackLines.slice(0, 50).join('\n');
  const reqBodyString = JSON.stringify(req.body);

  logger.error(
    `[${req.method}] ${req.path} | ${error.status} | [REQUEST] ${reqBodyString} | ${truncatedStack}`,
  );
}
export default errorMiddleware;

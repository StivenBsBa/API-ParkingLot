
import { ResponseMessages } from '../constants/responseMessages.js';

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const responseMessage = err.responseMessage || ResponseMessages.SERVER_ERROR;

  res.status(statusCode).json({
    ...responseMessage,
    error: err.message,
  });
};

export default errorHandler;

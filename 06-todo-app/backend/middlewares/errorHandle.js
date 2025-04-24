import httpStatus from "../constants/httpStatus";

export function notAllowed(req, res, next) {
  res.status(httpStatus.METHOD_NOT_ALLOWED.code).json({
    code: httpStatus.METHOD_NOT_ALLOWED.code,
    message: httpStatus.METHOD_NOT_ALLOWED.message,
  });
}

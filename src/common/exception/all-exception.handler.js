const AllExceptionHandler = (error, req, res, next) => {
  const status = err?.status ?? err?.statusCode ?? err?.code;
  if (!status || isNaN(+status) || status > 511 || status < 200) status = 500;
  res.status(status).jason({
    message: err?.message ?? err?.stack ?? "InternalServerError",
  });
};
module.exports = AllExceptionHandler;

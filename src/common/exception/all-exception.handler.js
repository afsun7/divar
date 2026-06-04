const AllExceptionHandler = (error, req, res, next) => {
  let status = error?.status ?? error?.statusCode ?? error?.code;

  if (
    !status ||
    Number.isNaN(Number(status)) ||
    status < 200 ||
    status > 511
  ) {
    status = 500;
  }

  res.status(Number(status)).json({
    message: error?.message ?? "Internal Server Error",
  });
};

module.exports = AllExceptionHandler;

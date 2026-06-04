const NotFoundHandler = (req, res, next) => {
  res.status(404).jason({
    message: "Not Found Route",
  });
};
module.exports = NotFoundHandler;

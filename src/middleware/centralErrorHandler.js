// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.error(err.stack); // for debugging

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    success: false,
    message,
    // optionally: stack trace only in dev mode
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};

module.exports = errorHandler;

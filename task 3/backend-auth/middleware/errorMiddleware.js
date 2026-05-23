export const errorHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Server error";

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors).map((error) => error.message).join(" | ");
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value detected";
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

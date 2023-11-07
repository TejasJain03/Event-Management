module.exports = (error, req, res, next) => {
  // Check if the headers have already been sent.
  if (res.headersSent) {
    // Cannot set headers after they are sent to the client.
    return;
  }

  // Set the response headers.
  res.setHeader("Content-Type", "application/json");

  // Set the error status code, success flag, and message.
  error.statusCode = error.statusCode || 500;
  error.success = error.success || false;
  error.message = error.message || "Internal Server Error";

  // Handle specific types of errors.
  if (error.name === "CastError" && error.path === "_id") {
    error.statusCode = 400;
    error.message = "Invalid ID";
  }

  if (error.name === "TokenExpiredError") {
    error.statusCode = 401;
    error.message = "Session Expired!";
  }

  // Return the error response.
  return res.status(error.statusCode).send({
    success: error.success,
    message: error.message,
  });
};

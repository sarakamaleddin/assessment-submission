const errorHandler = (err, req, res, next) => {
  console.log("Error:", err.message);

  if (err.name === "ZodError") {
    return res.status(400).json({
      error: "Validation Error",
      message: "Invalid input data",
      details: err.errors,
    });
  }

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: "Invalid token",
    });
  }

  res.status(err.status || 500).json({
    error: err.name || "Internal Server Error",
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message,
  });
};

module.exports = { errorHandler };

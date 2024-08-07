const successResponse = (
  statusCode,
  data,
  message,
  res,
  prev = null,
  next = null,
  total = null
) => {
  res.status(statusCode).json({
    payload: {
      statusCode: statusCode,
      data: data,
      message: message,
    },
    pagination: {
      prev: prev,
      next: next,
      total: total,
    },
  });
};

const errorResponse = (statusCode, message, res, details = null) => {
  res.status(statusCode).json({
    payload: {
      statusCode: statusCode,
      message: message,
      details: details,
    },
  });
};

module.exports = { successResponse, errorResponse };

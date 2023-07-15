const msg = (res, statusCode, status, message, data) => {
  res.status(statusCode).json({
    status: {
      status: status,
      message: message,
    },
    data: data ? data : "",
  });
};

module.exports = {
  msg,
};

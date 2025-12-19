export const ok = (res, message = "Success", data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const created = (res, message = "Created", data = null, statusCode = 201) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const fail = (res, message = "Failed", statusCode = 400, errors = null) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

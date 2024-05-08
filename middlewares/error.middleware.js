export const handleError = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  let message = err.message;
  // if (err instanceof Error) message = "Something went wrong";

  res.render("error", {
    loggedIn: req.session.employee,
    success: false,
    error: message,
  });
};

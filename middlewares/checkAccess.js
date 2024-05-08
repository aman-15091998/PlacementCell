export const checkAccess = (req, res, next) => {
  if (req.session.employee) {
    next();
  } else {
    res.redirect("/error");
  }
};

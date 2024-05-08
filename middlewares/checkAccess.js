export const checkAccess = (req, res, next) => {
  if (req.session.employee) {
    //adding the employee to session object and saving the session
    next();
  } else {
    res.redirect("/error");
  }
};

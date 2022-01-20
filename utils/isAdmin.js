const isAdmin = (req, res, next) => {
    if (!req.session.isAdmin) {
      res.redirect('/admin');
    } else {
      next();
    }
};
  
module.exports = isAdmin;
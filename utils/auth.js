const withAuth = (req, res, next) => {
    if (!req.session.logged_in && req.path !== '/login') {
      res.redirect('/login');
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  
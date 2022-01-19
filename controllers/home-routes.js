const router = require('express').Router();

//When the URL is examplewebsite.com/, then the homepage.handlbars view will be rendered within the main.handlebars layout
router.get('/', (req, res) => {
  res.render('homepage');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/parentDash');
    return;
  }

  res.render('login');
});



router.get('/admin', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/adminDash');
    return;
  }

  res.render('admin');
});
module.exports = router;
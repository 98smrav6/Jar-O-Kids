const router = require('express').Router();
const { Admin } = require('../../models');

// GET /api/admins
router.get('/', (req, res) => {
    Admin.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET /api/admins/1
router.get('/:id', (req, res) => {
    Admin.findOne({
      attributes: { exclude: ['password']},
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user Admin with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// POST /api/admins
router.post('/', (req, res) => {
    // expects {username: 'Lernantino',password: 'P@ssw0rd'}
    Admin.create({
      username: req.body.username,
      password: req.body.password,      
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  // PUT /api/admins/1
  // update password
router.put('/:id', (req, res) => {
    // pass in req.body instead to only update what's passed through
  Admin.update(req.body, {
    individualHooks: true,
    attributes: {exclude: ['username']},
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
      if (!dbUserData[0]) {
        res.status(404).json({ message: 'No Admin found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


//POST - api/admins/login
router.post('/admin', (req, res) => {
  // expects {username: 'admin', password: 'admin'}
  Admin.findOne({
    where: {
      username: req.body.username
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No Admin with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});


//POST - api/admins/logout - destroy/end sessions  
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});
module.exports = router;

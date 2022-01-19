const router = require('express').Router();
const { Parent, Student } = require('../../models');

// GET /api/parents
router.get('/', (req, res) => {
    Parent.findAll({
        attributes: { exclude: ['password']}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// GET /api/parents/1
router.get('/:id', (req, res) => {
  Parent.findOne({
    attributes: { exclude: ['password']},
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Student,
        attributes: ['id', 'student_firstname', 'student_lastname', 'student_grade', 'student_address', 'student_status'],
      },
    ]
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No parent with this id' });
        return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  
// POST /api/parents
router.post('/', (req, res) => {
  // expects {parent_name: 'Lernantino', parent_phone: '987654321', parent_email: 'parent@gmail.com', password: 'P@ssw0rd'}
  Parent.create({
    parent_name: req.body.parent_name,
    parent_phone: req.body.parent_phone,
    parent_email: req.body.parent_email,
    password: req.body.password  
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.parent_name = dbUserData.parent_name;
      req.session.loggedIn = true;
  
      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});


//POST - api/parents/login
router.post('/login', (req, res) => {
  // expects {parent_email: 'parent@gmail.com', password: 'P@ssw0rd'}
  Parent.findOne({
    where: {
      parent_email: req.body.parent_email
    }
  }).then(dbUserData => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No parent with that email address!' });
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
      req.session.username = dbUserData.parent_name;
      req.session.loggedIn = true;

      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  });
});

//POST - api/parents/logout - destroy/end sessions  
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

// DELETE /api/parents/1
router.delete('/:id', (req, res) => {
  Parent.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData) {
      res.status(404).json({ message: 'No Student found with this id' });
      return;
    }
    res.json(dbUserData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;

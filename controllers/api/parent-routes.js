const router = require('express').Router();
const { Parent } = require('../../models');



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
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user parent with this id' });
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
    // expects {parent_name: 'Lernantino', parent_phone: '987654321', parent_email: 'parent@gmail.com',password: 'P@ssw0rd'}
    Parent.create({
      parent_name: req.body.parent_name,
      parent_phone: req.body.parent_phone,
      parent_email: req.body.parent_email,
      password: req.body.password
      
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
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

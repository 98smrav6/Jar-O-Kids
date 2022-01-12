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
    // expects {parent_name: 'Lernantino', parnet_phone: '987654321', parnet_email: 'parent@gmail.com',password: 'P@ssw0rd'}
    Parent.create({
      parent_name: req.body.parent_name,
      parnet_phone: req.body.parnet_phone,
      parnet_email: req.body.parnet_email,
      password: req.body.password
      
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });


  module.exports = router;

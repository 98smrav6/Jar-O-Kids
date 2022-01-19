const router = require('express').Router();
const { Student, Parent } = require('../../models');
const withAuth = require('../../utils/auth.js');

// GET all students /api/students
router.get('/', (req, res) => {
  Student.findAll({
    attributes: [
      'id',
      'student_firstname',
      'student_lastname',
      'student_grade',
      'student_address',
      'student_status'
    ],
    include: [
      {
        model: Parent,
        attributes: ['id', 'parent_name','parent_phone','parent_email']
      }
    ]
  })
  .then(dbPostData => res.json(dbPostData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  
// GET /api/students/1
router.get('/:id', (req, res) => {
  Student.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'student_firstname',
      'student_lastname',
      'student_grade',
      'student_address',
      'student_status'
    ],
    include: [
      {
        model: Parent,
        attributes: ['id', 'parent_name','parent_phone','parent_email']
      }
    ]

  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No student found with this id' });
      return;
    }
    res.json(dbPostData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});
  

// POST /api/students
router.post('/', withAuth, (req, res) => {
  // expects {student_firstname: 'Lernantino', student_lastname: 'lastname', student_grade: 'Grade1',student_address: '123 main st', parent_id: '1'}
  Student.create({
    student_firstname: req.body.student_firstname,
    student_lastname: req.body.student_lastname,
    student_grade: req.body.student_grade,
    student_address: req.body.student_address,
    parent_id: req.session.user_id
    
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// PUT /api/students/1
router.put('/:id', (req, res) => {
  // pass in req.body instead to only update what's passed through
  Student.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if (!dbUserData[0]) {
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


// DELETE /api/students/1
router.delete('/:id', (req, res) => {
  console.log('id', req.params.id);
  Student.destroy({
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

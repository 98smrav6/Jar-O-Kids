const router = require('express').Router();
const { Student, Parent } = require('../models');

//GET all students associated with logged in parent (/parentDash/)
router.get('/', (req, res) => {
  console.log(req.session); 
  Student.findAll({
    where: {
      parent_id: req.session.user_id
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
        attributes: ['parent_name','parent_phone','parent_email']
      }
    ]
  })
  .then(dbStudentData => {
    const students = dbStudentData.map(student => student.get({ plain: true }));
    res.render('parentDash', { students , loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//GET student by id and render edit screen (/parentDash/edit/:id)
router.get('/edit/:id', (req, res) => {
  Student.findByPk(req.params.id, {
    attributes: [
      'student_firstname',
      'student_lastname',
      'student_grade',
      'student_address',
      'student_status'
    ],
    include: [
      {
        model: Parent,
        attributes: ['parent_name','parent_phone','parent_email']
      }
    ]
  })
    .then(dbStudentData => {
      if (dbStudentData) {
        const student = dbStudentData.get({ plain: true });

        res.render('edit-student', {
          student,
          loggedIn: true
        });

      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
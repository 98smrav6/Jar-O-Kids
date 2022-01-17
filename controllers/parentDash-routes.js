const router = require('express').Router();
const { Student, Parent } = require('../models');

//When the URL is examplewebsite.com/, then the parentDash.handlbars view will be rendered within the main.handlebars layout
//Get all students where the logged in user in the associated parent
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
    const student = dbStudentData.map(student => student.get({ plain: true }));
    res.render('parentDash', { student, loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//Get single student where the logged in user in the associated parent 
router.get('/edit/:id', (req, res) => {
  Post.findByPk(req.params.id, {
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
      if (dbStudentData) {
        const student = dbStudentData.get({ plain: true });
        res.render('edit-post', {
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
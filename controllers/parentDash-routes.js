const router = require('express').Router();
const { Student } = require('../models');

//When the URL is examplewebsite.com/, then the parentDash.handlbars view will be rendered within the main.handlebars layout
router.get('/', (req, res) => {
  console.log(req.session);
  router.get('/', (req, res) => {   
    Student.findAll({
      where: {
        parent_id: req.session.parent_id
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
});

module.exports = router;
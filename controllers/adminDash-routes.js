const router = require('express').Router();
const { Student, Parent, Admin } = require('../models');


//Get all students for admin
router.get('/', (req, res) => {
  console.log(req.session); 
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
        attributes: ['parent_name','parent_phone','parent_email']
      }
    ]
  })
  .then(dbAdminData => {
    const admins = dbAdminData.map(admin => admin.get({ plain: true }));
    res.render('adminDash', { admins , loggedIn: true });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

  module.exports = router;
const { Student } = require('../models');

const studentData = [
    {
        student_firstname: 'john',
        student_lastname: 'Smith',
        student_grade: 'Grade1',
        student_address: '123 main st',
        "parent_id": '1'
    },
    {
        student_firstname: 'Weliam',
        student_lastname: 'John',
        student_grade: 'Grade2',
        student_address: '354 main st',
        "parent_id": '2'
    },
    {
        student_firstname: 'Danny',
        student_lastname: 'Martinez',
        student_grade: 'Grade4',
        student_address: '354 main st',
        "parent_id": '1'
    }
];

const seedStudents = () => Student.bulkCreate(studentData);

module.exports = seedStudents;

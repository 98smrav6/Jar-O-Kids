const User = require('./User');
const Parent = require("./Parent");
const Student = require("./Student");
const Admin = require("./Admin");

Parent.hasMany(Student, {
    foreignKey: 'student_id'
});

Student.belongsTo(Parent, {
    foreignKey: 'parent_id',
    onDelete: "cascade"
});

module.exports = { User, Parent, Admin };

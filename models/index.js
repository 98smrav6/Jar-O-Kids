const Student = require("./Student");
const Parent = require("./Parent");
const Admin = require("./Admin");

Parent.hasMany(Student, {
    foreignKey: 'parent_id'
});

Student.belongsTo(Parent)

module.exports = { Student, Parent, Admin };

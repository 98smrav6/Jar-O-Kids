const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Student extends Model {}


Student.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        student_firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_grade: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_status: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'processing'
        }

    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'student'
    }
)

module.exports = Student;

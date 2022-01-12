const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Parent extends Model {}


Parent.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        parent_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parnet_phone: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parnet_email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    }, {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'parent'
    }
)

module.exports = Parent;

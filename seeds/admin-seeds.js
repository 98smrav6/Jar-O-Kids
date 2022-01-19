const { Admin } = require('../models');

const adminData = [
    {
        username: 'admin',
        password: 'password'
    }
];

const seedAdmins = () => Admin.bulkCreate(adminData);

module.exports = seedAdmins;

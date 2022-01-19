const { Admin } = require('../models');

const adminData = [
    {
        username: 'admin',
        password: 'password'
    }
];

const seedAdmins = () => Admin.bulkCreate(adminData, {individualHooks: true});

module.exports = seedAdmins;

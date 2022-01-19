const { Parent } = require('../models');

const parentData = [
    {
        parent_name: 'ahmed lotfey',
        parent_phone: '123456789',
        parent_email: 'me@alotfey.com',
        password: '123456789'
    },
    {
        parent_name: 'John Smith',
        parent_phone: '123456789',
        parent_email: 'john@test.com',
        password: '123456789'
    }
];

const seedParents = () => Parent.bulkCreate(parentData, {individualHooks: true});

module.exports = seedParents;

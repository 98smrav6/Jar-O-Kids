const seedParents = require('./parent-seeds');
const seedStudents = require('./student-seeds')
const seedAdmins = require('./admin-seeds')
const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedParents();
  console.log('\n----- PARENTS SEEDED -----\n');
  await seedStudents();
  console.log('\n----- STUDENTS SEEDED');
  await seedAdmins();
  console.log('\n----- ADMINS SEEDED');
  process.exit(0);
};

seedAll();

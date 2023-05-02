
const pool = require('../db')
const queries = require('../quries/userQuries')




// This route run to create a table
const createUserTable = (req, res) =>{
    const tableExistsQuery = `
  SELECT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_name = 'user'
  )
`;

pool.query(tableExistsQuery)
  .then(res => {
    if (res.rows[0].exists) {
      console.log('User table already exists');
      return;
    } else {
      const createTableQuery = `
        CREATE TABLE "user" (
          id SERIAL PRIMARY KEY,
          user_id VARCHAR(255),
          email VARCHAR(255),
          password VARCHAR(255),
          full_name VARCHAR(255),
          bio VARCHAR(255),
          profile_picture VARCHAR(255),
          phone_number VARCHAR(255),
          gender VARCHAR(255)
        )
      `;
      pool.query(createTableQuery)
        .then(() => {
          console.log('User table created');
        })
        .catch(err => {
          console.error(err);
        });
    }
  })
  .catch(err => {
    console.error(err);
  });
    
}


module.exports = {
    createUserTable
}
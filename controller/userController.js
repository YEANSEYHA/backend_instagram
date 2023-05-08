
const pool = require('../db')
const queries = require('../quries/userQuries')



// Create a new user
const createNewUser = (req, res) => {
  const { user_id, email, password, full_name, bio, profile_picture, phone_number, gender } = req.body;

  const insertUserQuery = `
    INSERT INTO "user" (user_id, email, password, full_name, bio, profile_picture, phone_number, gender)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;

  const values = [user_id, email, password, full_name, bio, profile_picture, phone_number, gender];

  pool.query(insertUserQuery, values)
    .then(result => {
      const newUser = result.rows[0];
      res.status(201).json(newUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

const getAllUsers = (req, res) => {
  const selectAllUsersQuery = `
    SELECT *
    FROM "user"
  `;

  pool.query(selectAllUsersQuery)
    .then(result => {
      const users = result.rows;
      res.status(200).json(users);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const { email, password, full_name, bio, profile_picture, phone_number, gender } = req.body;

  const updateUserQuery = `
    UPDATE "user"
    SET email = $1, password = $2, full_name = $3, bio = $4, profile_picture = $5, phone_number = $6, gender = $7
    WHERE id = $8
    RETURNING *
  `;

  const values = [email, password, full_name, bio, profile_picture, phone_number, gender, id];

  pool.query(updateUserQuery, values)
    .then(result => {
      const updatedUser = result.rows[0];
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};
const deleteUser = (req, res) => {
  const { id } = req.params;

  const deleteUserQuery = `
    DELETE FROM "user"
    WHERE id = $1
    RETURNING *
  `;

  const values = [id];

  pool.query(deleteUserQuery, values)
    .then(result => {
      const deletedUser = result.rows[0];
      res.status(200).json(deletedUser);
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};


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
    createUserTable,
    createNewUser,
    updateUser,
    getAllUsers,
    deleteUser
}
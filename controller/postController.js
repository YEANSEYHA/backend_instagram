const pool = require('../db')
const queries = require('../quries/postQuries')

const addPost = (req, res) =>{
    const {
        userId,
        imageUrl,
        caption,
        location,
        commentCount
    } = req.body;

    pool.query(queries.insertPost,[userId, imageUrl, caption, location, commentCount],(error, results) =>{
        if (error) throw error;
        res.status(201).send("Post Created Successfully!");
    }
    
    )
}
const getPosts = (req, res) =>{

    pool.query(queries.getPosts, (error, results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })

    console.log('Getting posts')
}



// This route run to create a table
const createPostTable = (req, res) =>{
    const tableExistsQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = 'post'
    )
  `;
  
  pool.query(tableExistsQuery)
    .then(res => {
      if (res.rows[0].exists) {
        console.log('Table already exists');
        return Promise.reject('Post table already exists');
      } else {
        // Modyfy the the table property here
        const createTableQuery = `
          CREATE TABLE post (
            id SERIAL PRIMARY KEY,
            userId VARCHAR(255),
            imageUrl VARCHAR(255),
            caption VARCHAR(255),
            location VARCHAR(255),
            commentCount VARCHAR(255),
            "user_id" BIGINT REFERENCES "user" (id)
          )
        `;
        return pool.query(createTableQuery);
      }
    })
    .then(() => {
      console.log('Post table created');
      res.status(201).send('Post table created');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
    
}


module.exports = {
    addPost,
    createPostTable,
    getPosts
}
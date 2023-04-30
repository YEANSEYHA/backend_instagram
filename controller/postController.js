const pool = require('../db')
const queries = require('../quries/postQuries')

const addPost = (req, res) =>{
    const {
        user_id,
        image_url,
        caption,
        location,
        comment_count
    } = req.body;

    pool.query(queries.insertPost,[user_id, image_url, caption, location, comment_count],(error, results) =>{
        if (error) throw error;
        res.status(201).send("Post Created Successfully!");
    }
    
    )
}


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
        const createTableQuery = `
          CREATE TABLE post (
            id SERIAL PRIMARY KEY,
            user_id VARCHAR(255),
            image_url VARCHAR(255),
            caption VARCHAR(255),
            location VARCHAR(255),
            comment_count VARCHAR(255)
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
    createPostTable
}
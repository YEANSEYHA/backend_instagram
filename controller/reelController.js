const pool = require('../db');

const createReelTable = (req, res) => {
  const tableExistsQuery = `
    SELECT EXISTS (
      SELECT 1
      FROM information_schema.tables
      WHERE table_name = 'reel'
    )
  `;

  pool.query(tableExistsQuery)
    .then(result => {
      if (result.rows[0].exists) {
        console.log('Table already exists');
        return Promise.reject('Reel table already exists');
      } else {
        const createTableQuery = `
          CREATE TABLE reel (
            id SERIAL PRIMARY KEY,
            video_url VARCHAR(255),
            caption VARCHAR(255),
            created_at TIMESTAMP DEFAULT NOW(),
            view_count INTEGER DEFAULT 0,
            user_id BIGINT REFERENCES "user" (id)
          )
        `;
        return pool.query(createTableQuery);
      }
    })
    .then(() => {
      console.log('Reel table created');
      res.status(201).send('Reel table created');
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = {
  createReelTable,
};

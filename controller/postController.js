const pool = require('../db')
// const queries = require('./quries')


// const addPost = "INSERT INTO post (postid, userid, username, imageUrl, videoUrl) VALUES ($1, $2, $3, $4, $5)";


const addPost = (req, res) =>{
    const {
        postid,
        userid,
        imageUrl,
        videoUrl
    } = req.body;

    pool.query("INSERT INTO post (postid, userid, imageUrl, videoUrl) VALUES ($1, $2, $3, $4)",
    [postid, userid, imageUrl, videoUrl],(error, results) =>{
        if (error) throw error;
        res.status(201).send("Post Created Successfully!");
    }
    
    )
}

module.exports = {
    addPost
}
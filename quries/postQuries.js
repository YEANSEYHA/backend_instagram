const insertPost = "INSERT INTO post (userId, imageUrl, caption, location, commentCount) VALUES ($1, $2, $3, $4, $5)";
const getPosts = "SELECT * FROM post"



module.exports = {
    insertPost,
    getPosts
}
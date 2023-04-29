
const addPost = "INSERT INTO post (postid, userid, username, imageurl, totallove, comment, videourl) VALUES ($1, $2, $3, $4, $5, $6, $7)";


module.exports = {
    addPost
}
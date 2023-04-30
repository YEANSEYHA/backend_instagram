const insertPost = "INSERT INTO post (user_id, image_url, caption, location, comment_count) VALUES ($1, $2, $3, $4, $5)";

module.exports = {
    insertPost,
}
const createUser = `
  INSERT INTO "user" (user_id, email, password, full_name, bio, profile_picture, phone_number, gender)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING id
`;

module.exports = {
  createUser
};
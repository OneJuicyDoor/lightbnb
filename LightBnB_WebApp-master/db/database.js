const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});

// Users

const getUserWithEmail = function(email) {
  return pool
    .query(`SELECT * FROM users WHERE LOWER(email) = LOWER($1) LIMIT 1;`, [email])
    .then((result) => {
      return result.rows.length > 0 ? result.rows[0] : null;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

const getUserWithId = function(id) {
  return pool
    .query(`SELECT * FROM users WHERE id = $1 LIMIT 1;`, [id])
    .then((result) => {
      return result.rows.length > 0 ? result.rows[0] : null;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

const addUser = function(user) {
  const query = `
    INSERT INTO users (email, name, password) 
    VALUES ($1, $2, $3) 
    RETURNING *;
  `;

  const values = [user.email, user.name, user.password];

  return pool
    .query(query, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

// Reservations

const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`SELECT * FROM reservations WHERE guest_id = $1 LIMIT $2;`, [guest_id, limit])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

// Properties

const getAllProperties = (options, limit = 10) => {
  return pool
    .query(`SELECT * FROM properties LIMIT $1`, [limit])
    .then((result) => {
      console.log(result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const addProperty = function(property) {
  const query = `
    INSERT INTO properties (column1, column2, column3) 
    VALUES ($1, $2, $3) 
    RETURNING *;
  `;

  const values = [property.column1, property.column2, property.column3];

  return pool
    .query(query, values)
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message);
      throw err;
    });
};

module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};

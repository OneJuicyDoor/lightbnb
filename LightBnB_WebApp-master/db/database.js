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
    .query(`SELECT *
    FROM reservations
    JOIN properties ON reservations.property_id = properties.id
    JOIN property_reviews ON properties.id = property_reviews.property_id
    WHERE reservations.guest_id = 1
    GROUP BY properties.id, reservations.id
    ORDER BY reservations.start_date
    LIMIT 10;`, [guest_id, limit])
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
  // Validate the property object
  if (!property) {
    console.log('Invalid property object.');
    return Promise.resolve(null);
  }

  const queryParams = [
    property.owner_id,
    property.title,
    property.description,
    property.thumbnail_photo_url,
    property.cover_photo_url,
    property.cost_per_night,
    property.street,
    property.city,
    property.province,
    property.post_code,
    property.country,
    property.parking_spaces,
    property.number_of_bathrooms,
    property.number_of_bedrooms
  ];

  const queryString = `
    INSERT INTO properties (
      owner_id,
      title,
      description,
      thumbnail_photo_url,
      cover_photo_url,
      cost_per_night,
      street,
      city,
      province,
      post_code,
      country,
      parking_spaces,
      number_of_bathrooms,
      number_of_bedrooms
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `;

  return pool
    .query(queryString, queryParams)
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

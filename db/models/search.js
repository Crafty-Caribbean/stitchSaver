const db = require('../index.js');

module.exports = {
  getResults(keyword, callback) {
    const upperCaseKeyword = `${keyword.toUpperCase()}%`;
    const lowerCaseKeyword = `${keyword.toLowerCase()}%`;
    const query = {
      text: `SELECT json_build_object(
        'users', (SELECT COALESCE(json_agg(users), '[]'::json)
                  FROM (SELECT id, username
                  FROM users
                  WHERE username LIKE $1 OR username LIKE $2) AS users),
        'patterns', (SELECT COALESCE(json_agg(patterns), '[]'::json)
                     FROM (SELECT id, title
                     FROM patterns
                     WHERE title LIKE $3 OR title LIKE $4) AS patterns)) AS results`,
      values: [upperCaseKeyword, lowerCaseKeyword, upperCaseKeyword, lowerCaseKeyword],
    };
    db.connect((err, client, release) => {
      if (err) {
        console.error('Error getting data', err.stack);
      } else {
        client.query(query, (error, result) => {
          release();
          if (error) {
            callback(err.stack);
          } else {
            callback(null, result);
          }
        });
      }
    });
  },
};

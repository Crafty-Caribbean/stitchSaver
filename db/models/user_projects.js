const db = require('../index.js');

module.exports = {
  addProject(userId, patternId, callback) {
    const query = {
      text: 'INSERT INTO public.user_projects(user_id, pattern_id) VALUES ($1, $2)',
      values: [userId, patternId],
    };
    db.connect((err, client, release) => {
      if (err) {
        console.error('Error adding favorite pattern', err.stack);
      }
      client.query(query, (error, results) => {
        release();
        if (error) {
          callback(error.stack);
        }
        callback(null, results);
      });
    });
  },

  updateProgress(userId, projectId, progress, callback) {
    const query = {
      text: 'UPDATE public.user_projects SET progress=$1 WHERE project_id=$3;',
      values: [progress, userId, projectId],
    };
    db.connect((err, client, release) => {
      if (err) {
        console.error('Error updating project progress', err.stack);
      }
      client.query(query, (error, results) => {
        release();
        if (error) {
          callback(error.stack);
        }
        callback(null, results);
      });
    });
  },

  updateCompletedTime(userId, patternId, callback) {
    const query = {
      text: 'UPDATE public.user_projects SET completed_at=NOW() WHERE user_id=$1 AND pattern_id=$2;',
      values: [userId, patternId],
    };
    db.connect((err, client, release) => {
      if (err) {
        console.error('Error updating project complete time', err.stack);
      }
      client.query(query, (error, results) => {
        release();
        if (error) {
          callback(error.stack);
        }
        callback(null, results);
      });
    });
  },

  deleteOneProject()
};

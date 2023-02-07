const pool = require('../db');
const getAnswersByQuestionID = (questionID, page, count) => {
  
  const currCount = count || 5;
  const currPage = page || 1;
  const query = `SELECT(
    json_build_object
    (
      'question', ${questionID},
      'page', ${currPage},
      'count', ${currCount},
      'results',
        (json_agg(
          json_build_object
          (
            'answer_id', answers.id,
            'body', answers.body,
            'date', TO_TIMESTAMP(answers.date_written / 1000),
            'answerer_name', answers.answerer_name,
            'helpfulness', answers.helpful,
            'photos',  (
                          SELECT (json_agg(
                            json_build_object
                            (
                              'id', photos.id,
                              'url', photos.url
                            )
                          )
                       ) FROM photos WHERE photos.answer_id=answers.id)
           )
        )
      )
    )
  ) AS allAnswers
  FROM answers WHERE answers.question_id=${questionID}  limit ${currCount} offset(${currPage * currCount - currCount})`;


  return pool.connect()
    .then(client => {
      return client.query(query)
        .then(data => {
          client.release();
          return data.rows[0]['allanswers'];//all lowercase
        })
        .catch(err => {
          console.log('getAllQuestions Model failed to get data from DB ', err);
          client.release();
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
};

const addPhotos = (answerID, photos) => {
  if (photos.length > 0) {
    photos.forEach(photo => {
      console.log('each photo in forEach:', photo);
      const photoQuery = 'INSERT INTO photos(answer_id, url) VALUES ($1, $2)';
      return pool.connect()
        .then(client=>{
          return client.query(photoQuery, [answerID, photo])
            .then((res)=>{
              client.release();
              return res;
            })
            .catch(err=>{
              console.log('err querying photos table:', err);
              throw err;
            });
        })
        .catch(err=>{
          throw err;
        });
    });
  }
};


const createAnswer = (questionID, body, name, email, photos) => {
 
  const date = Date.parse(new Date());
  //('date after parsing', date): 1667654128000
  const answerQuery = 'INSERT INTO answers (question_id,body,date_written,answerer_name,answerer_email) VALUES ($1, $2, $3, $4, $5) RETURNING id';
  return pool.connect()
    .then(client => {
      return client.query(answerQuery, [questionID, body, date, name, email])
        .then((data) => {
          console.log('Number(data.rows[0].id', Number(data.rows[0].id));
          return addPhotos(Number(data.rows[0].id), photos);
        })
        .catch(err => {
          console.log('createAnswer Model failed to insert to DB ', err);
          client.release();
          throw err;
        });
    })
    .catch(err => {
      throw err;
    });
};

const updateAnswerHelpful = (answerID) => {
  const query = 'UPDATE public.answers SET helpful = helpful+1 WHERE id = $1'; //this works!!! Tested with PgAdmin
  return pool.connect()
    .then(client => {
      return client.query(query, [Number(answerID)])
        .then((res) => {
          client.release();
          return res;
        })
        .catch(err => {
          console.log('updateAnswerHelpful model failed to update DB', err);
          client.release();
          throw err;
        });
    })
    .catch(e => {
      throw e;
    });
};

const updateAnswerReport = (answerID) => {
  const query = 'UPDATE public.answers SET reported = 1 WHERE id = $1'; 
  return pool.connect()
    .then(client => {
      return client.query(query, [Number(answerID)])
        .then((res) => {
          client.release();
          return res;
        })
        .catch(err => {
          console.log('updateAnswerReport model failed to update DB', err);
          client.release();
          throw err;
        });
    })
    .catch(e => {
      throw e;
    });
};

module.exports = {
  getAnswersByQuestionID,
  createAnswer,
  updateAnswerHelpful,
  updateAnswerReport
};

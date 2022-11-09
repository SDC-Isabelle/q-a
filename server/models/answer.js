const pool = require('../db/connection.js');

const getAnswersByQuestionID = (questionID, page, count) => {
  // const query = 'SELECT * FROM questions WHERE product_id = $1';
  console.log('it did get in getAnswersByQuestionID model');
  // const query = `SELECT (json_build_object(
  //   'answer_id', id,
  //   'body', body,
  //   'date', TO_CHAR(TO_TIMESTAMP(date_written/1000), 'DD/MM/YYYY HH24:MI:SS'),
  //   'answerer_name', answerer_name,
  //   'helpfulness', helpful)
  //   ) FROM answers WHERE answers.question_id=$1`;
  //the date format is wrong
  const currCount = count || 5;
  const currPage = page || 1;
  console.log('currCount:', currCount);
  console.log('currPage:', currPage);
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
  FROM answers WHERE answers.question_id=${questionID}  limit ${currCount} offset(${(currPage - 1) * currCount})`;



  // const query = `SELECT(json_build_object
  //   (
  //     'answer_id', id,
  //     'body', body,
  //     'date', TO_CHAR(TO_TIMESTAMP(date_written / 1000), 'DD/MM/YYYY HH24:MI:SS'),
  //     'answerer_name', answerer_name,
  //     'helpfulness', helpful,
  // 'photos',  (SELECT json_agg(json_build_object(
  //                      'id', id,
  //                      'url', url
  //          )) FROM photos WHERE photos.answer_id=answers.id)

  // ))FROM answers WHERE answers.question_id=$1`;//This works in PGAdmin
  return pool.query(query)
    .then(data => {
      console.log('data was successully sent out from DB');

      return data.rows[0]['allanswers'];
    })
    .catch(err => {
      console.log('getAllQuestions Model failed to get data from DB ', err);
      throw err;
    });
};

//this post answer does not work! also needs to update photo table
const createAnswer = (questionID, body, name, email, photos) => {
  const date = Date.parse(new Date());
  console.log('date after parsing', date);//1667654128000
  console.log('body', body)
  console.log('name', name)
  console.log('email', email)
  const query = 'INSERT INTO answers (question_id,body,date_written,answerer_name,answerer_email) VALUES ($1, $2, $3, $4, $5)';
  return pool.query(query, [questionID, body, date, name, email])
    .then((res) => {
      return res;
    })
    .catch(err => {
      console.log('createAnswer Model failed to insert to DB ', err);
      throw err;
    });
};

const updateAnswerHelpful = (answerID) => {
  const query = 'UPDATE public.answers SET helpful = helpful+1 WHERE id = $1'; //this works!!! Tested with PgAdmin
  return pool.query(query, [Number(answerID)])
    .then((res) => {
      return res;
    })
    .catch(err => {
      console.log('updateAnswerHelpful model failed to update DB', err);
      throw err;
    });
};

const updateAnswerReport = (answerID) => {
  const query = 'UPDATE public.answers SET reported = 1 WHERE id = $1'; //this works!!! Tested with PgAdmin
  return pool.query(query, [Number(answerID)])
    .then((res) => {
      return res;
    })
    .catch(err => {
      console.log('updateAnswerReport model failed to update DB', err);
      throw err;
    });
};

module.exports = {
  getAnswersByQuestionID,
  createAnswer,
  updateAnswerHelpful,
  updateAnswerReport
};
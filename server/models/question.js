const pool = require('../db');


const getQuestionsByProductID = (productID, count, page) => {
 
  const query = `SELECT json_build_object
  (
      'product_id', ${productID}::VARCHAR(255),
      'results',
    (SELECT json_agg
      (
        json_build_object
        (
        'question_id', questions.id,
        'question_body', questions.body,
        'question_date',TO_TIMESTAMP(questions.date_written / 1000),
        'asker_name', questions.asker_name,
        'question_helpfulness', questions.helpful,
        'reported', questions.reported,
        'answers',
          (SELECT json_object_agg
            (
              answers.id,
              (SELECT json_build_object
                (
                  'id', answers.id,
                  'body', answers.body,
                  'date', TO_TIMESTAMP(answers.date_written / 1000),
                  'answerer_name', answers.answerer_name,
                  'helpfulness', answers.helpful,
                  'photos',
                    (SELECT COALESCE (json_agg(url),'[]'::json) FROM photos WHERE photos.answer_id = answers.id )
                )
              )
            ) FROM answers WHERE answers.question_id = questions.id)
        )
      ) FROM questions WHERE product_id = ${productID} AND reported = false
      LIMIT ${count} OFFSET(${(page * count) - count})
    )
  ) AS allQuestions`;


  return pool.connect()
    .then(client => {
      return client.query(query)
        .then(res => {
          client.release();
          return res.rows[0]['allquestions'];
          // return res.rows[0].json_build_object; this returns an err
        })
        .catch(err => {
          client.release();
          console.log('getAllQuestions Model failed to get data from DB ', err);
          throw err;
        });
    })
    .catch(err => {
      console.log('pool connection err in questionsQuery', err);
    });
};


const createQuestion = ({ product_id, body, name, email }) => {
  
  const date = Date.parse(new Date());
  //('date after parsing', date)//1667654128000
  const query = 'INSERT INTO questions (product_id,body,date_written,asker_name,asker_email) VALUES ($1, $2, $3, $4, $5)';

  return pool.connect()
    .then(client => {
      return client.query(query, [product_id, body, date, name, email])
        .then(res => {
          client.release();
          return res;
        })
        .catch(err => {
          console.log('createQuestion Model failed to insert to DB ', err);
          client.release();
          throw err;
        });
    })
    .catch(err => {
      console.log('pool connection err in createQuestio:', err);
      throw err;
    });
};

const updateQuestionHelpful = (questionID) => {
  
  const query = 'UPDATE public.questions SET helpful = helpful+1 WHERE id = $1'; 
  return pool.connect()
    .then(client => {
      return client.query(query, [Number(questionID)])
        .then((res) => {
          client.release();
          return res;
        })
        .catch(err => {
          client.release();
          throw err;
        });
    })
    .catch(err => {
      console.log('pool connection err in updateQuestionHelpful: ', err);
      throw err;
    });
};

const updateQuestionReport = (questionID) => {
  const query = 'UPDATE public.questions SET reported = true WHERE id = $1';

  return pool.connect()
    .then(client => {
      return client.query(query, [Number(questionID)])
        .then(res => {
          client.release();
          return res;
        })
        .catch(err => {
          client.release();
          throw err;
        });
    })
    .catch(err=>{
      throw err;
    });
};

module.exports = {
  getQuestionsByProductID,
  createQuestion,
  updateQuestionHelpful,
  updateQuestionReport
};

const { answer } = require('../models/');

const getAnswers = (req, res) => {
  const questionID = req.params.question_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  
  return answer.getAnswersByQuestionID(questionID, page, count)
    .then((result) => {
      res.send(result);
    })
    .catch(err => {
      console.log('getAnswers controller failed to get data from db', err);
      res.sendStatus(500);
    });
};

const postAnswer = (req, res) => {
  const questionID = req.params.question_id;
  const body = req.body.body;
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;
  
  return answer.createAnswer(questionID, body, name, email, photos)
    .then((result) => {
      res.status(201).send('CREATED');
    })
    .catch(err => {
      console.log('postAnswer controller failed to post data to db', err);
      res.sendStatus(500);
    });
};

const putHelpful = (req, res) => {
  // req.params { answer_id: '1' }
  const answerID = req.params.answer_id;
  return answer.updateAnswerHelpful(answerID)
    .then(() => {
      res.status(204);
      res.send('UPDATED');
    })
    .catch(err => {
      console.log('answer putHelpful controller failed to get res from model: ', err);
      res.sendStatus(500);
    });
};

const putReport = (req, res) => {
  const answerID = req.params.answer_id;
  return answer.updateAnswerReport(answerID)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('answer putReport controller failed to get res from model: ', err);
      res.sendStatus(500);
    });
};

module.exports = {
  getAnswers,
  postAnswer,
  putHelpful,
  putReport
};

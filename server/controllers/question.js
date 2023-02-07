const { question } = require('../models/');

const getQuestions = (req, res) => {
  const productID = req.query.product_id; //req.query={ product_id: '1' }
  const count = req.query.count || 5;
  const page = req.query.page || 1;

  return question.getQuestionsByProductID(productID, count, page)
    .then((data)=>{
      res.send(data);
    })
    .catch(err=>{
      console.log('getQuestions controller failed to get data from db', err);
      res.sendStatus(500);
    });
};

const postQuestion = (req, res) => {
  return question.createQuestion(req.body)
    .then(() => {
      res.status(201);
      res.send('CREATED');
    })
    .catch((err) => {
      console.log('create question controller failed to get response from model', err);
      res.status(500);
    });
};


//ex: localhost:3000/qa/questions/1/helpful
const putHelpful = (req, res) => {
  const questionID = req.params.question_id; //req.params = { question_id: '1' }
  return question.updateQuestionHelpful(questionID)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => {
      console.log('question putHelpful controller failed to get res from model: ', err);
      res.sendStatus(500);
    });
};

const putReport = (req, res) => {
  const questionID = req.params.question_id;
  return question.updateQuestionReport(questionID)
    .then(() => {
      res.status(204);
      res.send('UPDATED');
    })
    .catch(err => {
      console.log('question putReport controller failed to get res from model: ', err);
      res.sendStatus(500);
    });
};

module.exports = {
  getQuestions,
  postQuestion,
  putHelpful,
  putReport
};

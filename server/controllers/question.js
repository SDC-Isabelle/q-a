//controller uses its logic to figure out what to do with clients reqs.
const { question } = require('../models/');

const getQuestions = (req, res) => {
  // console.log('req.params inside getQuestions controller', req.params);//{}
  console.log('req.query inside getQuestions controller', req.query);// { product_id: '1' }
  const productID = req.query.product_id;
  console.log('productID inside getQuestionsController', productID);
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  console.log('count:', count);
  console.log('page:', page);
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
  console.log('req.body inside postQuestion controller', req.body);
  //req.body
  //   {
  //   body: 'will this make it to the api?',
  //   name: 'girl',
  //   email: 'girl@gmail.com',
  //   product_id: 1
  // }
  //it takes some time to get to DB
  // question.createQuestion(req.body);
  // res.send('CREATED');
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

//'/:question_id/helpful'
//ex: localhost:3000/qa/questions/1/helpful
const putHelpful = (req, res) => {
  console.log('req.params in controller putHelpful: ', req.params);//{ question_id: '1' }
  // res.send('RECEIVED');
  const questionID = req.params.question_id;
  return question.updateQuestionHelpful(questionID)
    .then(() => {
      res.status(204);
      res.send('UPDATED');//this is supposed to be NO CONTENT
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
      res.send('UPDATED');//this is supposed to be NO CONTENT
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
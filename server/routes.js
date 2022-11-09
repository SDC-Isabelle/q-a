const {question, answer} = require('./controllers');
const { Router } = require('express');
const router = Router();

//----------------Questions Routes--------------------------

//GET /qa/questions Retrieves a list of questions for a particular product.
//This list does not include any reported questions.
//Query Parameter : product_id, page, count
//not parameters, Learn is wrong!
router.get('/', question.getQuestions); //from controller
// router.get('/product_id', question.getQuestions); //this is wrong!


//POST /qa/questions
//adds a question for the given product
//body parameters: body(txt), name(txt), email(txt), product_id(int)
router.post('/', question.postQuestion);

//PUT /qa/questions/:question_id/helpful
//Updates a question to show it was found helpful/Mark as helpful
//parameter: question_id
//response: 204 NO CONTENT
router.put('/:question_id/helpful', question.putHelpful);

router.put('/:question_id/report', question.putReport);

//----------------Answers Routes------------------------------

//GET /qa/questions/:question_id/answers
//Returns answers for a given question. This list does not include any reported answers.
//parameter: question_id
router.get('/:question_id/answers', answer.getAnswers);


router.post('/:question_id/answers', answer.postAnswer);


router.put('/:answer_id/helpful', answer.putHelpful);

router.put('/:answer_id/report', answer.putReport);

//create a router obj, adding routes to it, export it
module.exports = router;

//---------------------Old Testing Code------------------------------------
// const { Router } = require('express');

// const controller = require('./controller.js');

// const router = Router();

// // router.get('/', controller.getAllQuestions);//this works
// router.get('/:product_id', controller.getQuestionsByProductID);



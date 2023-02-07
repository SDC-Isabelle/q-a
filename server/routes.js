const {question, answer} = require('./controllers');
const { Router } = require('express');
const router = Router();


//GET /qa/questions Retrieves a list of questions for a particular product.
//This list does not include any reported questions.
//Query Parameter : product_id, page, count
router.get('/', question.getQuestions); 

//adds a question for the given product
//body parameters: body(txt), name(txt), email(txt), product_id(int)
router.post('/', question.postQuestion);

//Updates a question to show it was found helpful/Mark as helpful
//parameter: question_id
router.put('/:question_id/helpful', question.putHelpful);

router.put('/:question_id/report', question.putReport);

//Returns answers for a given question. This list does not include any reported answers.
//parameter: question_id
router.get('/:question_id/answers', answer.getAnswers);

router.post('/:question_id/answers', answer.postAnswer);

router.put('/:answer_id/helpful', answer.putHelpful);

router.put('/:answer_id/report', answer.putReport);


module.exports = router;





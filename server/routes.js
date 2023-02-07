const {question, answer} = require('./controllers');
const { Router } = require('express');
const router = Router();

//Query Parameter : product_id, page, count
router.get('/', question.getQuestions); 

//body parameters: body(txt), name(txt), email(txt), product_id(int)
router.post('/', question.postQuestion);

//parameter: question_id
router.put('/:question_id/helpful', question.putHelpful);

router.put('/:question_id/report', question.putReport);

//parameter: question_id
router.get('/:question_id/answers', answer.getAnswers);

router.post('/:question_id/answers', answer.postAnswer);

router.put('/:answer_id/helpful', answer.putHelpful);

router.put('/:answer_id/report', answer.putReport);


module.exports = router;





# Atlier System Design

> Technologies used 
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)


> Project description

Atlier API service is the backend of a legacy E-commerce application which has over 1 million products.
Atlier has multiple widgets 
- products widget which displays product details
- questions and answers widget which allows users to submit questions and answers related to the product 
- ratings and reviews widget which allows users to rate and write reviews related to the product
This project is worked with a team of 3 engineers in agile environment. This repo is specifically for questions and answers API service. Q&A service consists of 7 RESTful routes as follows - 

List Questions
GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.

Parameters

Parameter	Type	Description
product_id	integer	Specifies the product for which to retrieve questions.
page	integer	Selects the page of results to return. Default 1.
count	integer	Specifies how many results per page to return. Default 5.
Response

Status: 200 OK

{
  "product_id": "5",
  "results": [{
        "question_id": 37,
        "question_body": "Why is this product cheaper here than other sites?",
        "question_date": "2018-10-18T00:00:00.000Z",
        "asker_name": "williamsmith",
        "question_helpfulness": 4,
        "reported": false,
        "answers": {
          68: {
            "id": 68,
            "body": "We are selling it here without any markup from the middleman!",
            "date": "2018-08-18T00:00:00.000Z",
            "answerer_name": "Seller",
            "helpfulness": 4,
            "photos": []
            // ...
          }
        }
      },
      {
        "question_id": 38,
        "question_body": "How long does it last?",
        "question_date": "2019-06-28T00:00:00.000Z",
        "asker_name": "funnygirl",
        "question_helpfulness": 2,
        "reported": false,
        "answers": {
          70: {
            "id": 70,
            "body": "Some of the seams started splitting the first time I wore it!",
            "date": "2019-11-28T00:00:00.000Z",
            "answerer_name": "sillyguy",
            "helpfulness": 6,
            "photos": [],
          },
          78: {
            "id": 78,
            "body": "9 lives",
            "date": "2019-11-12T00:00:00.000Z",
            "answerer_name": "iluvdogz",
            "helpfulness": 31,
            "photos": [],
          }
        }
      },
      // ...
  ]
}
Answers List
Returns answers for a given question. This list does not include any reported answers.

GET /qa/questions/:question_id/answers

Parameters

Parameter	Type	Description
question_id	integer	Required ID of the question for wich answers are needed
Query Parameters

Parameter	Type	Description
page	integer	Selects the page of results to return. Default 1.
count	integer	Specifies how many results per page to return. Default 5.
Response

Status: 200 OK

{
  "question": "1",
  "page": 0,
  "count": 5,
  "results": [
    {
      "answer_id": 8,
      "body": "What a great question!",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 8,
      "photos": [],
    },
    {
      "answer_id": 5,
      "body": "Something pretty durable but I can't be sure",
      "date": "2018-01-04T00:00:00.000Z",
      "answerer_name": "metslover",
      "helpfulness": 5,
      "photos": [{
          "id": 1,
          "url": "urlplaceholder/answer_5_photo_number_1.jpg"
        },
        {
          "id": 2,
          "url": "urlplaceholder/answer_5_photo_number_2.jpg"
        },
        // ...
      ]
    },
    // ...
  ]
}
Add a Question
Adds a question for the given product

POST /qa/questions

Body Parameters

Parameter	Type	Description
body	text	Text of question being asked
name	text	Username for question asker
email	text	Email address for question asker
product_id	integer	Required ID of the Product for which the question is posted
Response

Status: 201 CREATED

Add an Answer
Adds an answer for the given question

POST /qa/questions/:question_id/answers

Parameters

Parameter	Type	Description
question_id	integer	Required ID of the question to post the answer for
Body Parameters

Parameter	Type	Description
body	text	Text of question being asked
name	text	Username for question asker
email	text	Email address for question asker
photos	[text]	An array of urls corresponding to images to display
Response

Status: 201 CREATED

Mark Question as Helpful
Updates a question to show it was found helpful.

PUT /qa/questions/:question_id/helpful

Parameters

Parameter	Type	Description
question_id	integer	Required ID of the question to update
Response

Status: 204 NO CONTENT

Report Question
Updates a question to show it was reported. Note, this action does not delete the question, but the question will not be returned in the above GET request.

PUT /qa/questions/:question_id/report

Parameters

Parameter	Type	Description
question_id	integer	Required ID of the question to update
Response

Status: 204 NO CONTENT

Mark Answer as Helpful
Updates an answer to show it was found helpful.

PUT /qa/answers/:answer_id/helpful

Parameters

Parameter	Type	Description
answer_id	integer	Required ID of the answer to update
Response

Status: 204 NO CONTENT

Report Answer
Updates an answer to show it has been reported. Note, this action does not delete the answer, but the answer will not be returned in the above GET request.

PUT /qa/answers/:answer_id/report

Parameters

Parameter	Type	Description
answer_id	integer	Required ID of the answer to update
Response

Status: 204 NO CONTENT




## Usage

> Some usage instructions

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies<img width="700" alt="Screen Shot 2022-12-12 at 7 06 32 PM" src="https://user-images.githubusercontent.com/81834520/207188700-914cf38a-1e10-4b8a-945c-467b601109d2.png">


From within the root directory:

```sh
npm install -g webpack
npm install
```


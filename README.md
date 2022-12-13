# Atelier System Design

## Technologies Used 
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white) ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white) ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Project Purpose 
The recent update of the Atelier front end retail web portal that my team and I created have driven an outstanding increase in traffic to our site. While our business has the stock to keep up with the demand, our existing backend system is unable to withstand the web traffic we are experiencing. It calls for a complete redesign of the current backend system that can withstand this traffic.

* Atelier is a modern E-commerce application which has over 1 million products.
It consists of multiple widgets 
- products widget which displays product details
- questions and answers widget which allows users to submit questions and answers related to the product 
- ratings and reviews widget which allows users to rate and write reviews related to the product

## Project Goal 
Support the existing retail web application with a modernized system able to withstand web scale traffic loads. 

## Project Details
This project is worked with a team of 3 engineers in an agile environment. This repo is specifically for questions and answers API service. Q&A service consists of 7 RESTful routes as follows - 


<img width="531" alt="Screen Shot 2022-12-12 at 7 16 29 PM" src="https://user-images.githubusercontent.com/81834520/207193296-3103783a-ef38-4244-b104-c48d249f6466.png">

<img width="531" alt="Screen Shot 2022-12-12 at 7 17 40 PM" src="https://user-images.githubusercontent.com/81834520/207193783-f0fe7fa9-f002-44d8-bbfa-c80c7dc926b7.png">


<img width="531" alt="Screen Shot 2022-12-12 at 7 20 35 PM" src="https://user-images.githubusercontent.com/81834520/207194850-89a07239-2084-4f3d-959f-1bde4d9419fa.png">

<img width="531" alt="Screen Shot 2022-12-12 at 7 21 09 PM" src="https://user-images.githubusercontent.com/81834520/207195081-f864aba1-2e46-4c69-95d0-7bc972bae8c4.png">


<img width="531" alt="Screen Shot 2022-12-12 at 7 23 10 PM" src="https://user-images.githubusercontent.com/81834520/207196023-2dc73da8-8a8b-4c46-83ff-97e2d70c643c.png">

<img width="531" alt="Screen Shot 2022-12-12 at 7 23 27 PM" src="https://user-images.githubusercontent.com/81834520/207196148-db742d8c-6ee9-4f4a-aff7-b7d7c6342889.png">

<img width="531" alt="Screen Shot 2022-12-12 at 7 23 42 PM" src="https://user-images.githubusercontent.com/81834520/207196233-4c00b488-f71b-4272-927e-3cf12e8c1057.png">

<img width="531" alt="Screen Shot 2022-12-12 at 7 23 57 PM" src="https://user-images.githubusercontent.com/81834520/207196296-e12636cf-0ca0-4481-8c2e-04a8495e0b79.png">


<img width="531" alt="Screen Shot 2022-12-12 at 7 24 13 PM" src="https://user-images.githubusercontent.com/81834520/207196341-11155863-81c4-4bfa-9d63-35353ee0d5c8.png">

<img width="531" alt="Screen Shot 2022-12-12 at 7 24 30 PM" src="https://user-images.githubusercontent.com/81834520/207196384-5c0d86d1-988a-4cfe-a7a1-8037926bcef9.png">

## Project Stress-Testing Loade.io Result

GET http://34.205.130.117/qa/questions?product_id=%{*:900000-1000000}
GET questions request, randomized product_id (900K-1M)
Biased dataset selection to last 10% of dataset. 
Low latency 85ms, 14982 sucess responses/15 secs = 998.9rps throughput with 0.1 low error rate
<img width="940" alt="Screen Shot 2022-12-12 at 8 05 19 PM" src="https://user-images.githubusercontent.com/81834520/207200960-c8eddd12-82ab-4050-b8e7-f56dba5e0069.png"> 


## Project Phases
Phase 0: Pick service and initial setup
<br></br>
Phase 1: Create database - perform ELT process and migrate data via Postgres GUI
<br></br>
Phase 2: Create the API - define routes, integrate server and databases
<br></br>
Phase 3: Performance tune the service - stress-test service in development locally with K6
<br></br>
Phase 4: Deploy and benchmark initial performance - deploy services to raw EC2 instances 
<br></br>
Phase 5: Scale the application - stress-test cloud instances with loader.io, optimize the system and repeat!



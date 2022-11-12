# install node
FROM node:12-alpine
RUN apk add --no-cache python2 g++ make
WORKDIR /Q-A
COPY . .
RUN npm install
CMD ["nodemon", "server/index.js"]
EXPOSE 3000

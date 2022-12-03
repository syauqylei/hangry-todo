FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN apk add openjdk11

RUN npm install @openapitools/openapi-generator-cli -g

RUN openapi-generator-cli generate -i openapi.yaml -g nodejs-express-server --additional-properties=serverPort=8080 -o . 

EXPOSE 5000

CMD ["npm", "run", "start"]

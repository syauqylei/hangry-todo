FROM node:16-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . .

RUN npm i

RUN npm run test:cov

EXPOSE 5000

CMD ["npm","run","start"]

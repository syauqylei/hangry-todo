# Hangry-todo
this is a backend app handling a simple todo from user authentication and CRUD operation in todo. For authentication this project uses jwt.

These project has 2 component the api and the docs. The docs is build upon openapi schema. Moreover, MongoDB is used is this project to store user data and todo data.

### Installation
To lauch the server it uses nodejs 16. And you need a MongoDB running in the background. The easy way is to use docker.

```
docker run --name mongodb -d -p 27017:27017 mongo
```

please change accordingly the `MONGO_URI`.

```
export MONGO_URI=mongodb://localhost:27017 #change it with your local mongo uri
export JWT_SECRET=seckretkey
export DEBUG=*
```

Then start the server using scripts that already provided.

```
  npm i
  npm run start
```

the server is run in `http://localhost:5000/`

#### Docker-compose
This project provides docker-compose.yml. Therefore, to set up this project would be easier using command below

```
docker-compose up
```

Consequently, your api-server and swagger-server is ready.

### Documentation

Swagger documentation style is used in this project. To launch the documentation, you can run scripts provided in `package.json`.

```
npm run gen:swagger
cd ./dummy-swagger
npm run start
```

you can access the documentation in `http://localhost:8080/api-docs/`

or you can click here [documentation](./documentation/README.md)
or you can import the file `./docs/openapi.yaml` through POSTMAN

### Testing
This project was developed by using TDD workflow. This project structured as a file would be coupled with testfile `.spec.ts`. To check the testcases and coverage you can run command below.

```
npm run test
npm run test:cov
```

### Caveat: during operation Create of todo
When using api POST /api/todo, you need to provide createdBy and assignee. These fields are a string of ObjectId of mongo. So for you to find out the userId, it's quite impossible using apis because this project does not provide GET /users to list user.

The workaround is for you to register user first and then login to get the jwt token. Then decode it for yourself using jwt website [here](https://jwt.io/). So you get the `userId`, after that you can filled `createdBy` and `assignee` by this Id. To check Authorization middleware. you can just register multiple user and get the userId by doing exactly the same.


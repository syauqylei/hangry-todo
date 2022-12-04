# Hangry-todo
this is a backend app handling a simple todo from user authentication and CRUD operation in todo. For authentication this project uses jwt.

These project has 2 component the api and the docs. The docs is build upon openapi schema. Moreover, MongoDB is used is this project to store user data and todo data.

### Installation
To lauch the server it uses nodejs 16. And you need a MongoDB running in the background. The easy way is to use docker.
```
docker run -d 
    -p 27017:27017 
    --name example-mongo 
    -v mongo-data:/data/db 
    -e MONGODB_INITDB_ROOT_USERNAME=example-user 
    -e MONGODB_INITDB_ROOT_PASSWORD=example-pass 
    mongo:latest
```
please change accordingly the `MONGO_URI`.

```
export MONGO_URI=<ur-mongo_uri>
export JWT_SECRET=seckretkey
export DEBUG=*
```

Then start the server using scripts that already provided.

```
  npm i
  npm run start
```

the server is run in `http://localhost:5000/`


### Documentation

Swagger documentation style is used in this project. To launch the documentation, you can run scripts provided in pa`package.json`.

```
npm run gen:swagger
cd ./dummy-swagger
npm run start
```

you can access the documentation in `http://localhost:8080/api-docs/`

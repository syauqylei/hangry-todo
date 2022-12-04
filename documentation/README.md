# Documentation for Todo

<a name="documentation-for-api-endpoints"></a>
## Documentation for API Endpoints

All URIs are relative to *http://localhost:5000/api*

| Class | Method | HTTP request | Description |
|------------ | ------------- | ------------- | -------------|
| *AuthenticationApi* | [**signInPOST**](Apis/AuthenticationApi.md#signinpost) | **POST** /login | Use this apis to sign in and refresh token |
*AuthenticationApi* | [**signOutPOST**](Apis/AuthenticationApi.md#signoutpost) | **POST** /logout | Use this to invalidate token |
| *SignUpApi* | [**signUpPOST**](Apis/SignUpApi.md#signuppost) | **POST** /register | Add new user |
| *TodoApi* | [**todoGET**](Apis/TodoApi.md#todoget) | **GET** /todo | Use this api to list todos |
*TodoApi* | [**todoPOST**](Apis/TodoApi.md#todopost) | **POST** /todo | Use this api to add a todo |
*TodoApi* | [**todoTodoIdDELETE**](Apis/TodoApi.md#todotodoiddelete) | **DELETE** /todo/{todoId} | Use this api to delete a todo |
*TodoApi* | [**todoTodoIdDonePATCH**](Apis/TodoApi.md#todotodoiddonepatch) | **PATCH** /todo/{todo_id}/{status} | change todo status to done |


<a name="documentation-for-models"></a>
## Documentation for Models

 - [AddTodoRes201](./Models/AddTodoRes201.md)
 - [DelTodoRes200](./Models/DelTodoRes200.md)
 - [EditTodoRes200](./Models/EditTodoRes200.md)
 - [GeneralRes400](./Models/GeneralRes400.md)
 - [GeneralRes500](./Models/GeneralRes500.md)
 - [ListTodoRes200](./Models/ListTodoRes200.md)
 - [SignInReq](./Models/SignInReq.md)
 - [SignInRes200](./Models/SignInRes200.md)
 - [SignOutReq](./Models/SignOutReq.md)
 - [SignOutRes200](./Models/SignOutRes200.md)
 - [SignUpReq](./Models/SignUpReq.md)
 - [SignUpRes201](./Models/SignUpRes201.md)
 - [Todo](./Models/Todo.md)
 - [TodoReq](./Models/TodoReq.md)
 - [TodoRes404](./Models/TodoRes404.md)


<a name="documentation-for-authorization"></a>
## Documentation for Authorization

<a name="bearerAuth"></a>
### bearerAuth

- **Type**: HTTP basic authentication


---
title: Todo v1.0.11
language_tabs:
  - javascript: javascript
language_clients:
  - javascript: ""
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<!-- Generator: Widdershins v4.0.1 -->

<h1 id="todo">Todo v1.0.11</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

An application to manage your daily tasks

Base URLs:

* <a href="http://localhost:5000/api">http://localhost:5000/api</a>

Email: <a href="mailto:syauqilenterano@gmail.com">Support</a> 

# Authentication

- HTTP Authentication, scheme: bearer 

<h1 id="todo-sign-up">Sign Up</h1>

This API handles registration of the user

## sign_upPOST

<a id="opIdsign_upPOST"></a>

> Code samples

```javascript
const inputBody = '{
  "firstName": "John",
  "lastName": "Doe",
  "password": "Abcde_12345",
  "email": "john.doe@mail.com"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/register',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /register`

*Add new user*

> Body parameter

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "password": "Abcde_12345",
  "email": "john.doe@mail.com"
}
```

<h3 id="sign_uppost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SignUpReq](#schemasignupreq)|true|none|

> Example responses

> 201 Response

```json
{
  "statusCode": 201,
  "message": "User <email> is succesfully registered",
  "data": null,
  "error": null
}
```

<h3 id="sign_uppost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Add user is successful|[SignUpRes201](#schemasignupres201)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request is not correct|[GeneralRes400](#schemageneralres400)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[GeneralRes500](#schemageneralres500)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="todo-authentication">Authentication</h1>

This API handles login and user token

## sign_inPOST

<a id="opIdsign_inPOST"></a>

> Code samples

```javascript
const inputBody = '{
  "password": "Abcde_12345",
  "email": "john.doe@mail.com"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/login',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /login`

*Use this apis to sign in and refresh token*

> Body parameter

```json
{
  "password": "Abcde_12345",
  "email": "john.doe@mail.com"
}
```

<h3 id="sign_inpost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SignInReq](#schemasigninreq)|true|none|

> Example responses

> 200 Response

```json
{
  "statusCode": 200,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmFjMDRkLWFlNWUtNDI5Ni1hNWEwLTE3Mjc4MGQxZWZkOCIsIm5hbWUiOiJqb2huIGRvZSIsImVtYWlsIjoiam9obiBkb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.R-lE8F-9yb5g4nbRKC0i_xrzu2ENwjIts0VjoUFWl7I",
  "message": "<email> is successfully signed in",
  "error": null
}
```

<h3 id="sign_inpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Sign in is successfully|[SignInRes200](#schemasigninres200)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request is not correct|[GeneralRes400](#schemageneralres400)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[GeneralRes500](#schemageneralres500)|

<aside class="success">
This operation does not require authentication
</aside>

## sign_outPOST

<a id="opIdsign_outPOST"></a>

> Code samples

```javascript
const inputBody = '{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmFjMDRkLWFlNWUtNDI5Ni1hNWEwLTE3Mjc4MGQxZWZkOCIsIm5hbWUiOiJqb2huIGRvZSIsImVtYWlsIjoiam9obiBkb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.R-lE8F-9yb5g4nbRKC0i_xrzu2ENwjIts0VjoUFWl7I"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json'
};

fetch('http://localhost:5000/api/logout',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /logout`

*Use this to invalidate token*

> Body parameter

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmFjMDRkLWFlNWUtNDI5Ni1hNWEwLTE3Mjc4MGQxZWZkOCIsIm5hbWUiOiJqb2huIGRvZSIsImVtYWlsIjoiam9obiBkb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.R-lE8F-9yb5g4nbRKC0i_xrzu2ENwjIts0VjoUFWl7I"
}
```

<h3 id="sign_outpost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[SignOutReq](#schemasignoutreq)|false|none|

> Example responses

> 200 Response

```json
{
  "data": "{}",
  "message": "User <email> token is successfully invalidated",
  "error": "error",
  "statusCode": 200
}
```

<h3 id="sign_outpost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully invalidate token|[SignOutRes200](#schemasignoutres200)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request is not correct|[GeneralRes400](#schemageneralres400)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[GeneralRes500](#schemageneralres500)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="todo-todo">Todo</h1>

This API handles login and user token

## todoGET

<a id="opIdtodoGET"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/todo',
{
  method: 'GET',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`GET /todo`

*Use this api to list todos*

<h3 id="todoget-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|assignee|query|string(mongoId)|false|none|

> Example responses

> 200 Response

```json
{
  "statusCode": 200,
  "data": [
    {
      "updated_at": "2022-12-04T15:31:35.195Z",
      "due_date": "2022-12-04T15:31:35.195Z",
      "description": "There are few well known GO framework to build backend. Please do comparative study.",
      "created_at": "2022-12-04T15:31:35.195Z",
      "id": "638ca851febc98437e09df2a",
      "title": "Research on Go Frameworks",
      "status": "todo"
    },
    {
      "updated_at": "2022-12-04T15:31:35.195Z",
      "due_date": "2022-12-04T15:31:35.195Z",
      "description": "There are few well known GO framework to build backend. Please do comparative study.",
      "created_at": "2022-12-04T15:31:35.195Z",
      "assignee": "638ca851febc98437e09df2a",
      "createdBy": "638ca851febc98437e09df2a",
      "id": "638ca851febc98437e09df2a",
      "title": "Research on Go Frameworks",
      "status": "todo"
    }
  ],
  "message": "Todos is successfully retrieved",
  "error": null
}
```

<h3 id="todoget-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Successfully get all the todos|[ListTodoRes200](#schemalisttodores200)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request is not correct|[GeneralRes400](#schemageneralres400)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[GeneralRes500](#schemageneralres500)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## todoPOST

<a id="opIdtodoPOST"></a>

> Code samples

```javascript
const inputBody = '{
  "dueDate": "2022-12-04T15:31:35.195Z",
  "description": "There are few popular frameworks to build backend system using Go. For instances, gin, fiber etc. Please do comparative study about those frameworks.",
  "assignee": "638ca851febc98437e09df2a",
  "title": "Research Go Backend framework",
  "createdBy": "638ca851febc98437e09df2a"
}';
const headers = {
  'Content-Type':'application/json',
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/todo',
{
  method: 'POST',
  body: inputBody,
  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`POST /todo`

*Use this api to add a todo*

> Body parameter

```json
{
  "dueDate": "2022-12-04T15:31:35.195Z",
  "description": "There are few popular frameworks to build backend system using Go. For instances, gin, fiber etc. Please do comparative study about those frameworks.",
  "assignee": "638ca851febc98437e09df2a",
  "title": "Research Go Backend framework",
  "createdBy": "638ca851febc98437e09df2a"
}
```

<h3 id="todopost-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[TodoReq](#schematodoreq)|true|none|

> Example responses

> 201 Response

```json
{
  "statusCode": 201,
  "data": null,
  "message": "Todo <todo-id> is successfully added",
  "error": null
}
```

<h3 id="todopost-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|[Created](https://tools.ietf.org/html/rfc7231#section-6.3.2)|Add todo is succesful|[AddTodoRes201](#schemaaddtodores201)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request is not correct|[GeneralRes400](#schemageneralres400)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[GeneralRes500](#schemageneralres500)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## todoTodo_idDonePATCH

<a id="opIdtodoTodo_idDonePATCH"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/todo/{todo_id}/{status}',
{
  method: 'PATCH',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`PATCH /todo/{todo_id}/{status}`

*change todo status to done*

<h3 id="todotodo_iddonepatch-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|todo_id|path|string(mongoId)|true|an id of todo with format mongoId|
|status|path|string|true|desired status to change to|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|todo|
|status|inprogress|
|status|done|

> Example responses

> 200 Response

```json
{
  "statusCode": 200,
  "data": null,
  "message": "Todo <todo_id> is successfully edited",
  "error": null
}
```

<h3 id="todotodo_iddonepatch-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Edit on todo <todo_id> is successful|[EditTodoRes200](#schemaedittodores200)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request is not correct|[GeneralRes400](#schemageneralres400)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Todo id is not found|[TodoRes404](#schematodores404)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[GeneralRes500](#schemageneralres500)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

## todoTodo_idDELETE

<a id="opIdtodoTodo_idDELETE"></a>

> Code samples

```javascript

const headers = {
  'Accept':'application/json',
  'Authorization':'Bearer {access-token}'
};

fetch('http://localhost:5000/api/todo/{todoId}',
{
  method: 'DELETE',

  headers: headers
})
.then(function(res) {
    return res.json();
}).then(function(body) {
    console.log(body);
});

```

`DELETE /todo/{todoId}`

*Use this api to delete a todo*

<h3 id="todotodo_iddelete-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|todoId|path|string(mongoId)|true|an id of todo with format of mongoId|

> Example responses

> 200 Response

```json
{
  "statusCode": 200,
  "data": null,
  "message": "Todo <todo_id> is successfully deleted",
  "error": null
}
```

<h3 id="todotodo_iddelete-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|Delete on todo <todo_id> is successful|[DelTodoRes200](#schemadeltodores200)|
|400|[Bad Request](https://tools.ietf.org/html/rfc7231#section-6.5.1)|Request is not correct|[GeneralRes400](#schemageneralres400)|
|404|[Not Found](https://tools.ietf.org/html/rfc7231#section-6.5.4)|Todo id is not found|[TodoRes404](#schematodores404)|
|500|[Internal Server Error](https://tools.ietf.org/html/rfc7231#section-6.6.1)|Internal Server Error|[GeneralRes500](#schemageneralres500)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
bearerAuth
</aside>

# Schemas

<h2 id="tocS_SignUpReq">SignUpReq</h2>
<!-- backwards compatibility -->
<a id="schemasignupreq"></a>
<a id="schema_SignUpReq"></a>
<a id="tocSsignupreq"></a>
<a id="tocssignupreq"></a>

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "password": "Abcde_12345",
  "email": "john.doe@mail.com"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|firstName|string|false|none|none|
|lastName|string|false|none|none|
|email|string(email)|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_SignUpRes201">SignUpRes201</h2>
<!-- backwards compatibility -->
<a id="schemasignupres201"></a>
<a id="schema_SignUpRes201"></a>
<a id="tocSsignupres201"></a>
<a id="tocssignupres201"></a>

```json
{
  "statusCode": 201,
  "message": "User <email> is succesfully registered",
  "data": null,
  "error": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|error|string|false|none|none|
|data|object|false|none|none|

<h2 id="tocS_SignInReq">SignInReq</h2>
<!-- backwards compatibility -->
<a id="schemasigninreq"></a>
<a id="schema_SignInReq"></a>
<a id="tocSsigninreq"></a>
<a id="tocssigninreq"></a>

```json
{
  "password": "Abcde_12345",
  "email": "john.doe@mail.com"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string|false|none|none|
|password|string|false|none|none|

<h2 id="tocS_SignInRes200">SignInRes200</h2>
<!-- backwards compatibility -->
<a id="schemasigninres200"></a>
<a id="schema_SignInRes200"></a>
<a id="tocSsigninres200"></a>
<a id="tocssigninres200"></a>

```json
{
  "statusCode": 200,
  "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmFjMDRkLWFlNWUtNDI5Ni1hNWEwLTE3Mjc4MGQxZWZkOCIsIm5hbWUiOiJqb2huIGRvZSIsImVtYWlsIjoiam9obiBkb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.R-lE8F-9yb5g4nbRKC0i_xrzu2ENwjIts0VjoUFWl7I",
  "message": "<email> is successfully signed in",
  "error": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|data|string|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_TodoReq">TodoReq</h2>
<!-- backwards compatibility -->
<a id="schematodoreq"></a>
<a id="schema_TodoReq"></a>
<a id="tocStodoreq"></a>
<a id="tocstodoreq"></a>

```json
{
  "dueDate": "2022-12-04T15:31:35.195Z",
  "description": "There are few popular frameworks to build backend system using Go. For instances, gin, fiber etc. Please do comparative study about those frameworks.",
  "assignee": "638ca851febc98437e09df2a",
  "title": "Research Go Backend framework",
  "createdBy": "638ca851febc98437e09df2a"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|
|description|string|false|none|none|
|dueDate|string|false|none|none|
|assignee|string|false|none|none|
|createdBy|string|false|none|none|

<h2 id="tocS_AddTodoRes201">AddTodoRes201</h2>
<!-- backwards compatibility -->
<a id="schemaaddtodores201"></a>
<a id="schema_AddTodoRes201"></a>
<a id="tocSaddtodores201"></a>
<a id="tocsaddtodores201"></a>

```json
{
  "statusCode": 201,
  "data": null,
  "message": "Todo <todo-id> is successfully added",
  "error": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|data|string|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_EditTodoRes200">EditTodoRes200</h2>
<!-- backwards compatibility -->
<a id="schemaedittodores200"></a>
<a id="schema_EditTodoRes200"></a>
<a id="tocSedittodores200"></a>
<a id="tocsedittodores200"></a>

```json
{
  "statusCode": 200,
  "data": null,
  "message": "Todo <todo_id> is successfully edited",
  "error": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|data|string|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_DelTodoRes200">DelTodoRes200</h2>
<!-- backwards compatibility -->
<a id="schemadeltodores200"></a>
<a id="schema_DelTodoRes200"></a>
<a id="tocSdeltodores200"></a>
<a id="tocsdeltodores200"></a>

```json
{
  "statusCode": 200,
  "data": null,
  "message": "Todo <todo_id> is successfully deleted",
  "error": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|data|string|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_ListTodoRes200">ListTodoRes200</h2>
<!-- backwards compatibility -->
<a id="schemalisttodores200"></a>
<a id="schema_ListTodoRes200"></a>
<a id="tocSlisttodores200"></a>
<a id="tocslisttodores200"></a>

```json
{
  "statusCode": 200,
  "data": [
    {
      "updated_at": "2022-12-04T15:31:35.195Z",
      "due_date": "2022-12-04T15:31:35.195Z",
      "description": "There are few well known GO framework to build backend. Please do comparative study.",
      "created_at": "2022-12-04T15:31:35.195Z",
      "id": "638ca851febc98437e09df2a",
      "title": "Research on Go Frameworks",
      "status": "todo"
    },
    {
      "updated_at": "2022-12-04T15:31:35.195Z",
      "due_date": "2022-12-04T15:31:35.195Z",
      "description": "There are few well known GO framework to build backend. Please do comparative study.",
      "created_at": "2022-12-04T15:31:35.195Z",
      "assignee": "638ca851febc98437e09df2a",
      "createdBy": "638ca851febc98437e09df2a",
      "id": "638ca851febc98437e09df2a",
      "title": "Research on Go Frameworks",
      "status": "todo"
    }
  ],
  "message": "Todos is successfully retrieved",
  "error": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|data|[[Todo](#schematodo)]|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_TodoRes404">TodoRes404</h2>
<!-- backwards compatibility -->
<a id="schematodores404"></a>
<a id="schema_TodoRes404"></a>
<a id="tocStodores404"></a>
<a id="tocstodores404"></a>

```json
{
  "statusCode": 404,
  "message": "Todo <todo_id> is not found",
  "data": "string",
  "error": "string"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|data|string|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_Todo">Todo</h2>
<!-- backwards compatibility -->
<a id="schematodo"></a>
<a id="schema_Todo"></a>
<a id="tocStodo"></a>
<a id="tocstodo"></a>

```json
{
  "updated_at": "2022-12-04T15:31:35.195Z",
  "dueDate": "2022-12-04T15:31:35.195Z",
  "description": "There are few well known GO framework to build backend. Please do comparative study.",
  "created_at": "2022-12-04T15:31:35.195Z",
  "id": "638cbc6a86aa4509c94e4192",
  "assignee": "638cbc6a86aa4509c94e4191",
  "createdBy": "638cbc6a86aa4509c94e4191",
  "title": "Research on Go Frameworks",
  "status": "todo"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|false|none|none|
|title|string|false|none|none|
|description|string|false|none|none|
|status|string|false|none|none|
|due_date|string|false|none|none|
|createdBy|string|false|none|none|
|assignee|string|false|none|none|
|created_at|string|false|none|none|
|updated_at|string|false|none|none|

<h2 id="tocS_SignOutReq">SignOutReq</h2>
<!-- backwards compatibility -->
<a id="schemasignoutreq"></a>
<a id="schema_SignOutReq"></a>
<a id="tocSsignoutreq"></a>
<a id="tocssignoutreq"></a>

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliNmFjMDRkLWFlNWUtNDI5Ni1hNWEwLTE3Mjc4MGQxZWZkOCIsIm5hbWUiOiJqb2huIGRvZSIsImVtYWlsIjoiam9obiBkb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.R-lE8F-9yb5g4nbRKC0i_xrzu2ENwjIts0VjoUFWl7I"
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|token|string|false|none|none|

<h2 id="tocS_SignOutRes200">SignOutRes200</h2>
<!-- backwards compatibility -->
<a id="schemasignoutres200"></a>
<a id="schema_SignOutRes200"></a>
<a id="tocSsignoutres200"></a>
<a id="tocssignoutres200"></a>

```json
{
  "data": "{}",
  "message": "User <email> token is successfully invalidated",
  "error": "error",
  "statusCode": 200
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|data|object|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_GeneralRes400">GeneralRes400</h2>
<!-- backwards compatibility -->
<a id="schemageneralres400"></a>
<a id="schema_GeneralRes400"></a>
<a id="tocSgeneralres400"></a>
<a id="tocsgeneralres400"></a>

```json
{
  "statusCode": 400,
  "message": "string",
  "error": "The request body is not correct."
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|error|string|false|none|none|

<h2 id="tocS_GeneralRes500">GeneralRes500</h2>
<!-- backwards compatibility -->
<a id="schemageneralres500"></a>
<a id="schema_GeneralRes500"></a>
<a id="tocSgeneralres500"></a>
<a id="tocsgeneralres500"></a>

```json
{
  "statusCode": 500,
  "message": null,
  "error": null,
  "data": null
}

```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|statusCode|integer|false|none|none|
|message|string|false|none|none|
|error|string|false|none|none|
|data|object|false|none|none|


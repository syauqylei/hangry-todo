# TodoApi

All URIs are relative to *http://localhost:5000/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**todoGET**](TodoApi.md#todoGET) | **GET** /todo | Use this api to list todos |
| [**todoPOST**](TodoApi.md#todoPOST) | **POST** /todo | Use this api to add a todo |
| [**todoTodoIdDELETE**](TodoApi.md#todoTodoIdDELETE) | **DELETE** /todo/{todoId} | Use this api to delete a todo |
| [**todoTodoIdDonePATCH**](TodoApi.md#todoTodoIdDonePATCH) | **PATCH** /todo/{todo_id}/{status} | change todo status to done |


<a name="todoGET"></a>
# **todoGET**
> ListTodoRes200 todoGET(assignee)

Use this api to list todos

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **assignee** | **String**|  | [optional] [default to null] |

### Return type

[**ListTodoRes200**](../Models/ListTodoRes200.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="todoPOST"></a>
# **todoPOST**
> AddTodoRes201 todoPOST(TodoReq)

Use this api to add a todo

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **TodoReq** | [**TodoReq**](../Models/TodoReq.md)|  | |

### Return type

[**AddTodoRes201**](../Models/AddTodoRes201.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="todoTodoIdDELETE"></a>
# **todoTodoIdDELETE**
> DelTodoRes200 todoTodoIdDELETE(todoId)

Use this api to delete a todo

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **todoId** | **String**| an id of todo with format of mongoId | [default to null] |

### Return type

[**DelTodoRes200**](../Models/DelTodoRes200.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

<a name="todoTodoIdDonePATCH"></a>
# **todoTodoIdDonePATCH**
> EditTodoRes200 todoTodoIdDonePATCH(todo\_id, status)

change todo status to done

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **todo\_id** | **String**| an id of todo with format mongoId | [default to null] |
| **status** | **String**| desired status to change to | [default to null] [enum: todo, inprogress, done] |

### Return type

[**EditTodoRes200**](../Models/EditTodoRes200.md)

### Authorization

[bearerAuth](../README.md#bearerAuth)

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json


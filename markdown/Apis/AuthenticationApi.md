# AuthenticationApi

All URIs are relative to *http://localhost:5000/api*

| Method | HTTP request | Description |
|------------- | ------------- | -------------|
| [**signInPOST**](AuthenticationApi.md#signInPOST) | **POST** /login | Use this apis to sign in and refresh token |
| [**signOutPOST**](AuthenticationApi.md#signOutPOST) | **POST** /logout | Use this to invalidate token |


<a name="signInPOST"></a>
# **signInPOST**
> SignInRes200 signInPOST(SignInReq)

Use this apis to sign in and refresh token

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **SignInReq** | [**SignInReq**](../Models/SignInReq.md)|  | |

### Return type

[**SignInRes200**](../Models/SignInRes200.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

<a name="signOutPOST"></a>
# **signOutPOST**
> SignOutRes200 signOutPOST(SignOutReq)

Use this to invalidate token

### Parameters

|Name | Type | Description  | Notes |
|------------- | ------------- | ------------- | -------------|
| **SignOutReq** | [**SignOutReq**](../Models/SignOutReq.md)|  | [optional] |

### Return type

[**SignOutRes200**](../Models/SignOutRes200.md)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json


# RTI News App API Documentation

## 📌 Overview

This is the backend API documentation for a comprehensive RTI News App. The API provides endpoints for user authentication, profile management, news posts, RTI Reporter, RTI Activies and AWS integrations.

---

## 🔗 Base URL

```
http://localhost:3000/api/v1
```

## Contents

- **[Authentication](#🔒-authentication)**
---

## 🔒 Authentication

All protected endpoints require authentication. Authentication is handled via JWT bearer tokens.

**Example:**

```
Authorization: Bearer <your_jwt_token>
```

---

## 🚪 Authentication Endpoints

### POST `/auth/signup`

**Description:** User sign up with  Phone Number. Phone Number is varified by firebase (frontend). If new user, Phone Number is stored in MongoDB. Then generate JWT token for private API.

**Request Body:**

```headers.authorization
{
  "idToken": "string"     // This token is sent via headers.Authorization. 
  }
```

**Responses:**

- `200`: Successful login
- `400`: Invalid data

---

### POST `/auth/phone`

**Description:** User login with Phone Number. It will not used in  production.

**Request Body:**

```json
{
  "phone": "number",
}
```

**Responses:**

- `200`: Successful login
- `400`: Unauthorized

---



## 👤 User Endpoints


### GET `/profile/fetchprofile/`

**Description:** Get user by providing authentication jwt token.

**Parameters:**

- `jwt token` header.Authentication

**Responses:**

- `200`: User details retrieved successfully
- `404`: User not found

--cription:** Delete user.



### PATCH `profile/updateprofile`

**Description:** Update user profile. filed like email, phone, userName, fullName

**Parameters:**

- `jwt token` header.Authentication

**Request Body:**

```json
{
  "userName": "string",
  "fullName": "string",
  "email":"string",
  "phone":"phone",
}
```

**Responses:**

- `200`: Profile updated successfully
- `400`: Invalid update data

## news

### PATCH `/news/updatenews/`

**Description:** upload news 

**Parameters:**

- `jwt token` header.Authentication


**Request Body:**

```json
{
     "userId": "string",
      "headline": "string",
      "description": "string",
      "location": "string",
      "category": "string",
      "language": "string",
      "image": "string",
      "video": "string",
}
```

**Responses:**

- `200`: news from newsdata retrieved successfully
- `404`: User not found

--cription:** Delete user.


### POST `/news/uploadnews/`

**Description:** upload news 

**Parameters:**

- `jwt token` header.Authentication


**Request Body:**

```json
{
     "userId": "string",
      "headline": "string",
      "description": "string",
      "location": "string",
      "category": "string",
      "language": "string",
      "image": "string",
      "video": "string",
}
```

**Responses:**

- `200`: news from newsdata retrieved successfully
- `404`: User not found

--cription:** Delete user.


### GET `/news/newsdata/`

**Description:** Get news through third party API.

**Parameters:**

- `jwt token` header.Authentication

**Responses:**

- `200`: news from newsdata retrieved successfully
- `404`: User not found

--cription:** Delete user.

### GET `/news/fetchnews/`

**Description:** Get news based on language and category.

**Parameters:**

- `jwt token` header.Authentication

**Request Body:**

```json
{
  "language": "string",
  "category": "string",
}
```


**Responses:**

- `200`: news from newsdata retrieved successfully
- `404`: User not found

--cription:** Delete user.


## notifications

### POST `notification/savetoken`

**Discription** frontend will be send token and platform

**Parameters:**

- `jwt token` header.Authentication

**Request Body:**

```json
{
  "token": "string",
  "platform": "string",
}
```

**Responses:**

- `200`:token saved 
- `404`: User not found







## 🔐 Security

All endpoints are secured using JWT authentication. A valid JWT token must be provided in the Authorization header for all protected endpoints.

```
Authorization: Bearer <your_jwt_token>
```

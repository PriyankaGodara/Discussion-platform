# Discussion Platform Backend

## Overview

This project is a backend for a discussion platform where users can register, login, follow other users, create discussions, comment, like posts, and search for posts using hashtags with Elasticsearch. The backend is built using Node.js, Express, MongoDB, and Elasticsearch, with JWT tokens for authentication.

## High-Level Design Document

### System Architecture

The system consists of the following main components:

- **User Management:** Handles user registration, login, profile update, and follow/unfollow functionalities.
- **Discussion Management:** Manages creation, updating, deletion, and retrieval of discussions.
- **Comment and Like Management:** Allows users to comment on discussions and like posts and comments.
- **Search Functionality:** Uses Elasticsearch to search discussions based on hashtags and text.
- **Authentication:** Uses JWT tokens for secure user authentication.

### Diagram

![System Architecture](./diagrams/system-architecture.png)

## Detailed Description of Each Component

### User Management

- **User Registration:** Allows new users to sign up by providing name, mobile number, email, and password.
- **User Login:** Allows existing users to log in by providing email and password.
- **User Profile Update:** Allows users to update their profile information.
- **Follow/Unfollow:** Allows users to follow or unfollow other users.

### Discussion Management

- **Create Discussion:** Allows users to create new discussions with text, optional image, and hashtags.
- **Update Discussion:** Allows users to update their discussions.
- **Delete Discussion:** Allows users to delete their discussions.
- **Retrieve Discussions:** Allows users to retrieve discussions based on hashtags or text.

### Comment and Like Management

- **Comment on Discussion:** Allows users to comment on discussions.
- **Like Discussion/Comment:** Allows users to like discussions and comments.
- **Update/Delete Comment:** Allows users to update or delete their comments.

### Search Functionality

- **Search by Hashtags:** Uses Elasticsearch to search for discussions based on multiple hashtags.
- **Search by Text:** Uses Elasticsearch to search for discussions based on text content.

### Authentication

- **JWT Tokens:** Uses JWT tokens for authenticating users and protecting routes.

## Database Schema

### User Collection

### User Collection

| Field     | Type   | Description               |
| --------- | ------ | ------------------------- |
| name      | String | User's name               |
| mobileNo  | String | User's mobile number      |
| email     | String | User's email              |
| password  | String | User's hashed password    |
| following | Array  | List of followed user IDs |

### Discussion Collection

| Field     | Type     | Description                                      |
| --------- | -------- | ------------------------------------------------ |
| user      | ObjectId | Reference to the User who created the discussion |
| text      | String   | Text content of the discussion                   |
| image     | String   | URL of the image associated with the discussion  |
| hashtags  | Array    | List of hashtags associated with the discussion  |
| likes     | Array    | List of user IDs who liked the discussion        |
| comments  | Array    | List of comments on the discussion               |
| date      | Date     | Date when the discussion was created             |
| viewCount | Number   | Number of views of the discussion                |

### Comment Subdocument

| Field | Type     | Description                            |
| ----- | -------- | -------------------------------------- |
| user  | ObjectId | Reference to the User who commented    |
| text  | String   | Text content of the comment            |
| likes | Array    | List of user IDs who liked the comment |
| date  | Date     | Date when the comment was created      |

### Swagger Apis Docs 
# example-swagger-autogen

Install the dependencies:

```bash
$ npm install
```
Use the command below to generate the documentation at project startup:
```bash 
$ node swagger.js
```
Run the project and access the documentation at:

[http://localhost:5000/api-docs](http://localhost:5000/api-docs)

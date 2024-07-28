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
 

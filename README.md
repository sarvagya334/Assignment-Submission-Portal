# Assignment Submission Portal

## Overview
The Assignment Submission Portal is a web application designed to facilitate the submission and management of assignments. Users can register, log in, and upload assignments, while admins can review, accept, or reject these submissions.

## Features
- **User Registration and Login**: Users can register and log in to the platform.
- **Assignment Upload**: Users can upload assignments linked to specific tasks and admins.
- **Admin Functions**: Admins can register, log in, view assignments tagged to them, and accept or reject submissions.
- **Validation**: All inputs are validated to ensure data integrity.
  
## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose

## API Endpoints

### User Endpoints
- **POST users/register**: Register a new user.
  - Request Body: 
    ```json
    {
        "username": "Soumik",
        "password": "your_password"
    }
    ```

- **POST users/login**: User login.
  - Request Body: 
    ```json
    {
        "username": "Soumik",
        "password": "your_password"
    }
    ```

- **POST users/upload**: Upload an assignment.
  - Request Body: 
    ```json
    {
        "userId": "Soumik",
        "task": "Hello World",
        "admin": "Alok"
    }
    ```

- **GET users/allAdmins**: Fetch all admins.

### Admin Endpoints
- **POST admins/register**: Register a new admin.
  - Request Body: 
    ```json
    {
        "username": "Alok",
        "password": "your_password"
    }
    ```

- **POST admins/login**: Admin login.
  - Request Body: 
    ```json
    {
        "username": "Alok",
        "password": "your_password"
    }
    ```

- **GET admins/assignments**: View assignments tagged to the admin.

- **POST admins/assignments/:id/accept**: Accept an assignment.

- **POST admins/assignments/:id/reject**: Reject an assignment.
  
-**id in admins/assignments/:id/reject & admins/assignments/:id/accept is the _id of Assignment in MongoDB as it will help us to perform this operation only on one assignment.**

##How to Run to Project

-clone the project

```bash
git clone https://github.com/sarvagya334/Assignment-Submission-Portal.git
```
-go to project

```bash
cd Assignment-Submission-Portal
```
-download all dependencies(ths will install all necessary packages from package.json) 

```bash
npm i
```
-run the app.js file
```bash
node src/app.js
```
**Now the application is running**






# Booksrore Management System

This is a **Bookstore Management System** built using **NestJS**, **TypeScript** and **PostgreSQL**. The system enables role-based management of bookstores, books, and users, offering CRUD operations, role-based access control, and efficient database handling.

---
###

 <img align="right" src="https://media.everskies.com/dVC4lEsehh3IGjKzTUst.png" alt="image" height="250px"/> 


###

<h3 align="left">Table of Content</h3>


- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Documentation](#documentation)
- [Contact](#contact)


###

---

## Features

- **Role-Based Access Control (RBAC)**:
  - Admin, Bookstore Manager, and User roles. (Can be added)
- **CRUD Operations**:
  - Manage bookstores, books, users, and roles.
- **Filtering, and Sorting**:
  - Handle large datasets efficiently.
- **Authentication and Authorization**:
  - Secure access using JWT.
- **Error Handling**:
  - Custom error messages and middleware for centralized error management.

---

## Technologies Used

- **Backend Framework:** [NestJS](https://nestjs.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [TypeORM](https://typeorm.io/)
- **Authentication:** JWT (JSON Web Token)
- **Other Dependencies:**
  - bcrypt
  - dotenv
  - class-validator

---

## Installation

Follow the steps below to set up the project on your local machine.

### Prerequisites

- **Node.js** installed on your machine.
- **PostgreSQL** database setup.

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/bygt/bookstore-management-system
   cd book-management-system
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DB_NAME=your_db_name
   DB_USERNAME=your_db-username
   DB_PASSWORD=your_db-password
   DB_HOST=localhost
   DB_TYPE=postgres
   DB-PORT=5432
   JWT_SECRET=your_secret_key
   ```

4. **Database Configuration**


      This project uses **TypeORM** for database management. The database schema is automatically generated based on the defined entities.
      
      #### How Schema is Created
      The schema is created dynamically by TypeORM during runtime. To enable this, ensure the `synchronize` option is set to `true` in your TypeORM configuration file 
      (`ormconfig.json` or `app.module.ts`):
      
      ```json
      {
        "synchronize": true
      }
      ```
      
      > **Note:** While the `synchronize` option is convenient for development purposes, it is not recommended for production environments. For production, using migrations to handle schema changes is the preferred approach.




5. **Start the Application:**
   For development mode:
   ```bash
   npm run start
   ```
   If you want to develop with Nodemon, you can also use:
    ```bash
   npm run dev
   ```
---

## Project Structure

> 📁 src  
> ├── 📂 auth             # Authentication and Authorization logic  
> ├── 📂 users            # User-related modules and controllers  
> ├── 📂 bookstores       # Bookstore management modules  
> ├── 📂 books            # Book management modules  
> ├── 📂 roles            # Role and permission management              
> ├── 📂 guards           # Role and Auth Guards       
> ├── 📂 utils            # Error handling management           
> └── main.ts           # Application entry point  

---

## API Endpoints

### User Endpoints

- **POST /user/sign-up** - Signup with username, email and password.
- **Get /user/all** - Get all users with pagination and filtering.

### Bookstore Endpoints 

- **POST /bookstore/add** - Add a new bookstore.
- **POST /bookstore/list** - List bookstores with filters.
- **POST /bookstore/info** - Get spesific bookstore info with its books.
- **POST /bookstore/update** - Update bookstore details.
- **POST /bookstores/delete** - Delete a bookstore with its books.

### Book Endpoints

- **POST /book/add** - Add a new book.
- **POST /book/list** - List books and filter by name.
- **POST /book/info** - Get spesific book info with relations.
- **POST /books/update** - Update book details.
- **POST /books/delete** - Delete a book.

### Role Endpoints

- **POST /role/add** - Create a new role.
- **GET /role/:id** - Get spesific role info.
- **POST /roles/addPermission** - add a role or update role status

---

## Documentation

 Swagger Setup: This project uses Swagger to generate API documentation. The setup can be found in the `swagger.ts` file. 
 
 Accessing the Documentation: After running the application, the API documentation is accessible at:
 ```bash
 http://localhost:3000/api-docs
 ```
 All API endpoints, request bodies, and response structures are documented. You can make requests directly from the UI to see responses and debug the API easily.

---


## Contact
For questions or feedback, please reach out to:
- *GitHub*: [Buse Yiğit](https://github.com/bygt)
- *LinkedIn*: [Buse Yiğit](https://www.linkedin.com/in/buse-yigit/)
- *Email*: [buseyigit01@gmail.com](mailto:buseyigit01@gmail.com)


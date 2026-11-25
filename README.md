# ELEC 3 – Node.js Activities

**Name:** Alina E. Viray
**Section:** IV-BSIT C
**Course:** ELEC 3 – Node.js

## About This Repository

This repository contains my completed activities for ELEC 3 – Node.js. It covers the basic use of Node.js, npm and package management, modules, file handling, HTTP servers, REST APIs, and middleware.

The activities are divided into two sets:

- **Set 1:** N1 to N3
- **Set 2:** N4 to N6

Each activity has its own folder containing the source code and screenshots of the program or application being tested.

---

## Set 1 – Node.js Fundamentals

### N1 – Project Setup and Package Management

**Folder:** [`set1/n1-setup`](set1/n1-setup/)

This activity focuses on setting up a Node.js project using npm. It includes checking the installed Node.js and npm versions, initializing a project with `npm init`, installing packages, and configuring the `package.json` file. It also demonstrates how to run the application using an npm start script.

**How to run:**

```bash
cd set1/n1-setup
npm install
npm start
```

**Screenshot:**

![N1 – npm start output](set1/n1-setup/screenshots/n1-npm-start.png)

### N2 – Modular Calculator

**Folder:** [`set1/n2-calculator`](set1/n2-calculator/)

This activity demonstrates how to organize a Node.js program using modules. The calculator uses separate files for mathematical operations and result formatting. It uses `require()` and `module.exports` to import and export functions. It also accepts command-line arguments through `process.argv` and handles invalid operations and division by zero.

**How to run:**

```bash
cd set1/n2-calculator
node index.js add 12 8
```

Other operations can be tested by changing `add` to `subtract`, `multiply`, `divide`, or `average`.

**Screenshot:**

![N2 – Calculator output](set1/n2-calculator/screenshots/n2-calculator.png)

### N3 – File Manager with fs and path

**Folder:** [`set1/n3-file-manager`](set1/n3-file-manager/)

This activity demonstrates file management using Node.js built-in `fs` and `path` modules. The program can create, read, update, delete, and list text files. It stores the files inside a `files` folder and uses path utilities to get file names and extensions. It also handles errors when a requested file does not exist.

**How to run:**

```bash
cd set1/n3-file-manager
node index.js
```

Use the commands supported by the program, such as:

```bash
node index.js create notes.txt "Hello"
node index.js read notes.txt
node index.js update notes.txt " Additional text"
node index.js list
node index.js delete notes.txt
```

**Screenshot:**

![N3 – File Manager output](set1/n3-file-manager/screenshots/n3-file-manager.png)

---

## Set 2 – Node.js Server and API Development

### N4 – Basic HTTP Server

**Folder:** [`set2/n4-server`](set2/n4-server/)

This activity demonstrates how to create a basic web server using Node.js's built-in `http` module. The server listens on port `8000` and responds to different routes, including the home page, about page, and contact page. It also returns a 404 response for routes that are not available. Each response uses the appropriate status code and Content-Type header.

**How to run:**

```bash
cd set2/n4-server
node index.js
```

Open these URLs in a browser:

- Home: `http://localhost:8000/`
- About: `http://localhost:8000/about`
- Contact: `http://localhost:8000/contact`
- Invalid route: `http://localhost:8000/unknown`

**Screenshot:**

![N4 – HTTP Server output](set2/n4-server/screenshots/n4-server.png)

### N5 – REST-style API

**Folder:** [`set2/n5-api`](set2/n5-api/)

This activity focuses on creating a REST-style API for managing student records. It uses an array to store sample student data and handles different HTTP methods: GET, POST, PUT, and DELETE. The API returns JSON responses with appropriate HTTP status codes. It also checks whether a student exists before retrieving, updating, or deleting a record.

**How to run:**

```bash
cd set2/n5-api
node index.js
```

The API runs at:

`http://localhost:8001`

**API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Display all students |
| GET | `/api/students/:id` | Display a student by ID |
| POST | `/api/students` | Add a new student |
| PUT | `/api/students/:id` | Update a student's information |
| DELETE | `/api/students/:id` | Delete a student |

**Screenshot:**

![N5 – REST API output](set2/n5-api/screenshots/n5-api.png)

### N6 – Middleware and API Testing

**Folder:** [`set2/n6-middleware`](set2/n6-middleware/)

This activity extends the N5 REST API by adding custom middleware functions. The logger middleware records the HTTP method, requested URL, and date and time of every incoming request in the terminal. The JSON middleware automatically sets the `Content-Type` header to `application/json` for API responses. Both middleware functions call `next()` so that the request can continue to the route handler.

The API endpoints are tested using Postman to check their requests, responses, and status codes.

**How to run:**

```bash
cd set2/n6-middleware
node index.js
```

The API runs at:

`http://localhost:8001`

**API Endpoints:**

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Display all students |
| GET | `/api/students/:id` | Display a student by ID |
| POST | `/api/students` | Add a new student |
| PUT | `/api/students/:id` | Update a student's information |
| DELETE | `/api/students/:id` | Delete a student |

**Screenshot:**

![N6 – Middleware API testing](set2/n6-middleware/ss/N6_GET_ALL.png)

---

## Technologies Used

- **Node.js** – JavaScript runtime environment
- **npm** – Package manager for Node.js
- **JavaScript** – Programming language
- **Built-in Node.js Modules** – `http`, `fs`, `path`, and `os`
- **Postman** – API testing tool
- **Visual Studio Code** – Code editor
- **Git and GitHub** – Version control and repository hosting

## How to Run the Projects

1. Install Node.js and npm on your computer.
2. Clone or download this repository.
3. Open the repository folder in Visual Studio Code.
4. Open the terminal.
5. Navigate to the folder of the activity you want to run.
6. Run the command provided in that activity's section.
7. For the server and API activities, open the provided localhost address in your browser or Postman.

**Note:** N5 and N6 use an array for storing student records. The data is temporary and resets when the server is restarted.

---

## Repository Structure

```text
ELEC3-NODEJS-VIRAY/
│
├── README.md
├── .gitignore
│
├── set1/
│   ├── n1-setup/
│   ├── n2-calculator/
│   └── n3-file-manager/
│
└── set2/
    ├── n4-server/
    ├── n5-api/
    └── n6-middleware/
```

---

**ELEC 3 – Node.js Activities**  

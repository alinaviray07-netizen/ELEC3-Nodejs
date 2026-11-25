
/*
Name: Alina Viray
Section: IV-BSIT
Activity: N6 - Middleware and API Testing
Date: November 25, 2026
*/

const http = require("http");

// Sample student records
let students = [
    { id: 1, name: "Drey Cruz", course: "BSIT" },
    { id: 2, name: "Seir Santos", course: "BSIT" },
    { id: 3, name: "Yuri Quimson", course: "BSCS" }
];

// Middleware 1: Logger Middleware
function loggerMiddleware(req, res, next) {
    const dateTime = new Date().toLocaleString();

    console.log(
        `[${dateTime}] ${req.method} ${req.url}`
    );

    next();
}

// Middleware 2: JSON Content-Type Middleware
function jsonMiddleware(req, res, next) {
    res.setHeader("Content-Type", "application/json");
    next();
}

// Send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode);
    res.end(JSON.stringify(data));
}

// Read request body
function getRequestBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (error) {
                reject(error);
            }
        });

        req.on("error", reject);
    });
}

// API routes
async function handleRoutes(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;
    const method = req.method;

    // GET all students
    if (path === "/api/students" && method === "GET") {
        return sendJSON(res, 200, students);
    }

    // POST a new student
    if (path === "/api/students" && method === "POST") {
        try {
            const body = await getRequestBody(req);

            if (!body.name || !body.course) {
                return sendJSON(res, 400, {
                    message: "Name and course are required."
                });
            }

            const newStudent = {
                id: body.id || (
                    students.length > 0
                        ? Math.max(...students.map(student => student.id)) + 1
                        : 1
                ),
                name: body.name,
                course: body.course
            };

            students.push(newStudent);

            return sendJSON(res, 201, newStudent);

        } catch (error) {
            return sendJSON(res, 400, {
                message: "Invalid JSON request body."
            });
        }
    }

    // Check student ID
    const match = path.match(/^\/api\/students\/(\d+)$/);

    if (match) {
        const id = Number(match[1]);
        const studentIndex = students.findIndex(
            student => student.id === id
        );

        // GET student by ID
        if (method === "GET") {
            if (studentIndex === -1) {
                return sendJSON(res, 404, {
                    message: "Student not found."
                });
            }

            return sendJSON(res, 200, students[studentIndex]);
        }

        // PUT update student
        if (method === "PUT") {
            if (studentIndex === -1) {
                return sendJSON(res, 404, {
                    message: "Student not found."
                });
            }

            try {
                const body = await getRequestBody(req);

                students[studentIndex] = {
                    ...students[studentIndex],
                    ...body,
                    id: id
                };

                return sendJSON(
                    res,
                    200,
                    students[studentIndex]
                );

            } catch (error) {
                return sendJSON(res, 400, {
                    message: "Invalid JSON request body."
                });
            }
        }

        // DELETE student
        if (method === "DELETE") {
            if (studentIndex === -1) {
                return sendJSON(res, 404, {
                    message: "Student not found."
                });
            }

            const deletedStudent = students.splice(studentIndex, 1)[0];

            return sendJSON(res, 200, {
                message: "Student deleted successfully.",
                student: deletedStudent
            });
        }
    }

    // Route not found
    return sendJSON(res, 404, {
        message: "Route not found."
    });
}

// Middleware execution
const middlewares = [
    loggerMiddleware,
    jsonMiddleware
];

function runMiddlewares(req, res, index = 0) {
    if (index === middlewares.length) {
        return handleRoutes(req, res).catch(error => {
            console.error("Server Error:", error);

            if (!res.headersSent) {
                sendJSON(res, 500, {
                    message: "Internal server error."
                });
            }
        });
    }

    middlewares[index](req, res, () => {
        runMiddlewares(req, res, index + 1);
    });
}

// Create HTTP server
const server = http.createServer((req, res) => {
    runMiddlewares(req, res);
});

// Start server
const PORT = 8001;

server.listen(PORT, () => {
    console.log(`N6 Middleware API running at http://localhost:${PORT}`);
});


/*
Name: Alina E. Viray
Section: IV-BSIT-C
Activity: N5 - REST-style API
Date: November 22, 2026
*/

const http = require("http");

const PORT = 8001;

// Sample student records stored in an array
let students = [
    { id: 1, name: "Drey Cruz", course: "BSIT" },
    { id: 2, name: "Seir Santos", course: "BSIT" },
    { id: 3, name: "Yuri Quimson", course: "BSCS" }
];

let nextId = 4;

// Return JSON responses with HTTP status codes
function sendJSON(res, status, data) {
    res.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8"
    });
    res.end(JSON.stringify(data));
}

// Read and parse the incoming JSON request
function readBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", chunk => {
            body += chunk;

            if (body.length > 100000) {
                reject(new Error("Request body is too large."));
                req.destroy();
            }
        });

        req.on("end", () => {
            try {
                resolve(JSON.parse(body));
            } catch {
                reject(new Error("Invalid JSON data."));
            }
        });

        req.on("error", reject);
    });
}

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, "http://localhost");
    const parts = url.pathname.split("/").filter(Boolean);

    // Only accept /api/students or /api/students/:id
    if (
        parts[0] !== "api" ||
        parts[1] !== "students" ||
        parts.length > 3
    ) {
        return sendJSON(res, 404, { message: "Endpoint not found." });
    }

    const id = parts.length === 3 ? Number(parts[2]) : null;

    if (id !== null && (!Number.isInteger(id) || id < 1)) {
        return sendJSON(res, 400, { message: "Invalid student ID." });
    }

    try {
        // GET /api/students
        if (req.method === "GET" && id === null) {
            return sendJSON(res, 200, students);
        }

        // GET /api/students/:id
        if (req.method === "GET" && id !== null) {
            const student = students.find(s => s.id === id);

            if (!student) {
                return sendJSON(res, 404, { message: "Student not found." });
            }

            return sendJSON(res, 200, student);
        }

        // POST /api/students
        if (req.method === "POST" && id === null) {
            const data = await readBody(req);

            if (
                typeof data.name !== "string" ||
                !data.name.trim() ||
                typeof data.course !== "string" ||
                !data.course.trim()
            ) {
                return sendJSON(res, 400, {
                    message: "Name and course are required."
                });
            }

            const student = {
                id: nextId++,
                name: data.name.trim(),
                course: data.course.trim()
            };

            students.push(student);

            return sendJSON(res, 201, student);
        }

        // PUT /api/students/:id
        if (req.method === "PUT" && id !== null) {
            const student = students.find(s => s.id === id);

            if (!student) {
                return sendJSON(res, 404, { message: "Student not found." });
            }

            const data = await readBody(req);

            if (
                typeof data.name !== "string" ||
                !data.name.trim() ||
                typeof data.course !== "string" ||
                !data.course.trim()
            ) {
                return sendJSON(res, 400, {
                    message: "Name and course are required."
                });
            }

            student.name = data.name.trim();
            student.course = data.course.trim();

            return sendJSON(res, 200, student);
        }

        // DELETE /api/students/:id
        if (req.method === "DELETE" && id !== null) {
            const index = students.findIndex(s => s.id === id);

            if (index === -1) {
                return sendJSON(res, 404, { message: "Student not found." });
            }

            const deleted = students.splice(index, 1)[0];

            return sendJSON(res, 200, {
                message: "Student deleted successfully.",
                student: deleted
            });
        }

        return sendJSON(res, 405, {
            message: "Method not allowed."
        });

    } catch (error) {
        return sendJSON(res, 400, {
            message: error.message
        });
    }
});

server.listen(PORT, () => {
    console.log("===== STUDENT REST API =====");
    console.log("Name: Alina E. Viray");
    console.log("Section: IV-BSIT-C");
    console.log(`Server running at http://localhost:${PORT}`);
});

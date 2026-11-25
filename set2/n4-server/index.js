
/*
Name: Alina E. Viray
Section: IV-BSIT-C
Activity: N4 - Basic HTTP Server
Date: November 22, 2026
*/

const http = require("http");

const PORT = 8000;

// Send an HTML response with the correct status code.
function sendPage(res, statusCode, title, content) {
    res.writeHead(statusCode, {
        "Content-Type": "text/html; charset=utf-8"
    });

    res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background: #f4f6fa;
                    text-align: center;
                    padding: 60px 20px;
                }
                .container {
                    background: white;
                    max-width: 550px;
                    margin: auto;
                    padding: 35px;
                    border-radius: 12px;
                    box-shadow: 0 4px 18px rgba(0,0,0,0.08);
                }
                h1 { color: #263b61; }
                p { color: #526079; }
                a {
                    color: #3456a8;
                    margin: 0 10px;
                    text-decoration: none;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>${title}</h1>
                ${content}
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/contact">Contact</a>
                </nav>
            </div>
        </body>
        </html>
    `);
}

const server = http.createServer((req, res) => {
    const url = new URL(req.url, "http://localhost");

    if (req.method !== "GET") {
        return sendPage(
            res,
            405,
            "Method Not Allowed",
            "<p>Only GET requests are supported.</p>"
        );
    }

    if (url.pathname === "/") {
        sendPage(
            res,
            200,
            "Welcome to My Website",
            `<p>Name: Alina E. Viray</p>
             <p>Section: IV-BSIT-C</p>
             <p>This is my Node.js HTTP Server activity.</p>`
        );

    } else if (url.pathname === "/about") {
        sendPage(
            res,
            200,
            "About Me",
            `<p>I am a fourth-year BSIT student.</p>
             <p>I am learning how to create web servers using Node.js.</p>`

        );

    } else if (url.pathname === "/contact") {
        sendPage(
            res,
            200,
            "Contact",
            `<p>Name: Alina E. Viray</p>
             <p>For this activity, this page serves as my contact information section.</p>`
        );

    } else {
        sendPage(
            res,
            404,
            "Page Not Found",
            "<p>The page you requested does not exist.</p>"
        );
    }
});

server.listen(PORT, () => {
    console.log("===== BASIC HTTP SERVER =====");
    console.log("Name: Alina E. Viray");
    console.log("Section: IV-BSIT-C");
    console.log(`Server running at http://localhost:${PORT}`);
});

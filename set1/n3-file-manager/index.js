
/*
Name: Alina E. Viray
Section: IV-BSIT-C
Activity: N3 - File Manager with fs and path
Date: November 22, 2026
*/

const fs = require("fs");
const path = require("path");

// All managed text files are stored here.
const filesFolder = path.join(__dirname, "files");

// Create the folder if it does not exist.
if (!fs.existsSync(filesFolder)) {
    fs.mkdirSync(filesFolder);
}

const [command, fileName, ...contentParts] = process.argv.slice(2);
const content = contentParts.join(" ");

// Allow plain text file names only.
function getFilePath(name) {
    if (
        !name ||
        path.basename(name) !== name ||
        !/^[a-zA-Z0-9_-]+\.txt$/.test(name)
    ) {
        throw new Error("Please use a valid .txt file name.");
    }

    return path.join(filesFolder, name);
}

function createFile(name, text) {
    const filePath = getFilePath(name);

    if (fs.existsSync(filePath)) {
        console.log("File already exists.");
        return;
    }

    fs.writeFileSync(filePath, text, "utf8");
    console.log("File created successfully:", name);
}

function readFile(name) {
    const filePath = getFilePath(name);

    if (!fs.existsSync(filePath)) {
        console.log("File does not exist.");
        return;
    }

    const data = fs.readFileSync(filePath, "utf8");

    console.log("===== FILE CONTENT =====");
    console.log(data);
}

function updateFile(name, text) {
    const filePath = getFilePath(name);

    if (!fs.existsSync(filePath)) {
        console.log("File does not exist.");
        return;
    }

    fs.appendFileSync(filePath, "\n" + text, "utf8");
    console.log("File updated successfully:", name);
}

function deleteFile(name) {
    const filePath = getFilePath(name);

    if (!fs.existsSync(filePath)) {
        console.log("File does not exist.");
        return;
    }

    fs.unlinkSync(filePath);
    console.log("File deleted successfully:", name);
}

function listFiles() {
    const files = fs.readdirSync(filesFolder)
        .filter(name => path.extname(name) === ".txt")
        .sort();

    if (files.length === 0) {
        console.log("No text files found.");
        return;
    }

    console.log("===== FILE LIST =====");

    files.forEach((name, index) => {
        const filePath = path.join(filesFolder, name);
        const fileContent = fs.readFileSync(filePath, "utf8");

        console.log(`\nFile ${index + 1}`);
        console.log("Full Path:", filePath);
        console.log("File Name:", path.basename(filePath));
        console.log("Extension:", path.extname(filePath));
        console.log("Content:");
        console.log(fileContent);
        console.log("--------------------------");
    });
}

// Choose the operation from the command line.
try {
    switch (command) {
        case "create":
            createFile(fileName, content);
            break;

        case "read":
            readFile(fileName);
            break;

        case "update":
            updateFile(fileName, content);
            break;

        case "delete":
            deleteFile(fileName);
            break;

        case "list":
            listFiles();
            break;

        default:
            console.log("===== FILE MANAGER =====");
            console.log("Commands:");
            console.log('create <file.txt> "content"');
            console.log("read <file.txt>");
            console.log('update <file.txt> "content"');
            console.log("delete <file.txt>");
            console.log("list");
    }
} catch (error) {
    console.log("Error:", error.message);
}

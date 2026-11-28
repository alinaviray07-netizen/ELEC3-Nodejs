
/*
Name: Alina E. Viray
Section: IV-BSIT-C
Activity: N2 - Modular Calculator
Date: November 24, 2026
*/

const operations = require("./operations");
const formatResult = require("./formatter");
const os = require("os"); // Built-in Node.js module

const [operation, firstInput, secondInput] = process.argv.slice(2);

const validOperations = [
    "add",
    "subtract",
    "multiply",
    "divide",
    "average"
];

if (!validOperations.includes(operation)) {
    console.log("Error: Unknown operation.");
    console.log("Available: add, subtract, multiply, divide, average");
    process.exitCode = 1;
} else if (
    firstInput === undefined ||
    secondInput === undefined ||
    firstInput.trim() === "" ||
    secondInput.trim() === "" ||
    !Number.isFinite(Number(firstInput)) ||
    !Number.isFinite(Number(secondInput))
) {
    console.log("Error: Please provide two valid numbers.");
    process.exitCode = 1;
} else {
    const a = Number(firstInput);
    const b = Number(secondInput);

    try {
        const result = operations[operation](a, b);

        console.log("===== MODULAR CALCULATOR =====");
        console.log("Name: Alina E. Viray");
        console.log("Operating System:", os.platform());
        console.log(formatResult(operation, a, b, result));
    } catch (error) {
        console.log("Error:", error.message);
        process.exitCode = 1;
    }
}

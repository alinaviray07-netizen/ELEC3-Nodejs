
/*
Name: Alina E. Viray
Section: IV-BSIT-C
Activity: N2 - Modular Calculator
Date: November 22, 2026
*/

// Format the calculation result
function formatResult(operation, a, b, result) {
    const symbols = {
        add: "+",
        subtract: "-",
        multiply: "*",
        divide: "/",
        average: "average of"
    };

    if (operation === "average") {
        return `Average of ${a} and ${b} = ${result}`;
    }

    return `${a} ${symbols[operation]} ${b} = ${result}`;
}

module.exports = formatResult;

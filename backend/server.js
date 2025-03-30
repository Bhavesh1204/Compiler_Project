require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Lexical Analyzer Function
function tokenize(code) {
    const tokens = []; // Store unique lexemes
    
    // Remove comments (both single-line and multi-line)
    code = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");

    const tokenPatterns = [
        { type: "Keyword", regex: /\b(int|if|else|return|while|for|function|var|let|const|print)\b/g },
        { type: "Identifier", regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g },
        { type: "Operator/Symbol", regex: /[+\-*/=<>!]=?|&&|\|\||[{}()[\];,]/g },
        { type: "Number", regex: /\b\d+(\.\d+)?\b/g },
        { type: "String", regex: /(["'])(?:(?=(\\?))\2.)*?\1/g }, // Matches "string" and 'string'
        { type: "Whitespace", regex: /\s+/g }
    ];

    tokenPatterns.forEach(({ type, regex }) => {
        let match;
        while ((match = regex.exec(code)) !== null) {
            // Check if the lexeme already exists in the token list
            if (!tokens.some(token => token.lexeme === match[0])) {
                tokens.push({ lexeme: match[0], token: type });
            }
        }
    });

    return tokens.filter(token => token.token !== "Whitespace");
}

// API to analyze code (without saving to database)
app.post("/analyze", (req, res) => {
    const { code } = req.body;
    const result = tokenize(code);
    res.json(result);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));



// You want the changes then you can write below code 
// It is updated code 
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Lexical Analyzer Function with Line Tracking
// function tokenize(code) {
//     const tokens = [];
//     const tokenSummary = {};

//     // Remove comments (single-line and multi-line)
//     code = code.replace(/\/\/.*|\/\*[\s\S]*?\*\//g, "");

//     const tokenPatterns = [
//         { type: "Keyword", regex: /\b(int|if|else|return|while|for|function|var|let|const|print)\b/g },
//         { type: "Identifier", regex: /\b[a-zA-Z_][a-zA-Z0-9_]*\b/g },
//         { type: "Operator/Symbol", regex: /[+\-*/=<>!]=?|&&|\|\||[{}()[\];,]/g },
//         { type: "Number", regex: /\b\d+(\.\d+)?\b/g },
//         { type: "String", regex: /(["'])(?:(?=(\\?))\2.)*?\1/g }, 
//         { type: "Whitespace", regex: /\s+/g }
//     ];

//     const lines = code.split("\n"); // Split code into lines

//     lines.forEach((line, lineNumber) => {
//         tokenPatterns.forEach(({ type, regex }) => {
//             let match;
//             while ((match = regex.exec(line)) !== null) {
//                 tokens.push({ lexeme: match[0], token: type, line: lineNumber + 1 });

//                 // Update token frequency summary
//                 tokenSummary[type] = (tokenSummary[type] || 0) + 1;
//             }
//         });
//     });

//     return {
//         tokens: tokens.filter(token => token.token !== "Whitespace"),
//         summary: tokenSummary
//     };
// }

// // API to analyze code
// app.post("/analyze", (req, res) => {
//     const { code } = req.body;
//     const result = tokenize(code);
//     res.json(result);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

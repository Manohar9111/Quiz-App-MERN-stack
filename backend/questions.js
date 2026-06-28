export const questions = [
  {
    id: 1,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "What does DNS stand for and what does it do?",
    options: [
      "Domain Name System — translates domain names to IP addresses",
      "Domain Navigation Service — routes browser traffic",
      "Distributed Network Server — hosts websites",
      "Dynamic Name Selector — picks the fastest server"
    ],
    answer: "Domain Name System — translates domain names to IP addresses",
    explanation: "Use the Zomato analogy from class. DNS acts like the internet's phonebook."
  },
  {
    id: 2,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "Which HTTP method would you use to fetch your Instagram feed?",
    options: [
      "POST",
      "DELETE",
      "GET",
      "PUT"
    ],
    answer: "GET",
    explanation: "GET = asking for data, no side effects."
  },
  {
    id: 3,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "You submit a signup form on a website. Which HTTP method is most likely used?",
    options: [
      "GET",
      "PUT",
      "DELETE",
      "POST"
    ],
    answer: "POST",
    explanation: "POST sends data in the request body."
  },
  {
    id: 4,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 15,
    question: "What does HTTP status code 404 mean?",
    options: [
      "Server crashed",
      "You're not logged in",
      "The resource was not found",
      "The page moved permanently"
    ],
    answer: "The resource was not found",
    explanation: "Easy win — they'll all know this one."
  },
  {
    id: 5,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "Which status code range means it's YOUR fault as the client?",
    options: [
      "1xx",
      "2xx",
      "3xx",
      "4xx"
    ],
    answer: "4xx",
    explanation: "4xx = client error, 5xx = server error."
  },
  {
    id: 6,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 25,
    question: "What is the purpose of HTTP headers?",
    options: [
      "Store the main page content",
      "Contain metadata about the request or response",
      "Define the CSS styling",
      "Set the database connection"
    ],
    answer: "Contain metadata about the request or response",
    explanation: "Headers = metadata, body = actual data."
  },
  {
    id: 7,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "Which HTTP method would you use to update your username completely?",
    options: [
      "GET",
      "POST",
      "PUT",
      "DELETE"
    ],
    answer: "PUT",
    explanation: "PUT = replace the full resource."
  },
  {
    id: 8,
    topic: "HTTP",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 25,
    question: "What happens during a TCP handshake?",
    options: [
      "The browser downloads HTML files",
      "DNS resolves the domain name",
      "A connection is established between browser and server",
      "The server renders the page"
    ],
    answer: "A connection is established between browser and server",
    explanation: "Like picking up the phone and calling."
  },
  {
    id: 9,
    topic: "Node.js",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "Before Node.js existed, where could JavaScript only run?",
    options: [
      "On servers",
      "In databases",
      "In the browser",
      "On mobile apps only"
    ],
    answer: "In the browser",
    explanation: "Ryan Dahl moved V8 engine out of the browser in 2009."
  },
  {
    id: 10,
    topic: "Node.js",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "What is the V8 engine?",
    options: [
      "A Node.js package manager",
      "The JavaScript runtime inside Chrome",
      "A type of HTTP request",
      "An Express middleware"
    ],
    answer: "The JavaScript runtime inside Chrome",
    explanation: "V8 = what runs JS inside Chrome, now also in Node."
  },
  {
    id: 11,
    topic: "Node.js",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 25,
    question: "What does `require('express')` do in Node.js?",
    options: [
      "Creates a new HTTP server",
      "Imports the Express module",
      "Starts the server on port 3000",
      "Sends a GET request"
    ],
    answer: "Imports the Express module",
    explanation: "require() = Node's way of importing modules."
  },
  {
    id: 12,
    topic: "Express",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 25,
    question: "In Express, what does `res.json({ name: 'Alice' })` do?",
    options: [
      "Logs the data to the console",
      "Saves data to a database",
      "Sends a JSON response to the client",
      "Creates a new route"
    ],
    answer: "Sends a JSON response to the client",
    explanation: "res = response, what you send back."
  },
  {
    id: 13,
    topic: "Express",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "In the middleware pipeline — `Request → [Logger] → [Auth] → [Route Handler] → Response` — what happens if the Auth middleware returns a 401?",
    options: [
      "The request is retried automatically",
      "The Logger runs again",
      "The chain stops and the Route Handler never runs",
      "The request skips to the Route Handler"
    ],
    answer: "The chain stops and the Route Handler never runs",
    explanation: "Hard! Middleware can stop the chain early."
  },
  {
    id: 14,
    topic: "Express",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "What is the role of `express.json()` in an Express app?",
    options: [
      "It converts your route handlers to JSON",
      "It starts the server",
      "It parses incoming JSON request bodies so you can read req.body",
      "It sends a JSON response automatically"
    ],
    answer: "It parses incoming JSON request bodies so you can read req.body",
    explanation: "Without this middleware, req.body is undefined."
  },
  {
    id: 15,
    topic: "Express",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "You restart your Express server and all the data you stored is gone. Why?",
    options: [
      "express.json() wasn't used",
      "The server has no database — data only lives in memory",
      "The port number changed",
      "You forgot to call app.listen()"
    ],
    answer: "The server has no database — data only lives in memory",
    explanation: "Data stored in variables is lost when the Node.js process restarts, highlighting the need for a database like MongoDB."
  }
];

export function getClientQuestions() {
  return questions.map(q => {
    const clientQ = {
      id: q.id,
      topic: q.topic,
      type: q.type,
      difficulty: q.difficulty,
      timeLimit: q.timeLimit,
      question: q.question
    };
    if (q.options) {
      clientQ.options = q.options;
    }
    if (q.codeSnippet) {
      clientQ.codeSnippet = q.codeSnippet;
    }
    return clientQ;
  });
}

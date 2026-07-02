export const questions = [
  {
    id: 1,
    topic: "Databases",
    type: "MCQ",
    difficulty: "easy",
    timeLimit: 10,
    question: "What does CRUD stand for?",
    options: [
      "Create, Read, Update, Delete",
      "Connect, Return, Update, Deploy",
      "Create, Run, Upload, Delete",
      "Clone, Read, Undo, Delete"
    ],
    answer: "Create, Read, Update, Delete",
    explanation: "CRUD represents the four basic functions of persistent storage."
  },
  {
    id: 2,
    topic: "SQL",
    type: "MCQ",
    difficulty: "easy",
    timeLimit: 10,
    question: "What is a primary key in a SQL database?",
    options: [
      "The most important column in the table",
      "A unique identifier for each row that cannot be null",
      "The first column in any table",
      "A password used to access the database"
    ],
    answer: "A unique identifier for each row that cannot be null",
    explanation: "A primary key ensures each row can be uniquely identified and prevents null values."
  },
  {
    id: 3,
    topic: "SQL",
    type: "MCQ",
    difficulty: "easy",
    timeLimit: 10,
    question: "Which SQL keyword is used to fetch data from a table?",
    options: [
      "GET",
      "FETCH",
      "SELECT",
      "FIND"
    ],
    answer: "SELECT",
    explanation: "The SELECT statement is the standard way to retrieve data from a SQL database."
  },
  {
    id: 4,
    topic: "MongoDB",
    type: "MCQ",
    difficulty: "easy",
    timeLimit: 10,
    question: "What does a MongoDB collection contain?",
    options: [
      "Tables",
      "SQL queries",
      "Documents",
      "Columns"
    ],
    answer: "Documents",
    explanation: "In MongoDB, tables are called collections, and rows are called documents (JSON/BSON)."
  },
  {
    id: 5,
    topic: "Databases",
    type: "MCQ",
    difficulty: "easy",
    timeLimit: 10,
    question: "Which of these is a NoSQL database?",
    options: [
      "MySQL",
      "PostgreSQL",
      "MongoDB",
      "SQLite"
    ],
    answer: "MongoDB",
    explanation: "MongoDB is a document-oriented NoSQL database, whereas the others are relational SQL databases."
  },
  {
    id: 6,
    topic: "SQL",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "What does the SQL WHERE clause do?",
    options: [
      "Sorts the result rows",
      "Filters rows based on a condition",
      "Joins two tables together",
      "Limits the columns returned"
    ],
    answer: "Filters rows based on a condition",
    explanation: "The WHERE clause restricts the result set to rows that meet a specific condition."
  },
  {
    id: 7,
    topic: "MongoDB",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "In MongoDB, what does the $gte operator mean?",
    options: [
      "Greater than",
      "Greater than or equal to",
      "Get from the end",
      "Group by type equal"
    ],
    answer: "Greater than or equal to",
    explanation: "$gte stands for 'greater than or equal to'."
  },
  {
    id: 8,
    topic: "Database Design",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "Why store price_at_time_of_order in the orders table instead of just referencing the current menu price?",
    options: [
      "To save storage space",
      "Menu prices change — past orders must not change retroactively",
      "To avoid joining tables",
      "MongoDB doesn't support references"
    ],
    answer: "Menu prices change — past orders must not change retroactively",
    explanation: "Historical financial data like order totals should always be explicitly saved so future price changes don't alter past receipts."
  },
  {
    id: 9,
    topic: "SQL",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "What is a foreign key?",
    options: [
      "A key used to encrypt data",
      "A column that references the primary key of another table",
      "A backup primary key",
      "Any column that is not the first column"
    ],
    answer: "A column that references the primary key of another table",
    explanation: "Foreign keys establish relationships between tables by pointing to a primary key in another table."
  },
  {
    id: 10,
    topic: "SQL",
    type: "MCQ",
    difficulty: "medium",
    timeLimit: 20,
    question: "Which SQL clause is used to link two tables based on a shared column value?",
    options: [
      "MERGE",
      "CONNECT",
      "JOIN",
      "LINK"
    ],
    answer: "JOIN",
    explanation: "JOIN combines rows from two or more tables based on a related column between them."
  },
  {
    id: 11,
    topic: "MongoDB",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "A MongoDB user document has an addresses field that is an array of objects. What pattern is this?",
    options: [
      "Foreign key reference",
      "Schema migration",
      "Embedding (denormalisation)",
      "Collection sharding"
    ],
    answer: "Embedding (denormalisation)",
    explanation: "Embedding involves storing related data (like addresses) within a single document instead of referencing a separate collection."
  },
  {
    id: 12,
    topic: "MongoDB",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "You run: db.users.updateOne({ name: \"Ravi\" }, { age: 25 }). What actually happens?",
    options: [
      "Only the age field is updated to 25",
      "The entire document is replaced with just { age: 25 }",
      "An error is thrown because $set is missing",
      "Nothing — updateOne requires more arguments"
    ],
    answer: "The entire document is replaced with just { age: 25 }",
    explanation: "In certain MongoDB driver versions, failing to use an update operator like $set causes the entire document to be replaced by the payload."
  },
  {
    id: 13,
    topic: "SQL",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "What is the key difference between SQL's INNER JOIN and LEFT JOIN?",
    options: [
      "LEFT JOIN is always faster",
      "INNER JOIN returns only rows matching in both tables; LEFT JOIN returns all left table rows with NULLs where no match exists",
      "LEFT JOIN only works with NoSQL",
      "INNER JOIN works across databases; LEFT JOIN does not"
    ],
    answer: "INNER JOIN returns only rows matching in both tables; LEFT JOIN returns all left table rows with NULLs where no match exists",
    explanation: "LEFT JOIN guarantees all records from the left table are returned, filling in NULL for missing matches on the right."
  },
  {
    id: 14,
    topic: "Architecture",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "Why can't your React app call MongoDB directly — why is the Express API needed in between?",
    options: [
      "React doesn't support async operations",
      "MongoDB only works with SQL",
      "Calling MongoDB from the browser exposes your credentials to anyone with DevTools",
      "It would be too slow"
    ],
    answer: "Calling MongoDB from the browser exposes your credentials to anyone with DevTools",
    explanation: "The Express API acts as a secure middle layer so database passwords and access rules stay hidden on the server."
  },
  {
    id: 15,
    topic: "Database Design",
    type: "MCQ",
    difficulty: "hard",
    timeLimit: 30,
    question: "In schema design, what does normalisation mean?",
    options: [
      "Making all column names lowercase",
      "Splitting related data into separate tables to reduce redundancy",
      "Combining all data into one large document",
      "Encrypting sensitive fields"
    ],
    answer: "Splitting related data into separate tables to reduce redundancy",
    explanation: "Normalization minimizes duplicate data by distributing it logically across smaller, related tables."
  }
];

// Helper to filter out answers and explanations for safety on the client side
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

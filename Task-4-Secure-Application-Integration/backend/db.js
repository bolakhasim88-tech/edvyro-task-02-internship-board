

const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Create database folder automatically
const databaseFolder = path.join(__dirname, "database");

if (!fs.existsSync(databaseFolder)) {
  fs.mkdirSync(databaseFolder, { recursive: true });
}

// Create SQLite database file
const dbPath = path.join(databaseFolder, "internships.db");
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

console.log("SQLite database connected successfully!");

// Create internships table
db.exec(`
  CREATE TABLE IF NOT EXISTS internships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    domain TEXT NOT NULL DEFAULT 'Web Development',
    location TEXT NOT NULL,
    duration TEXT NOT NULL DEFAULT '3 Months',
    stipend TEXT NOT NULL DEFAULT 'Unpaid',
    type TEXT NOT NULL,
    logo TEXT NOT NULL DEFAULT 'I',
    description TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Add missing columns to an existing database
const existingColumns = db
  .prepare("PRAGMA table_info(internships)")
  .all()
  .map((column) => column.name);

const newColumns = {
  domain: "TEXT NOT NULL DEFAULT 'Web Development'",
  duration: "TEXT NOT NULL DEFAULT '3 Months'",
  stipend: "TEXT NOT NULL DEFAULT 'Unpaid'",
  logo: "TEXT NOT NULL DEFAULT 'I'",
};

for (const [column, definition] of Object.entries(newColumns)) {
  if (!existingColumns.includes(column)) {
    db.exec(
      `ALTER TABLE internships ADD COLUMN ${column} ${definition}`
    );
  }
}

console.log("Internships table is ready!");

module.exports = db;

console.log("Internships table is ready!");

// Create applications table
db.exec(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    internship_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    resume TEXT NOT NULL,
    cover_letter TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Submitted',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (internship_id)
      REFERENCES internships(id)
      ON DELETE CASCADE
  )
`);

console.log("Applications table is ready!");

module.exports = db;
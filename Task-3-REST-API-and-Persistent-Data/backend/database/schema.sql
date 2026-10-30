
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
);

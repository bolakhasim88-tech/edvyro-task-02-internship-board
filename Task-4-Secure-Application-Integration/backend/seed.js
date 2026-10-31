const db = require("./db");

const internships = [
    {
        title: "Frontend Developer Intern",
        company: "TechNova Solutions",
        domain: "Web Development",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹8,000 / month",
        type: "Paid",
        logo: "T",
        description: "Build responsive web interfaces using HTML, CSS, and JavaScript. Learn modern frontend development practices."
    },
    {
        title: "Full Stack Developer Intern",
        company: "CodeCraft Technologies",
        domain: "Web Development",
        location: "Hybrid",
        duration: "6 Months",
        stipend: "₹12,000 / month",
        type: "Paid",
        logo: "C",
        description: "Work on frontend and backend development. Gain experience with APIs, databases, and web applications."
    },
    {
        title: "AI / ML Intern",
        company: "FutureMind AI",
        domain: "Artificial Intelligence",
        location: "Remote",
        duration: "4 Months",
        stipend: "₹10,000 / month",
        type: "Paid",
        logo: "F",
        description: "Explore machine learning models, Python programming, and practical artificial intelligence projects."
    },
    {
        title: "Data Science Intern",
        company: "DataSphere Analytics",
        domain: "Data Science",
        location: "On-site",
        duration: "3 Months",
        stipend: "Unpaid",
        type: "Unpaid",
        logo: "D",
        description: "Analyze datasets, create visualizations, and discover useful insights using Python and data science tools."
    },
    {
        title: "UI/UX Design Intern",
        company: "PixelPerfect Studio",
        domain: "UI/UX Design",
        location: "Remote",
        duration: "2 Months",
        stipend: "₹6,000 / month",
        type: "Paid",
        logo: "P",
        description: "Design user-friendly interfaces, create wireframes, and improve digital product experiences."
    },
    {
        title: "Cybersecurity Intern",
        company: "SecureNet Systems",
        domain: "Cybersecurity",
        location: "Hybrid",
        duration: "3 Months",
        stipend: "₹9,000 / month",
        type: "Paid",
        logo: "S",
        description: "Learn security fundamentals, vulnerability assessment, and safe web application practices."
    },
    {
        title: "JavaScript Developer Intern",
        company: "WebWorks Digital",
        domain: "Web Development",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹7,000 / month",
        type: "Paid",
        logo: "W",
        description: "Develop interactive web pages using JavaScript and improve your DOM manipulation skills."
    },
    {
        title: "Machine Learning Intern",
        company: "NeuralPath Labs",
        domain: "Artificial Intelligence",
        location: "On-site",
        duration: "6 Months",
        stipend: "₹15,000 / month",
        type: "Paid",
        logo: "N",
        description: "Work with machine learning algorithms, data preprocessing, and model evaluation techniques."
    },
    {
        title: "Data Analyst Intern",
        company: "InsightEdge",
        domain: "Data Science",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹8,000 / month",
        type: "Paid",
        logo: "I",
        description: "Work with data cleaning, spreadsheets, Python, and visualization tools to support business decisions."
    }
];

const insertInternship = db.prepare(`
    INSERT INTO internships (
        title,
        company,
        domain,
        location,
        duration,
        stipend,
        type,
        logo,
        description
    )
    VALUES (
        @title,
        @company,
        @domain,
        @location,
        @duration,
        @stipend,
        @type,
        @logo,
        @description
    )
`);

const seedInternships = db.transaction(() => {
    db.prepare("DELETE FROM internships").run();

    for (const internship of internships) {
        insertInternship.run(internship);
    }
});

seedInternships();

console.log("Successfully added 9 original internships!");

db.close();
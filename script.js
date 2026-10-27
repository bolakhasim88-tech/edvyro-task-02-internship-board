
/* ========================================
   1. INTERNSHIP DATA
======================================== */

const internships = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "TechNova Solutions",
        domain: "Web Development",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹8,000 / month",
        type: "Paid",
        logo: "T",
        description:
            "Build responsive web interfaces using HTML, CSS, and JavaScript. Learn modern frontend development practices."
    },

    {
        id: 2,
        title: "Full Stack Developer Intern",
        company: "CodeCraft Technologies",
        domain: "Web Development",
        location: "Hybrid",
        duration: "6 Months",
        stipend: "₹12,000 / month",
        type: "Paid",
        logo: "C",
        description:
            "Work on frontend and backend development. Gain experience with APIs, databases, and web applications."
    },

    {
        id: 3,
        title: "AI / ML Intern",
        company: "FutureMind AI",
        domain: "Artificial Intelligence",
        location: "Remote",
        duration: "4 Months",
        stipend: "₹10,000 / month",
        type: "Paid",
        logo: "F",
        description:
            "Explore machine learning models, Python programming, and practical artificial intelligence projects."
    },

    {
        id: 4,
        title: "Data Science Intern",
        company: "DataSphere Analytics",
        domain: "Data Science",
        location: "On-site",
        duration: "3 Months",
        stipend: "Unpaid",
        type: "Unpaid",
        logo: "D",
        description:
            "Analyze datasets, create visualizations, and discover useful insights using Python and data science tools."
    },

    {
        id: 5,
        title: "UI/UX Design Intern",
        company: "PixelPerfect Studio",
        domain: "UI/UX Design",
        location: "Remote",
        duration: "2 Months",
        stipend: "₹6,000 / month",
        type: "Paid",
        logo: "P",
        description:
            "Design user-friendly interfaces, create wireframes, and improve digital product experiences."
    },

    {
        id: 6,
        title: "Cybersecurity Intern",
        company: "SecureNet Systems",
        domain: "Cybersecurity",
        location: "Hybrid",
        duration: "3 Months",
        stipend: "₹9,000 / month",
        type: "Paid",
        logo: "S",
        description:
            "Learn security fundamentals, vulnerability assessment, and safe web application practices."
    },

    {
        id: 7,
        title: "JavaScript Developer Intern",
        company: "WebWorks Digital",
        domain: "Web Development",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹7,000 / month",
        type: "Paid",
        logo: "W",
        description:
            "Develop interactive web pages using JavaScript and improve your DOM manipulation skills."
    },

    {
        id: 8,
        title: "Machine Learning Intern",
        company: "NeuralPath Labs",
        domain: "Artificial Intelligence",
        location: "On-site",
        duration: "6 Months",
        stipend: "₹15,000 / month",
        type: "Paid",
        logo: "N",
        description:
            "Work with machine learning algorithms, data preprocessing, and model evaluation techniques."
    },

    {
        id: 9,
        title: "Data Analyst Intern",
        company: "InsightEdge",
        domain: "Data Science",
        location: "Remote",
        duration: "3 Months",
        stipend: "₹8,000 / month",
        type: "Paid",
        logo: "I",
        description:
            "Work with data cleaning, spreadsheets, Python, and visualization tools to support business decisions."
    }
];


/* ========================================
   2. SELECT HTML ELEMENTS
======================================== */

const internshipList = document.getElementById("internship-list");

const searchInput = document.getElementById("search-input");

const domainFilter = document.getElementById("domain-filter");

const resetButton = document.getElementById("reset-button");

const resultsCount = document.getElementById("results-count");

const emptyState = document.getElementById("empty-state");

const errorState = document.getElementById("error-state");

const retryButton = document.getElementById("retry-button");

const filterForm = document.getElementById("filter-form");


/* ========================================
   3. RENDER INTERNSHIP CARDS
======================================== */

function renderInternships(internshipData) {

    // Clear previous cards
    internshipList.replaceChildren();

    // Render every internship
    internshipData.forEach((internship) => {

        const card = document.createElement("article");

        card.className = "internship-card";

        card.innerHTML = `
            <div class="card-top">

                <div class="company-logo" aria-hidden="true">
                    ${internship.logo}
                </div>

                <span class="internship-badge">
                    ${internship.type}
                </span>

            </div>

            <h3>${internship.title}</h3>

            <p class="company-name">
                ${internship.company}
            </p>

            <p class="internship-description">
                ${internship.description}
            </p>

            <div class="internship-details">

                <span>
                    ${internship.domain}
                </span>

                <span>
                    ${internship.duration}
                </span>

                <span>
                    ${internship.stipend}
                </span>

            </div>

            <div class="card-footer">

                <span class="internship-location">
                    ${internship.location}
                </span>

                <button
                    type="button"
                    class="apply-button"
                    data-internship-id="${internship.id}"
                >
                    View Details
                </button>

            </div>
        `;

        internshipList.appendChild(card);

    });

}


/* ========================================
   4. SEARCH AND DOMAIN FILTER
======================================== */

function filterInternships() {

    const searchText = searchInput.value
        .trim()
        .toLowerCase();

    const selectedDomain = domainFilter.value;

    const filteredInternships = internships.filter(
        (internship) => {

            const matchesSearch =
                internship.title.toLowerCase().includes(searchText) ||
                internship.company.toLowerCase().includes(searchText) ||
                internship.domain.toLowerCase().includes(searchText);

            const matchesDomain =
                selectedDomain === "all" ||
                internship.domain === selectedDomain;

            return matchesSearch && matchesDomain;

        }
    );

    // Update result count
    resultsCount.textContent =
        `${filteredInternships.length} internships found`;

    // Show or hide empty state
    if (filteredInternships.length === 0) {

        emptyState.hidden = false;

    } else {

        emptyState.hidden = true;

    }

    // Hide error state during normal filtering
    errorState.hidden = true;

    // Render filtered cards
    renderInternships(filteredInternships);

}


/* ========================================
   5. RESET FILTERS
======================================== */

function resetFilters() {

    searchInput.value = "";

    domainFilter.value = "all";

    filterInternships();

}


/* ========================================
   6. VIEW INTERNSHIP DETAILS
======================================== */

function showInternshipDetails(event) {

    const button = event.target.closest(".apply-button");

    if (!button) {
        return;
    }

    const internshipId = Number(
        button.dataset.internshipId
    );

    const selectedInternship = internships.find(
        (internship) => internship.id === internshipId
    );

    if (!selectedInternship) {
        return;
    }

    alert(
        `Internship: ${selectedInternship.title}\n\n` +
        `Company: ${selectedInternship.company}\n` +
        `Domain: ${selectedInternship.domain}\n` +
        `Location: ${selectedInternship.location}\n` +
        `Duration: ${selectedInternship.duration}\n` +
        `Stipend: ${selectedInternship.stipend}\n\n` +
        `This is a demo internship board.`
    );

}


/* ========================================
   7. ERROR HANDLING
======================================== */

function showError() {

    internshipList.replaceChildren();

    emptyState.hidden = true;

    errorState.hidden = false;

    resultsCount.textContent =
        "Unable to load internships";

}


/* ========================================
   8. EVENT LISTENERS
======================================== */

// Search while typing
searchInput.addEventListener(
    "input",
    filterInternships
);


// Filter by domain
domainFilter.addEventListener(
    "change",
    filterInternships
);


// Reset button
resetButton.addEventListener(
    "click",
    resetFilters
);


// View details buttons
internshipList.addEventListener(
    "click",
    showInternshipDetails
);


// Prevent form from reloading the page
filterForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        filterInternships();

    }
);


// Retry button
retryButton.addEventListener(
    "click",
    initializeInternships
);


/* ========================================
   9. INITIALIZE WEBSITE
======================================== */

function initializeInternships() {

    try {

        errorState.hidden = true;

        emptyState.hidden = true;

        filterInternships();

    } catch (error) {

        console.error(
            "Error loading internships:",
            error
        );

        showError();

    }

}


// Start the application
initializeInternships();

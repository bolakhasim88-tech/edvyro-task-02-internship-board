/* ========================================
   1. INTERNSHIP DATA FROM API
======================================== */

let internships = [];

const API_URL = "http://localhost:4000/api/internships";



/* ========================================
   2. SELECT HTML ELEMENTS
======================================== */

const internshipList = document.getElementById("internship-list");

// Application Form Elements
const applicationSection = document.getElementById("application");
const applicationForm = document.getElementById("application-form");
const applicationInternshipId = document.getElementById(
    "application-internship-id"
);
const selectedInternship = document.getElementById("selected-internship");
const applicationMessage = document.getElementById("application-message");
applicationMessage.setAttribute("role", "status");
applicationMessage.setAttribute("aria-live", "polite");
const applicationCancel = document.getElementById("application-cancel");
const applicationSubmit = document.getElementById("application-submit");

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

    <div class="card-actions">

        <button
            type="button"
            class="apply-button"
            data-internship-id="${internship.id}"
        >
            View Details
        </button>

        <button
            type="button"
            class="apply-now-button"
            data-internship-id="${internship.id}"
        >
            Apply Now
        </button>

    </div>

</div>
        `;

        internshipList.appendChild(card);

    });

}

// Open Application Form
internshipList.addEventListener("click", (event) => {

    const applyButton = event.target.closest(".apply-now-button");

    if (!applyButton) {
        return;
    }

    const internshipId = applyButton.dataset.internshipId;

    const internship = internships.find(
        (item) => String(item.id) === String(internshipId)
    );

    if (!internship) {
        return;
    }

    applicationInternshipId.value = internship.id;

    selectedInternship.textContent =
        `Applying for ${internship.title} at ${internship.company}`;

   

    applicationSection.hidden = false;

    applicationSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// Cancel Application
applicationCancel.addEventListener("click", () => {

    applicationForm.reset();

    applicationMessage.textContent = "";

    applicationSection.hidden = true;

});


applicationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Client-side validation
  if (!applicationForm.checkValidity()) {
    applicationForm.reportValidity();
    return;
  }

  const internshipId = applicationInternshipId.value;

  const applicationData = {
    name: document.getElementById("applicant-name").value.trim(),
    email: document.getElementById("applicant-email").value.trim(),
    phone: document.getElementById("applicant-phone").value.trim(),
    resume: document.getElementById("applicant-resume").value.trim(),
    coverLetter: document
      .getElementById("applicant-cover-letter")
      .value.trim(),
  };

  // Loading state
  applicationSubmit.disabled = true;
  applicationSubmit.textContent = "Submitting...";
  applicationMessage.textContent = "Submitting your application...";

  try {
    const response = await fetch(
      `${API_URL}/${internshipId}/apply`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      }
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      const errorMessage =
        result.message || "Failed to submit application.";

      throw new Error(errorMessage);
    }

    applicationMessage.textContent =
    "Application submitted successfully! Your application has been received.";

applicationMessage.style.color = "#15803d";
applicationMessage.style.backgroundColor = "#f0fdf4";
applicationMessage.style.border = "1px solid #bbf7d0";
applicationMessage.style.padding = "14px";
applicationMessage.style.borderRadius = "8px";
applicationMessage.style.fontWeight = "600";
applicationMessage.style.display = "block";

applicationForm.reset();

applicationInternshipId.value = internshipId;

  } catch (error) {
    console.error("Application submission error:", error);

    applicationMessage.textContent =
      error.message || "Something went wrong. Please try again.";

    applicationMessage.style.color = "red";
  } finally {
  applicationSubmit.disabled = false;

  if (
    applicationMessage.textContent.includes(
      "Application submitted successfully!"
    )
  ) {
    applicationSubmit.textContent = "Application Submitted";
    applicationSubmit.disabled = true;
  } else {
    applicationSubmit.textContent = "Submit Application";
  }
}
});


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
async function initializeInternships() {

    errorState.hidden = true;
    emptyState.hidden = true;

    internshipList.replaceChildren();

    resultsCount.textContent = "Loading internships...";

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();

        if (!result.success || !Array.isArray(result.data)) {
            throw new Error("Invalid API response");
        }

        internships = result.data;

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

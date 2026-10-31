
const express = require("express");
const router = express.Router();
const db = require("../db");

// Fields allowed for internships
const internshipFields = [
  "title",
  "company",
  "location",
  "type",
  "description",
];

// POST a new internship application
router.post("/:id/apply", (req, res) => {
  try {
    const internshipId = Number(req.params.id);

    // Validate internship ID
    if (!Number.isInteger(internshipId) || internshipId <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const {
      name,
      email,
      phone,
      resume,
      coverLetter,
    } = req.body;

    // Server-side validation
    const errors = {};

    if (
      typeof name !== "string" ||
      name.trim().length < 2 ||
      name.trim().length > 100
    ) {
      errors.name = "Name must be between 2 and 100 characters";
    }

    if (
      typeof email !== "string" ||
      email.trim().length > 150 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      errors.email = "Please enter a valid email address";
    }

    if (
      typeof phone !== "string" ||
      !/^[0-9]{10}$/.test(phone)
    ) {
      errors.phone = "Phone number must contain 10 digits";
    }

    if (
      typeof resume !== "string" ||
      resume.trim().length > 500 ||
      !/^https?:\/\/\S+$/i.test(resume.trim())
    ) {
      errors.resume = "Please enter a valid resume URL";
    }

    if (
      typeof coverLetter !== "string" ||
      coverLetter.trim().length < 20 ||
      coverLetter.trim().length > 2000
    ) {
      errors.coverLetter =
        "Cover letter must be between 20 and 2000 characters";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        success: false,
        message: "Please correct the form errors",
        errors,
      });
    }

    // Check whether internship exists
    const internship = db
      .prepare("SELECT id FROM internships WHERE id = ?")
      .get(internshipId);

    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    // Save application using a parameterized query
    const result = db
      .prepare(`
        INSERT INTO applications (
          internship_id,
          name,
          email,
          phone,
          resume,
          cover_letter
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .run(
        internshipId,
        name.trim(),
        email.trim(),
        phone,
        resume.trim(),
        coverLetter.trim()
      );

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      applicationId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error("APPLICATION SUBMISSION ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
});


// GET all internships with pagination
router.get("/", (req, res) => {
  try {
    // Get page and limit from query parameters
    const page = req.query.page === undefined
  ? 1
  : Number.parseInt(req.query.page, 10);

const limit = req.query.limit === undefined
  ? 10
  : Number.parseInt(req.query.limit, 10);

    // Validate page and limit
    if (
      !Number.isInteger(page) ||
      !Number.isInteger(limit) ||
      page < 1 ||
      limit < 1 ||
      limit > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "Page must be >= 1 and limit must be between 1 and 100",
      });
    }

    // Calculate how many records to skip
    const offset = (page - 1) * limit;

    // Get total number of internships
    const total = db
      .prepare("SELECT COUNT(*) AS total FROM internships")
      .get().total;

    // Get internships for the requested page
    const internships = db
      .prepare(
        "SELECT * FROM internships ORDER BY id DESC LIMIT ? OFFSET ?"
      )
      .all(limit, offset);

    res.status(200).json({
      success: true,
      count: internships.length,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: internships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch internships",
    });
  }
});

// Get a single internship by ID
router.get("/:id", (req, res) => {
  try {
    const id = Number.parseInt(req.params.id, 10);

    // Validate internship ID
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    // Fetch internship from SQLite database
    const internship = db
      .prepare("SELECT * FROM internships WHERE id = ?")
      .get(id);

    // Check whether internship exists
    if (!internship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: internship,
    });
  } catch (error) {
    console.error("Get internship by ID error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// POST a new internship
router.post("/", (req, res) => {
  try {
    const { title, company, location, type, description } = req.body;

   const missingFields = allowedFields.filter(
      (field) =>
        typeof req.body[field] !== "string" ||
        req.body[field].trim() === ""
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        errors: missingFields,
      });
    }

    const result = db
      .prepare(`
        INSERT INTO internships (
          title,
          company,
          location,
          type,
          description
        )
        VALUES (?, ?, ?, ?, ?)
      `)
      .run(
        title.trim(),
        company.trim(),
        location.trim(),
        type.trim(),
        description.trim()
      );

    const newInternship = db
      .prepare("SELECT * FROM internships WHERE id = ?")
      .get(result.lastInsertRowid);

    res.status(201).json({
      success: true,
      message: "Internship created successfully",
      data: newInternship,
    });
  } catch (error) {
  console.error("CREATE INTERNSHIP ERROR:", error);

  res.status(500).json({
    success: false,
    message: "Failed to create internship",
    error: error.message,
  });
}
});


const allowedFields = [
  "title",
  "company",
  "location",
  "type",
  "description",
];

// PUT update internship
router.put("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const fields = Object.keys(req.body);

    if (fields.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one field is required",
      });
    }

    const invalidFields = fields.filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid fields",
        errors: invalidFields,
      });
    }

    for (const field of fields) {
      if (
        typeof req.body[field] !== "string" ||
        req.body[field].trim() === ""
      ) {
        return res.status(400).json({
          success: false,
          message: `${field} must be a non-empty string`,
        });
      }
    }

    const existingInternship = db
      .prepare("SELECT * FROM internships WHERE id = ?")
      .get(id);

    if (!existingInternship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    const updatedData = {
      ...existingInternship,
      ...Object.fromEntries(
        fields.map((field) => [field, req.body[field].trim()])
      ),
    };

    db.prepare(`
      UPDATE internships
      SET title = ?,
          company = ?,
          location = ?,
          type = ?,
          description = ?
      WHERE id = ?
    `).run(
      updatedData.title,
      updatedData.company,
      updatedData.location,
      updatedData.type,
      updatedData.description,
      id
    );

    const updatedInternship = db
      .prepare("SELECT * FROM internships WHERE id = ?")
      .get(id);

    res.status(200).json({
      success: true,
      message: "Internship updated successfully",
      data: updatedInternship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update internship",
    });
  }
});


 // DELETE internship
router.delete("/:id", (req, res) => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid internship ID",
      });
    }

    const existingInternship = db
      .prepare("SELECT * FROM internships WHERE id = ?")
      .get(id);

    if (!existingInternship) {
      return res.status(404).json({
        success: false,
        message: "Internship not found",
      });
    }

    db.prepare("DELETE FROM internships WHERE id = ?").run(id);

    res.status(200).json({
      success: true,
      message: "Internship deleted successfully",
      data: existingInternship,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete internship",
    });
  }
});


module.exports = router;

const express = require("express");
const {
  createProject,
  checkIfProjectExists,
  getProject,
} = require("../controllers/project");
const router = express.Router();

router.get("/project/:projectId", getProject);
router.post("/project/new/:userId", createProject);
router.post("/project/check", checkIfProjectExists);

module.exports = router;

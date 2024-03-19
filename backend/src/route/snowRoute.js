"use strict";
const express = require("express");
const { hospitals, patients, patientsByDivision, getHospitalInfoCount, getMonthlyHospitalVisitCount } = require("../controllers/snowflakeController.js");
const router = express.Router();

router.get("/snowflake/hospitals", hospitals);
router.get("/snowflake/patients", patients);
router.get("/snowflake/patientsByDivision", patientsByDivision);
router.get("/snowflake/getHospitalInfoCount", getHospitalInfoCount);
router.get("/snowflake/getMonthlyHospitalVisitCount", getMonthlyHospitalVisitCount);

module.exports = router;
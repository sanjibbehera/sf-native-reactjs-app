"use strict";
const express = require("express");
const { hospitals } = require("../controllers/snowflakeController.js");
const router = express.Router();

router.get("/snowflake/hospitals", hospitals);

module.exports = router;
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config()

const port = process.env.SNOWFLAKE_PORT;

app.use(bodyParser.json());

const snowflakeRoutes = require('./src/route/snowRoute.js');

app.use('/api', snowflakeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

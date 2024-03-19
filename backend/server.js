const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const snowflakeRoutes = require('./src/route/snowRoute.js');
const app = express();
dotenv.config()

const port = 8888;
app.use(bodyParser.json());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use('/api', snowflakeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

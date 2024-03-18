const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const snowflakeRoutes = require('./src/route/snowRoute.js');

app.use('/api', snowflakeRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

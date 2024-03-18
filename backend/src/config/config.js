const options = {
    account: process.env.SNOWFLAKE_ACCOUNT,
    username: process.env.SNOWFLAKE_USERNAME,
    database: process.env.SNOWFLAKE_DATABASE,
    schema: process.env.SNOWFLAKE_SCHEMA,
    warehouse: process.env.SNOWFLAKE_WAREHOUSE,
    password: process.env.SNOWFLAKE_PASSWORD,
};

// 4.2.3 create the connection to the Snowflake account
const snowflake = require('snowflake-sdk');
const connection = snowflake.createConnection(options);
connection.connect((err, conn) => {
    if (err) {
        console.error('Unable to connect to Snowflake', err);
    } else {
        console.log('Connected to Snowflake account ' + options.account);
    }
});

module.exports = connection;
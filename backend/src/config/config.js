const options = {
    account: 'UKBSCDI-AT89293',
    username: 'MEDHA',
    database: 'SNOWFLAKE_SAMPLE_DATA',
    schema: 'TPCDS_SF10TCL',
    warehouse: 'TRIAL',
    password: 'Teqfocus!1',
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
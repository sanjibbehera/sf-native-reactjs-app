"use strict";

const connection = require('../config/config.js');

const hospitals = async (request, response) => {
    let data = {};
    let message, errorResult;
    let status = 200;
    const hospitals = [];

    try {
        const query = 'SELECT * FROM CALL_CENTER';
        const resultSet = connection.execute({
            sqlText: query,
            complete: function (err, stmt, rows) {
                if (err) {
                    throw err;
                }
                rows.forEach(function (row) {
                    const hospital = {
                        id: row.CC_CALL_CENTER_ID,
                        hospital_branch: row.CC_NAME,
                        patients: row.CC_MANAGER,
                        emc:row.CC_MKT_ID,
                        Admitted:row.CC_STREET_NUMBER,
                        new_admit:row.CC_DIVISION,
                        date:row.CC_REC_END_DATE
                    };
                    hospitals.push(hospital);
                });

                data = hospitals;
                return response.json(data);
            }
        });
    } catch (error) {
        message = error.message;
        status = error.status === (void 0) ? 500 : error.status;
        data = {
            Error:
                error.data === (void 0)
                    ? "Unable to fetch hospital detail !"
                    : error.data
        };
        return response.status(status).json(data);
    }
};

module.exports = { hospitals };

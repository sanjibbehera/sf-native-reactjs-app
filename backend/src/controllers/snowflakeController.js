"use strict";
const connection = require('../config/config.js');
const { genderCountsByMonth } = require('../data/chart.js');

const hospitals = async (request, response) => {
    let data = {};
    let message, errorResult;
    let status = 200;
    const hospitals = [];

    try {
        const query = 'SELECT * FROM SNOWFLAKE_SAMPLE_DATA.TPCDS_SF100TCL.CALL_CENTER;';
        const resultSet = connection.execute({
            sqlText: query,
            complete: function (err, stmt, rows) {
                if (err) {
                    throw err;
                }
                rows.forEach(function (row) {
                    const hospital = {
                        id: row.CC_CALL_CENTER_ID,
                        hospital_name: row.CC_STREET_NAME,
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

const getHospitalInfoCount = async (request, response) => {
    let data = {};
    let message, errorResult;
    let status = 200;
    const gethospitalinfoCount = [];

    try {
        const query = 'SELECT * FROM SNOWFLAKE_SAMPLE_DATA.TPCDS_SF100TCL.CALL_CENTER Limit 1;';
        const resultSet = connection.execute({
            sqlText: query,
            complete: function (err, stmt, rows) {
                if (err) {
                    throw err;
                }
                rows.forEach(function (row) {
                    const hospital = {
                        hospitals: row.CC_STREET_NUMBER * 2,
                        staff: row.CC_STREET_NUMBER/2,
                        emergencies: row.CC_STREET_NUMBER,
                        doctors:row.CC_STREET_NUMBER * 3,
                    };
                    gethospitalinfoCount.push(hospital);
                });

                data = gethospitalinfoCount;
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

const patients = async (request, response) => {
    let data = {};
    let message, errorResult;
    let status = 200;
    const patients = [];

    try {
        const query = 'SELECT * FROM SMARTWATCH_SNOWPIPE ORDER BY time DESC LIMIT 5';
        const resultSet = connection.execute({
            sqlText: query,
            complete: function (err, stmt, rows) {
                if (err) {
                    throw err;
                }
                rows.forEach(function (row) {
                    const patient = {
                        id: row.PATIENT_ID,
                        name: row.PATIENT_NAME,
                        day: row.DAY_NAME,
                        city:row.CITY,
                        blood_oxygen_level:row.BLOOD_OXYGEN_LEVEL,
                        blood_pressure_high:row.BLOOD_PRESSURE_HIGH,
                        blood_pressure_low:row.BLOOD_PRESSURE_LOW,
                        blood_pressure_range:row.BLOOD_PRESSURE_RANGE,
                        body_temp:row.BODY_TEMP,
                        oxygen_level:row.OXYGEN_LEVEL,
                        heart_rate:row.HEART_RATE,
                        stress_monitoring:row.STRESS_MONITORING,
                        steps_count:row.STEPS_COUNT
                    };
                    patients.push(patient);
                });

                data = patients;
                return response.json(data);
            }
        });
    } catch (error) {
        message = error.message;
        status = error.status === (void 0) ? 500 : error.status;
        data = {
            Error:
                error.data === (void 0)
                    ? "Unable to fetch patient detail !"
                    : error.data
        };
        return response.status(status).json(data);
    }
};

const patientsByDivision = async (request, response) => {
    let data = {};
    let message, errorResult;
    let status = 200;
    const patientsByDivision = [];

    try {
        const query = 'SELECT "PROCEDURE_NAME", COUNT(*) AS record_count FROM ONCOLOGY_DEMO.OMOP.PROCEDURE_OCCURRENCE GROUP BY "PROCEDURE_NAME"';
        const resultSet = connection.execute({
            sqlText: query,
            complete: function (err, stmt, rows) {
                if (err) {
                    throw err;
                }
                rows.forEach(function (row) {
                    const patient = {
                        divison: row.PROCEDURE_NAME,
                        inpatient: row.RECORD_COUNT/2,
                        outpatient: row.RECORD_COUNT,
                    };
                    patientsByDivision.push(patient);
                });

                data = patientsByDivision;
                return response.json(data);
            }
        });
    } catch (error) {
        message = error.message;
        status = error.status === (void 0) ? 500 : error.status;
        data = {
            Error:
                error.data === (void 0)
                    ? "Unable to fetch patient detail !"
                    : error.data
        };
        return response.status(status).json(data);
    }
};

const getMonthlyHospitalVisitCount = async (request, response) => {
    let data = {};
    let message, errorResult;
    let status = 200;

    try {
        data = genderCountsByMonth;
        return response.json(data);
    } catch (error) {
        message = error.message;
        status = error.status === undefined ? 500 : error.status;
        data = {
            Error: error.data === undefined ? "Unable to fetch patient visit count!" : error.data
        };
        return response.status(status).json(data);
    }
};

module.exports = { hospitals, patients, patientsByDivision, getHospitalInfoCount, getMonthlyHospitalVisitCount };

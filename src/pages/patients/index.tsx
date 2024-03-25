import CustomCard from "@/components/CustomCard";
import Layout from "@/components/Layout";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import Image from "next/image";
import PatientIcon from "../../../public/patient.png";
import RecoveredPatient from "../../styles/icons/Recovery.png";
import CriticalIcon from "../../styles/icons/critical.png";
import NewPatient from "../../styles/icons/newpatient.png";
import VIP from "../../styles/icons/vip.png";
import { useEffect, useState } from "react";
import { fetchPatientsByDivision } from "../api/dashboard";
const cardData = [
  {
    heading: "Total Patients",
    imageAlt: "patientIcon",
    imageSrc: PatientIcon,
    value: "4,000",
    backgroundColor: "linear-gradient(to right, #C6E1FF , #B0D6FF)",
  },
  {
    heading: "New Patients",
    imageAlt: "newpatientIcon",
    imageSrc: NewPatient,
    value: "1,200",
    backgroundColor: "linear-gradient(to right, #FFC6D0 , #FFC0C0)",
  },
  {
    heading: "Recovered",
    imageAlt: "recoveredIcon",
    value: "3,000",
    imageSrc: RecoveredPatient,
    backgroundColor: "linear-gradient(to right, #B5FFD7 , #ACFFBE)",
  },
  {
    heading: "VIP Patients",
    imageAlt: "vipIcon",
    value: "500",
    imageSrc: VIP,
    backgroundColor: "linear-gradient(to right, #87C781 , #3EA300)",
  },
];

interface PatientData {
  name: string;
  blood_pressure: string;
  patient_status: string;
  ecg_report: string;
  admitted_date: string;
  discharge_date: string;
  notes_remarks: string;
}

declare namespace JSX {
  interface IntrinsicElements {
    "tableau-viz": any;
  }
}

function createData(
  name: string,
  blood_pressure: string,
  patient_status: string,
  ecg_report: string,
  admitted_date: string,
  discharge_date: string,
  notes_remarks: string
): PatientData {
  return {
    name,
    blood_pressure,
    patient_status,
    ecg_report,
    admitted_date,
    discharge_date,
    notes_remarks,
  };
}

const rows: PatientData[] = [
  createData(
    "Rajnish Pandey",
    "120/80 mmHg",
    "Regular",
    "Normal",
    "2023-03-20",
    "2023-03-22",
    "No significant remarks"
  ),
  createData(
    "Sarah Johnson",
    "130/85 mmHg",
    "Stable",
    "Normal",
    "2023-03-21",
    "2023-03-24",
    "Mild headache reported"
  ),
  createData(
    "David Lee",
    "140/90 mmHg",
    "Stable",
    "Abnormal",
    "2023-03-22",
    "2023-03-25",
    "Palpitations observed"
  ),
];

function Index() {
  const [patientByDiv, setPatientByDiv] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchPatientsByDivision()
      .then((data) => {
        setPatientByDiv(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Layout>
      <Box my={2}>
        <Box p={1} pt={2}>
          <Typography variant="h4" component="div">
            Patients Details
          </Typography>
        </Box>
      </Box>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap={"wrap"}
      >
        {cardData.map((card, index) => (
          <Box key={index}>
            <CustomCard
              backgroundColor={card.backgroundColor}
              imageAlt={card.imageAlt}
              heading={card.heading}
              value={card.value}
              imageSrc={card.imageSrc}
            />
          </Box>
        ))}
        <Box sx={{ display: "flex", flexGrow: 3, flexDirection: "column" }}>
          <Stack
            spacing={{ xs: 1, sm: 2 }}
            width={"80%"}
            direction="row"
            useFlexGap
            flexWrap={"wrap"}
          >
            <Paper
              sx={{
                width: "100%",
                p: 2,
                borderRadius: 2,
                backgroundImage: "radial-gradient(#FB7D7D , #FB6161)",
                color: "#fff",
              }}
            >
              <Typography variant="h4" p={1}>
                Critical Patients
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography component={"b"} variant="h4">
                  &nbsp;
                </Typography>
                <Typography variant="h4">200</Typography>
                <Image
                  alt="Critical"
                  style={{ margin: 5 }}
                  width={50}
                  src={CriticalIcon}
                />
              </Box>
            </Paper>
            <Paper sx={{ flexGrow: 1, borderRadius: 2 }}>
              <Typography variant="h6" component={"div"} p={1}>
                In ICU
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Typography px={2} variant="h4">
                  10
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ flexGrow: 1, borderRadius: 2 }}>
              <Typography variant="h6" component={"div"} p={1}>
                In Operation
              </Typography>
              <Box
                display={"flex"}
                justifyContent={"flex-end"}
                alignItems={"center"}
              >
                <Typography px={2} variant="h4">
                  10
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Box>
        <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
          <div>
            <Card elevation={0} sx={{ borderRadius: 5 }}>
              <CardHeader title="Patient Details" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Blood Pressure</TableCell>
                        <TableCell align="right">Patient Status</TableCell>
                        <TableCell align="right">ECG Report</TableCell>
                        <TableCell align="right">Admitted Date</TableCell>
                        <TableCell align="right">Discharge Date</TableCell>
                        <TableCell align="right">Notes/Remarks</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">
                            {row.blood_pressure}
                          </TableCell>
                          <TableCell align="right">
                            {row.patient_status}
                          </TableCell>
                          <TableCell align="right">{row.ecg_report}</TableCell>
                          <TableCell align="right">
                            {row.admitted_date}
                          </TableCell>
                          <TableCell align="right">
                            {row.discharge_date}
                          </TableCell>
                          <TableCell align="right">
                            {row.notes_remarks}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card elevation={0} sx={{ borderRadius: 5 }}>
              <CardHeader title="Patients By Division" />
              <CardContent>
                <TableContainer sx={{ maxHeight: 295 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Division</b>
                        </TableCell>
                        <TableCell>
                          <b>In-Patients</b>
                        </TableCell>
                        <TableCell>
                          <b>Out-Patients</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ overflow: "scroll" }}>
                      {(rowsPerPage > 0
                        ? patientByDiv.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                        : patientByDiv
                      ).map((patientRole: any, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {patientRole.divison}
                          </TableCell>
                          <TableCell align="right">
                            {patientRole.inpatient}
                          </TableCell>
                          <TableCell align="right">
                            {patientRole.outpatient}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 20]}
                    component="div"
                    count={patientByDiv.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </CardContent>
            </Card>
          </div>
        </div>
        <Box>
          <script
            type="module"
            src="
https://prod-apnortheast-a.online.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
          ></script>
          <tableau-viz
            id="tableau-viz"
            src="
https://prod-apnortheast-a.online.tableau.com/t/jeetpatel797953b74907bdf/views/OncologyDashboardwithfixedHandW/OncologyDashboardWithhandw/eeed0dbd-a45a-44fa-9e70-decaed217132/92b4cae9-d801-4dd7-b291-b35699735860"
            width="1400"
            height="840"
            hide-tabs
            toolbar="bottom"
          ></tableau-viz>
        </Box>
      </Stack>
    </Layout>
  );
}

export default Index;

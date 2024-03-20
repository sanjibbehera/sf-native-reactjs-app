import CustomCard from "@/components/CustomCard";
import Layout from "@/components/Layout";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
} from "@mui/material";
import dynamic from "next/dynamic";
// import Image from "next/image";
// import MapImage from "../static/img/map.png";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/south-america.json";

import SunIcon from "@/components/Icons/Sun";
import { useEffect, useState } from "react";
import StaffIcon from "../../public/Nurse.png";
import DoctorIcon from "../../public/doctor.png";
import EmergencyIcon from "../../public/emergency.png";
import PatientIcon from "../../public/patient.png";
import {
  fetchHospitalInfo,
  fetchHospitals,
  fetchMonthlyHospitalVisitCount,
  fetchPatientsByDivision,
} from "./api/dashboard";

function createData(name: string, calories: string) {
  return { name, calories };
}

const rows = [
  createData(
    "City Hospital,Malbar hill",
    "20,axc road,Malbar lane,Malbar hill,mumbai"
  ),
  createData(
    "City Hospital,Bandstand",
    "30,Atif Colony,lambat Nagar,Bandstand,mumbai"
  ),
  createData(
    "City Hospital,Mohamd Ali Petrolpump",
    "54,Kamgar square,8wqe building,Mohamd Ali Petrolpump,mumbai"
  ),
  createData(
    "City Hospital,xyas lane,Raji Nagar",
    "213,qwe Lane,xyas lane,Raji Nagar,mumbai"
  ),
  createData(
    "City Hospital,Jaripatka",
    "1032,yud Mall,SXD lane,Jaripatka,mumbai"
  ),
];

export default function Home() {
  const [cardItems, setCardItems]: any[] = useState([]);
  const [addmitted, setAddmitted] = useState([]);
  const [hospital, setHospitals] = useState([]);
  const [patientByDiv, setPatientByDiv] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [hospitalpage, setHospitalspage] = useState(0);
  const [hospitalRowsPerPage, setHospitalRowsPerPage] = useState(10);

  useEffect(() => {
    fetchHospitalInfo()
      .then((data) => {
        const cardData = [
          {
            heading: "Total Patients",
            imageAlt: "patientIcon",
            imageSrc: PatientIcon,
            value: `${data[0].hospitals}`,
            backgroundColor: "linear-gradient(to right, #C6E1FF , #B0D6FF)",
          },
          {
            heading: "Emergency Calls",
            imageAlt: "EmergencyIcon",
            imageSrc: EmergencyIcon,
            value: data[0].emergencies,
            backgroundColor: "linear-gradient(to right, #FFC6D0 , #FFC0C0)",
          },
          {
            heading: "Staff",
            imageAlt: "StaffIcon",
            value: data[0].staff,
            imageSrc: StaffIcon,
            backgroundColor: "linear-gradient(to right, #B5FFD7 , #ACFFBE)",
          },
          {
            heading: "Doctors",
            imageAlt: "DoctorIcon",
            value: data[0].doctors,
            imageSrc: DoctorIcon,
            backgroundColor: "linear-gradient(to right, #DEFFF1 , #C0FFF0)",
          },
        ];
        setCardItems(cardData);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchMonthlyHospitalVisitCount()
      .then((data) => {
        setAddmitted(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchPatientsByDivision()
      .then((data) => {
        setPatientByDiv(data);
      })
      .catch((err) => {
        console.log(err);
      });
    fetchHospitals()
      .then((data) => {
        setHospitals(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Generate random data for the Area Chart
  const generateRandomData = (length: number, values: number[]) => {
    return Array.from({ length }, (_, index) => values[index % values.length]);
  };

  // Data for the Area Chart
  const areaChartData = [
    {
      name: "Male",
      data: generateRandomData(
        addmitted.length,
        addmitted.map((data) => data?.male)
      ),
    }, // 12 months
    {
      name: "Female",
      data: generateRandomData(
        addmitted.length,
        addmitted.map((data) => data?.female)
      ),
    },
  ];

  // ApexChart options
  const areaChartOptions = {
    xaxis: {
      categories: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    },
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleHospitalPage = (event: unknown, newPage: number) => {
    setHospitalspage(newPage);
  };

  const handleHospitalRowsPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHospitalRowsPerPage(parseInt(event.target.value, 10));
  };

  console.log("addmitted", hospital);

  return (
    <Layout>
      <Box my={2}>
        <Box sx={{ position: "absolute", zIndex: "-1" }}>
          <SunIcon />
        </Box>
        <Box p={1} pt={2}>
          <Typography variant="h4" component="div">
            Welcome Admin!
          </Typography>
          <Typography variant="subtitle1" component="div">
            Today’s weather is 27 °(Clear), Have a nice day!
          </Typography>
        </Box>
      </Box>
      <Box>
        <Grid container spacing={2}>
          {cardItems.map((card: any, index: number) => (
            <Grid item key={index}>
              <CustomCard
                backgroundColor={card.backgroundColor}
                imageAlt={card.imageAlt}
                heading={card.heading}
                value={card.value}
                imageSrc={card.imageSrc}
              />
            </Grid>
          ))}
          <Grid item md={5}>
            <TableContainer
              elevation={0}
              sx={{ borderRadius: 5, p: 1.2, maxHeight: 290 }}
              component={Paper}
            >
              <Typography variant="h5" p={1}>
                Branch Location
              </Typography>
              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                <Table size="small" aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <b>Branch Name</b>
                      </TableCell>
                      <TableCell align="right">
                        <b>Branch Location</b>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ overflow: "scroll" }}>
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
                        <TableCell align="right">{row.calories}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TableContainer>

            {/* <Box sx={{ display: "flex", flexDirection: "column", border: "1px solid lightgrey", borderRadius: 2 }}>
              <Typography p={1} variant="h6">Branch Location</Typography>
              <Image
                alt="map location"
                src={MapImage}
                style={{ width: "100%", height: "250px" }}
              />
            </Box> */}
          </Grid>
          <Grid item wrap="wrap">
            <Card elevation={0} sx={{ borderRadius: 5, width: 700 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  Average Patients Admitted Graph
                </Typography>
                <ReactApexChart
                  type="area"
                  series={areaChartData || []}
                  options={areaChartOptions || []}
                  height={260}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item wrap="wrap" md={5}>
            <Card elevation={0} sx={{ borderRadius: 5 }}>
              <CardHeader title="Patients By Division" />
              <CardContent>
                <TableContainer sx={{ maxHeight: 243 }}>
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
                    rowsPerPageOptions={[5, 10, 25]}
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
          </Grid>
          <Grid item wrap="wrap" md={12}>
            <Card elevation={0} sx={{ borderRadius: 5, width: "96%", mb: 2 }}>
              <CardHeader title="Hospital Details" />
              <CardContent>
                <TableContainer>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Hospital Name</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Hospital Branch</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Emc</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Admitted</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>New Admitted</b>
                        </TableCell>
                        <TableCell align="right">
                          <b>Date</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ overflow: "scroll" }}>
                      {(hospitalRowsPerPage > 0
                        ? hospital.slice(
                            hospitalpage * hospitalRowsPerPage,
                            hospitalpage * hospitalRowsPerPage +
                              hospitalRowsPerPage
                          )
                        : hospital
                      ).map((hospital: any, i) => (
                        <TableRow
                          key={i}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {hospital.hospital_name}
                          </TableCell>
                          <TableCell align="right">
                            {hospital.hospital_branch}
                          </TableCell>
                          <TableCell align="right">{hospital.emc}</TableCell>
                          <TableCell align="right">
                            {hospital.Admitted}
                          </TableCell>
                          <TableCell align="right">
                            {hospital.new_admit}
                          </TableCell>
                          <TableCell align="right">{hospital.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={hospital.length}
                    rowsPerPage={hospitalRowsPerPage}
                    page={hospitalpage}
                    onPageChange={handleHospitalPage}
                    onRowsPerPageChange={handleHospitalRowsPage}
                  />
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

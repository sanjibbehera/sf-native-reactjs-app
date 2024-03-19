import CustomCard from "@/components/CustomCard";
import Layout from "@/components/Layout";
import { Box, Card, CardContent, CardHeader, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import dynamic from "next/dynamic";
// import Image from "next/image";
// import MapImage from "../static/img/map.png";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/south-america.json";

import SunIcon from "@/components/Icons/Sun";
import StaffIcon from '../../public/Nurse.png';
import DoctorIcon from '../../public/doctor.png';
import EmergencyIcon from '../../public/emergency.png';
import PatientIcon from '../../public/patient.png';


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


export default function Home() {

  // Generate random data for the Area Chart
  const generateRandomData = (length: number) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100));
  };

  // Data for the Area Chart
  const areaChartData = [
    { name: 'Male', data: generateRandomData(12) }, // 12 months
    { name: 'Female', data: generateRandomData(12) },
  ];

  // ApexChart options
  const areaChartOptions = {
    xaxis: {
      categories: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
    },
  };

  const cardData = [
    { heading: 'Total Patients', imageAlt: 'patientIcon', imageSrc: PatientIcon, value: '4,000', backgroundColor: "linear-gradient(to right, #C6E1FF , #B0D6FF)" },
    { heading: 'Emergency Calls', imageAlt: 'EmergencyIcon', imageSrc: EmergencyIcon, value: '1,200', backgroundColor: "linear-gradient(to right, #FFC6D0 , #FFC0C0)" },
    { heading: 'Staff', imageAlt: 'StaffIcon', value: '3,000', imageSrc: StaffIcon, backgroundColor: "linear-gradient(to right, #B5FFD7 , #ACFFBE)" },
    { heading: 'Doctors', imageAlt: 'DoctorIcon', value: '500', imageSrc: DoctorIcon, backgroundColor: "linear-gradient(to right, #DEFFF1 , #C0FFF0)" },
  ];

  return (
    <Layout>
      <Box my={2} >
        <Box sx={{ position: 'absolute', zIndex: '-1' }} >
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
          {cardData.map((card, index) => (
            <Grid item key={index}>
              <CustomCard
                backgroundColor={card.backgroundColor}
                imageAlt={card.imageAlt}
                heading={card.heading}
                value={card.value}
                imageSrc={card.imageSrc} />
            </Grid>
          ))}
          <Grid item md={5}>
            <TableContainer elevation={0} sx={{ borderRadius: 5, p: 1.2 }} component={Paper}>
              <Typography variant="h5" p={1}>Branch Location</Typography>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Dessert (100g serving)</TableCell>
                    <TableCell align="right">Calories</TableCell>
                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                      <TableCell align="right">{row.fat}</TableCell>
                      <TableCell align="right">{row.carbs}</TableCell>
                      <TableCell align="right">{row.protein}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
          <Grid item wrap="wrap" >
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
              <CardHeader
                title="Patients By Division"
              />
              <CardContent>
                <TableContainer>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item wrap="wrap" md={12}>
            <Card elevation={0} sx={{ borderRadius: 5, width: "96%", mb: 2 }}>
              <CardHeader
                title="Hospital Details"
              />
              <CardContent>
                <TableContainer>
                  <Table size="small" aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Layout>
  );
}

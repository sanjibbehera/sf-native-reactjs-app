import Layout from "@/components/Layout";
import EmergencyCallIcon from '@mui/icons-material/Call';
import StaffIcon from '@mui/icons-material/Group';
import DoctorIcon from '@mui/icons-material/LocalHospital';
import PatientsIcon from '@mui/icons-material/People';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import dynamic from "next/dynamic";
import Image from "next/image";
import MapImage from "../static/img/map.png";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/south-america.json";

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
    { icon: <PatientsIcon />, title: 'Total Patients', value: 4000 },
    { icon: <EmergencyCallIcon />, title: 'Emergency Calls', value: 1200 },
    { icon: <StaffIcon />, title: 'Staff', value: 3000 },
    { icon: <DoctorIcon />, title: 'Doctors', value: 500 },
  ];

  return (
    <Layout>
      <Box my={2} >
        <Typography variant="h6" component="div">
          Welcome Admin!
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {cardData.map((card, index) => (
          <Grid item key={index} xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {card.icon} {card.title}
                </Typography>
                <Typography variant="h5">{card.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="div">
                Average Patients Admitted Graph
              </Typography>
              <ReactApexChart
                type="area"
                series={areaChartData || []}
                options={areaChartOptions || []}
                height={300}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexGrow: 2, flexDirection: "column", border: "1px solid lightgrey", borderRadius: 2 }}>
            <Typography p={1} variant="h6">Branch Location</Typography>
            <Image
              alt="map location"
              src={MapImage}
              style={{ width: "100%" }}
            />
          </Box>
        </Grid>
      </Grid>
    </Layout>
  );
}

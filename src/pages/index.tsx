import CustomCard from "@/components/CustomCard";
import Layout from "@/components/Layout";
import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import dynamic from "next/dynamic";
import Image from "next/image";
import MapImage from "../static/img/map.png";
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/continents/south-america.json";

import SunIcon from "@/components/Icons/Sun";
import StaffIcon from '../../public/Nurse.png';
import DoctorIcon from '../../public/doctor.png';
import EmergencyIcon from '../../public/emergency.png';
import PatientIcon from '../../public/patient.png';
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
      <Box >
        <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap={"wrap"} >
          {cardData.map((card, index) => (
            <Box key={index}>
              <CustomCard
                backgroundColor={card.backgroundColor}
                imageAlt={card.imageAlt}
                heading={card.heading}
                value={card.value}
                imageSrc={card.imageSrc} />
            </Box>
          ))}
          <Box sx={{ display: "flex", flexGrow: 3, flexDirection: "column", border: "1px solid lightgrey", borderRadius: 2 }}>
            <Typography p={1} variant="h6">Branch Location</Typography>
            <Image
              alt="map location"
              src={MapImage}
              style={{ width: "100%", height: "250px" }}
            />
          </Box>
        </Stack>
      </Box>
      <Box mt={1} >
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
      </Box>
    </Layout >
  );
}

import CustomCard from "@/components/CustomCard";
import Layout from "@/components/Layout";
import { Box, Paper, Stack, Typography } from "@mui/material";
import BPIcon from '../../styles/icons/bp-icon.png';
import DoctorAssignedIcon from '../../styles/icons/doctor-assigned-icon.png';
import ECGIcon from '../../styles/icons/ecg-icon.png';
import HeartRateIcon from '../../styles/icons/heart-rate-icon.png';
const cardData = [
    { heading: 'ECG Report', imageAlt: 'ecg', imageSrc: ECGIcon, value: 'Normal', backgroundColor: "linear-gradient(to right, #C6E1FF , #B0D6FF)" },
    { heading: 'Blood Pressure', imageAlt: 'bp', imageSrc: BPIcon, value: '80/170', backgroundColor: "linear-gradient(to right, #FFC6D0 , #FFC0C0)" },
    { heading: 'Heart Rate', imageAlt: 'heartRate', value: '80bph', imageSrc: HeartRateIcon, backgroundColor: "linear-gradient(to right, #B5FFD7 , #ACFFBE)" },
    { heading: 'Doctor Assigned', imageAlt: 'doctor', value: 'Mr. Kapil', imageSrc: DoctorAssignedIcon, backgroundColor: "linear-gradient(to right, #C1F5BD , #B6F193)" },
];

function PatientDetail() {
    return (
        <Layout>
            <Box my={2} >
                <Box p={1} pt={2}>
                    <Typography variant="h4" component="div">
                        Patients Details
                    </Typography>
                    <Typography variant="h6" color={"GrayText"} >Mr.Amir Khan,xyz branch,pune 400102</Typography>
                </Box>
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
                    <Box sx={{ display: "flex", flexGrow: 3, flexDirection: "column" }}>
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 5 }} >
                            <Typography component="div" variant="h5">Mr. Amir Khan</Typography>
                            <Typography component="div" variant="body2">Address: 12th floor, Kamal Vihar, Elpishten Road,
                                Pune, 400102 </Typography>
                            <Typography component="div" variant="h6">Registered On</Typography>
                            <Typography component="div" variant="body2">10/01/23</Typography>
                            <Typography component="div" variant="h6">Current Doctor</Typography>
                            <Typography component="div" variant="body2">Mr. Rao</Typography>
                            <Typography component="div" variant="h6">Infected with / Disease</Typography>
                            <Typography component="div" variant="body2">Viral Fever</Typography>
                            <Typography component="div" variant="h6">Medicines Given</Typography>
                            <Typography component="div" variant="body2">Paracetomole, Aspirn, xc Tonic</Typography>
                        </Paper>
                    </Box>
                </Stack>
            </Box>
        </Layout>
    )
}

export default PatientDetail
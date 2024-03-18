import CustomCard from "@/components/CustomCard";
import Layout from "@/components/Layout";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import PatientIcon from '../../../public/patient.png';
import RecoveredPatient from '../../styles/icons/Recovery.png';
import CriticalIcon from '../../styles/icons/critical.png';
import NewPatient from '../../styles/icons/newpatient.png';
import VIP from '../../styles/icons/vip.png';
const cardData = [
    { heading: 'Total Patients', imageAlt: 'patientIcon', imageSrc: PatientIcon, value: '4,000', backgroundColor: "linear-gradient(to right, #C6E1FF , #B0D6FF)" },
    { heading: 'New Patients', imageAlt: 'newpatientIcon', imageSrc: NewPatient, value: '1,200', backgroundColor: "linear-gradient(to right, #FFC6D0 , #FFC0C0)" },
    { heading: 'Recovered', imageAlt: 'recoveredIcon', value: '3,000', imageSrc: RecoveredPatient, backgroundColor: "linear-gradient(to right, #B5FFD7 , #ACFFBE)" },
    { heading: 'VIP Patients', imageAlt: 'vipIcon', value: '500', imageSrc: VIP, backgroundColor: "linear-gradient(to right, #87C781 , #3EA300)" },
];


function Index() {
    return (
        <Layout>
            <Box my={2} >
                <Box p={1} pt={2}>
                    <Typography variant="h4" component="div">
                        Patients Details
                    </Typography>
                </Box>
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
                    <Stack spacing={{ xs: 1, sm: 2 }} width={"80%"} direction="row" useFlexGap flexWrap={"wrap"} >
                        <Paper sx={{ width: "100%", p: 2, borderRadius: 2, backgroundImage: "radial-gradient(#FB7D7D , #FB6161)", color: '#fff' }} >
                            <Typography variant="h4" p={1} >Critical Patients</Typography>
                            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                                <Typography component={"b"} variant="h4">&nbsp;</Typography>
                                <Typography variant="h4">200</Typography>
                                <Image alt="Critical" style={{ margin: 5 }} width={50} src={CriticalIcon} />
                            </Box>
                        </Paper>
                        <Paper sx={{ flexGrow: 1, borderRadius: 2 }} >
                            <Typography variant="h6" component={"div"} p={1} >In ICU</Typography>
                            <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                <Typography px={2} variant="h4">10</Typography>
                            </Box>
                        </Paper>
                        <Paper sx={{ flexGrow: 1, borderRadius: 2 }}>
                            <Typography variant="h6" component={"div"} p={1} >In Operation</Typography>
                            <Box display={"flex"} justifyContent={"flex-end"} alignItems={"center"}>
                                <Typography px={2} variant="h4">10</Typography>
                            </Box>
                        </Paper>
                    </Stack>
                </Box>
            </Stack>
        </Layout>
    )
}

export default Index
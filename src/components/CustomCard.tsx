import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, CardMedia } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Image, { StaticImageData } from 'next/image';



interface CustomCardProps {
    imageSrc: StaticImageData;
    imageAlt: string;
    heading: string;
    value: string;
    backgroundColor: string;
}

export default function CustomCard({ imageSrc, heading, value, backgroundColor, imageAlt }: Readonly<CustomCardProps>) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }

            />
            <CardMedia sx={{ px: 2 }}>
                <Box sx={{ backgroundImage: backgroundColor, padding: 3, borderRadius: 5 }} >
                    <Image alt={imageAlt} src={imageSrc} />
                </Box>
            </CardMedia>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography variant="body2" color="text.secondary">
                        {heading}
                    </Typography>
                    <Typography variant="h5" >
                        {value}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
}
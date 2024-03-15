// components/Sidebar.tsx
import { CalendarMonth, Logout, MedicalServices, Person3, SupportAgent } from '@mui/icons-material';
import { Avatar, Box, CssBaseline, Drawer, List, ListItem } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import CompanyLogo from '../../public/Logo.png';
import CustomListItem from './CustomListItem';
import HomeIcon from './Icons/Home';
const SideMenuItem = [
    {
        key: 'home',
        title: 'Home',
        icon: <HomeIcon color={'#00B94A'} />
    },
    {
        key: 'hospital',
        title: 'Hospital',
        icon: <MedicalServices sx={{ color: "#B0B0B0", fontSize: 40 }} />
    },
    {
        key: 'patients',
        title: 'Patients',
        icon: <Person3 sx={{ color: "#B0B0B0", fontSize: 40 }} />
    },
    {
        key: 'appointments',
        title: 'Appointments',
        icon: <CalendarMonth sx={{ color: "#B0B0B0", fontSize: 40 }} />
    },
    {
        key: 'support',
        title: 'Support',
        icon: <SupportAgent sx={{ color: "#B0B0B0", fontSize: 40 }} />
    }
]

const Sidebar: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Drawer variant="permanent" anchor="left" >
                <List style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center", height: '90vh' }}>
                    <ListItem key="logo">
                        {/* Add your logo here */}
                        <Image
                            alt='Logo'
                            src={CompanyLogo}
                            width={45}
                        />
                    </ListItem>

                    {SideMenuItem.map((item, index) => (
                        <CustomListItem
                            key={item.key}
                            title={item.title}>
                            {item.icon}
                            {index === 0 && <Box sx={{ backgroundColor: '#035F22', width: 30, height: 3, borderRadius: 10 }} width={30} ></Box>}
                        </CustomListItem>
                    ))}

                    <CustomListItem
                        key='logout'
                        title='Logout'
                    >
                        <Avatar >
                            <Logout />
                        </Avatar>
                    </CustomListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;

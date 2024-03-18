// components/Sidebar.tsx
import { Logout } from '@mui/icons-material';
import { Avatar, Box, CssBaseline, Drawer, List, ListItem } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CompanyLogo from '../../public/Logo.png';
import AppointmentIcon from '../styles/icons/appointment-icon.png';
import HospitalIcon from '../styles/icons/hospital-icon.png';
import PatientActive from '../styles/icons/patient-active.png';
import PatientInactive from '../styles/icons/patient-inactive.png';
import SupportIcon from '../styles/icons/support-icon.png';
import CustomListItem from './CustomListItem';
import HomeIcon from './Icons/Home';
const SideMenuItem = [
    {
        key: 'home',
        title: 'Home',
        activeIcon: <HomeIcon color={'#00B94A'} />,
        defaultIcon: <HomeIcon color={'#A6A6A6'} />,
        routeName: '/',
    },
    {
        key: 'hospital',
        title: 'Hospital',
        defaultIcon: <Image alt='hospital' width={40} src={HospitalIcon} />,
        routeName: '/hospital',
    },
    {
        key: 'patients',
        title: 'Patients',
        defaultIcon: <Image alt='patient' width={40} src={PatientInactive} />,
        activeIcon: <Image alt='activepatient' width={40} src={PatientActive} />,
        routeName: '/patients',
    },
    {
        key: 'appointments',
        title: 'Appointments',
        defaultIcon: <Image alt='appointments' width={40} src={AppointmentIcon} />,
        routeName: '/appointments',
    },
    {
        key: 'support',
        title: 'Support',
        defaultIcon: <Image alt='support' width={40} src={SupportIcon} />,
        routeName: '/support',
    }
]

const Sidebar: React.FC = () => {
    const route = useRouter()
    const [activeRoute, setActiveRoute] = useState('');
    console.log('sd', route)
    useEffect(() => {
        if (route.pathname === '/') {
            setActiveRoute('/')
        } else if (route.pathname.includes('/patients')) {
            setActiveRoute('/patients')
        } else if (route.pathname === '/hospital') {
            setActiveRoute('/hospital')
        } else if (route.pathname === '/appointments') {
            setActiveRoute('appointments')
        } else if (route.pathname === '/support') {
            setActiveRoute('/support')
        }
    }, []);
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
                            onClick={() => route.push(item.routeName)}
                            title={item.title}>
                            {activeRoute !== item.routeName ? item.defaultIcon : item.activeIcon}
                            {activeRoute === item.routeName && <Box sx={{ backgroundColor: '#035F22', width: 30, height: 3, borderRadius: 10 }} width={30} ></Box>}
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

import { Box, ListItem, Tooltip } from '@mui/material';
import React from 'react';

interface ListsProps {
    children: React.ReactNode;
    key: string;
    title: string;
    onClick?: () => void;
}

function CustomListItem({ children, key, title, onClick }: Readonly<ListsProps>) {
    return (
        <ListItem key={key} sx={{
            '&:hover': {
                transform: 'scale(1.2)',
                transition: 'transform .2s'
            },
            cursor: 'pointer',
        }}
            onClick={onClick}
        >
            <Tooltip title={title}>
                <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
                    {children}
                </Box>
            </Tooltip>
        </ListItem>
    )
}

export default CustomListItem
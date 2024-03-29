import React from 'react';
import { Box, Typography } from '@mui/material';
import PageCoverageArea from '../../Pages/CoverageArea/PageCoverageArea';

const MerchantCoverageArea = () => {
    return (
        <Box sx={{ mx: 4, pt: 2, pb: 5 }}>
            <Box
                sx={{
                    px: 2.5,
                    pb: 1,
                    mb: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <Typography variant='h5' sx={{ fontWeight: "bold", color: "#1E793C" }}>
                    Coverage Area
                </Typography>
            </Box>
            <PageCoverageArea />
        </Box>
    );
};

export default MerchantCoverageArea;
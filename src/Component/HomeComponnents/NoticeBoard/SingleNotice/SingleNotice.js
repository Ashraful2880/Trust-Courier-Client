import { Box, Card, CardActionArea, CardMedia, Grid } from "@mui/material";
import Notice from "../../../../Assets/Image/Notice.png";
import React from "react";

const SingleNotice = () => {
  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <CardActionArea >
            <Card sx={{ width: "100%", height: 300, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="300"
                image={Notice}
                alt="#08A74C iguana"
              />
            </Card>
          </CardActionArea>
          <h3
            style={{
              fontWeight: 500,
              marginTop: 10,
              marginBottom: 0,
              color: "#838181",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "left"
            }}>
            April 25, 2022
          </h3>
          <h4
            style={{
              fontWeight: 700,
              marginTop: 7,
              color: "#08A74C",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "left"
            }}>
            NOTICE FOR EID-UL-FITR 2022
          </h4>
        </Grid>
        {/* Notice-02 */}
        <Grid item xs={12} md={4}>
          <CardActionArea>
            <Card sx={{ width: "100%", height: 300, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="300"
                image={Notice}
                alt="#08A74C iguana"
              />
            </Card>
          </CardActionArea>
          <h3
            style={{
              fontWeight: 500,
              marginTop: 10,
              marginBottom: 0,
              color: "#838181",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "left"
            }}>
            April 25, 2022
          </h3>
          <h4
            style={{
              fontWeight: 700,
              marginTop: 7,
              color: "#08A74C",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "left"
            }}>
            NOTICE FOR EID-UL-FITR 2022
          </h4>
        </Grid>
        {/* Notice-03 */}
        <Grid item xs={12} md={4}>
          <CardActionArea>
            <Card sx={{ width: "100%", height: 300, borderRadius: 2 }}>
              <CardMedia
                component="img"
                height="300"
                image={Notice}
                alt="#08A74C iguana"
              />
            </Card>
          </CardActionArea>
          <h3
            style={{
              fontWeight: 500,
              marginTop: 10,
              marginBottom: 0,
              color: "#838181",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "left"
            }}>
            April 25, 2022
          </h3>
          <h4
            style={{
              fontWeight: 700,
              marginTop: 7,
              color: "#08A74C",
              fontFamily: "Montserrat, sans-serif",
              textAlign: "left"
            }}>
            NOTICE FOR EID-UL-FITR 2022
          </h4>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleNotice;

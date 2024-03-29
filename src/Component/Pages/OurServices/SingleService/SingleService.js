import { Box, Button, Grid } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActions } from '@mui/material';
import Ecommerce from "../../../../Assets/Image/Ecommerce.png";
import Logistics from "../../../../Assets/Image/Logistics.png";
import pickdrop from "../../../../Assets/Image/pickdrop.png";
import Warehouse from "../../../../Assets/Image/Warehouse.png";
import freeDelivery from "../../../../Assets/Image/Service/free-delivery.png";
import homeDelivery from "../../../../Assets/Image/Service/home-delivery.png";
import vendor from "../../../../Assets/Image/Service/vendor-service.png"; 
import fastDelivery from "../../../../Assets/Image/Service/fast-delivery.png";
import "./SingleService.css";

const SingleService = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={Ecommerce}
                alt="#08A74C iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span>
                    E-commerce Delivery
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  We support you to run your ecommerce business smoothly and
                  reduce your risk,and will parcel to delivery.....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        {/* 2nd */}
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={Logistics}
                alt="#08A74C iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span className="animatedText">
                    Logistics Delivery
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  We provides ecommerce parcel pickup services from merchants
                  place and will deliver parcel with 100% safety....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        {/* 3rd */}
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={pickdrop}
                alt="#08A74C iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span className="animatedText">
                    Pick & Drop
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  We provides ecommerce parcel pickup services from merchants
                  place and will deliver parcel with 100% safety....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        {/* 4th */}
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={Warehouse}
                alt="Warehouse"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span className="animatedText">
                    Warehouse
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  TrustCourier Service provide Complete solution for storage,
                  sorting and processing. Also we have top class warehouses ....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{marginTop:"10px"}}>
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={freeDelivery}
                alt="#08A74C iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span>
                    Free Delivery
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  We support you to run your ecommerce business smoothly and
                  reduce your risk,and will parcel to delivery.....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        {/* 2nd */}
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={homeDelivery}
                alt="#08A74C iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span className="animatedText">
                    Home Delivery
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  We provides ecommerce parcel pickup services from merchants
                  place and will deliver parcel with 100% safety....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        {/* 3rd */}
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={fastDelivery}
                alt="#08A74C iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span className="animatedText">
                    Fast Delivery
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  We provides ecommerce parcel pickup services from merchants
                  place and will deliver parcel with 100% safety....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
        {/* 4th */}
        <Grid item xs={12} md={3}>
          <Box>
            <Card sx={{ width: "100%", height: 375, position: "relative" }} className="serviceCardContainer">
              <CardMedia
                component="img"
                height="150"
                image={vendor}
                alt="Warehouse"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ textAlign: "left", fontSize: "22px", fontWeight: 600, }}>
                  <span className="animatedText">
                    Vendor Service
                  </span>
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "left", fontSize: "16px" }}>
                  TrustCourier Service provide Complete solution for storage,
                  sorting and processing. Also we have top class warehouses ....
                </Typography>
              </CardContent>
              <CardActions style={{ position: "absolute", bottom: "1%" }}>
                <Button size="small" color="primary">
                  <button className="moreButton">
                    <span>Read More! </span>
                  </button>
                </Button>
              </CardActions>
            </Card>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SingleService;

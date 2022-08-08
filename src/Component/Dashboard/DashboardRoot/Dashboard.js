import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Avatar, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import auth from "../../../FirebaseAuth/firebase.config";
import logo from "../../../Assets/Image/logo.png";
import AdminDashboard from "./AdminDashboard";
import MerchantDashboard from "./MerchantDashboard";

const drawerWidth = 268;

function Dashboard(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const drawer = (
		<Box className='dashboard'>
			<Box
				sx={{
					padding: "2px 0px 0px 0px",
					backgroundColor: "#fff",
					border: "1px solid #1E793C",
				}}>
				<img src={logo} alt='Main Logo' />
			</Box>
			<AdminDashboard />
			{/* Merchant Dashboard Code Here */}
			<Typography
				variant='h6'
				className='title'
				sx={{ color: "gray", marginY: "5px" }}>
				Merchant Dashboard Here
			</Typography>
			<MerchantDashboard />
		</Box>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position='fixed'
				className='bgColor'
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					padding: 0,
					ml: { sm: `${drawerWidth}px` },
				}}>
				<Toolbar>
					<IconButton
						color='inherit'
						aria-label='open drawer'
						edge='start'
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Box display='flex' sx={{ flexGrow: 1, alignItems: "center" }}>
						<DashboardIcon sx={{ mr: 1 }} />
						<Typography variant='h6'>DASHBOARD</Typography>
					</Box>
					<Box>
						<Typography
							variant='p'
							style={{
								color: "white",
								fontWeight: "bold",
								margin: "0px 10px",
							}}>
							John Doe
						</Typography>
					</Box>
					<Box>
						<Avatar
							sx={{ border: "2px solid #44ba06" }}
							alt=''
							src='https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg'
						/>
					</Box>
					<Box className='logout'>
						<Button onClick={() => signOut(auth)}>
							<LogoutIcon />
						</Button>
					</Box>
				</Toolbar>
			</AppBar>
			<Box
				onClick={() => setMobileOpen(false)}
				component='nav'
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
				aria-label='mailbox folders'>
				<Drawer
					container={container}
					variant='temporary'
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true,
					}}
					className='dashboard'
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
						backgroundColor: "transparent",
					}}>
					{drawer}
				</Drawer>
				<Drawer
					variant='permanent'
					className='dashboard'
					sx={{
						display: { xs: "none", sm: "block" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
							width: drawerWidth,
						},
						backgroundColor: "transparent",
					}}
					open>
					{drawer}
				</Drawer>
			</Box>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					width: { sm: `calc(100% - ${drawerWidth}px)` },
				}}>
				<Toolbar />
				<Outlet></Outlet>
			</Box>
		</Box>
	);
}

Dashboard.propTypes = {
	window: PropTypes.func,
};

export default Dashboard;
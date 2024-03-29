import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from '@mui/icons-material/Person';
import logo from "../../../Assets/Image/logo.png";
import { Link, useLocation } from "react-router-dom";
import "./Navigation.css";
import { Button } from "@mui/material";
import call from "../../../Assets/Image/Call.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../FirebaseAuth/firebase.config";
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import InfoIcon from '@mui/icons-material/Info';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";

const Navigation = () => {
	const [anchorElNav, setAnchorElNav] = React.useState(null);
	const location = useLocation();
	const currPath = location.pathname.split("/")[1];
	const [path, setPath] = React.useState(currPath);
	/* const [hide, setHide] = useState("block"); */
	const [user, loading] = useAuthState(auth);

	useEffect(() => {
		setPath(currPath);
	}, [currPath]);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	/* 	useEffect(() => {
		if (location?.pathname.includes("/")) {
			setHide("block");
		}
		if (location?.pathname.includes("/home")) {
			setHide("block");
		}
		if (location?.pathname.includes("/dashboard")) {
			setHide("none");
		}
	}, [location.pathname]); */
	if (location?.pathname.includes("/dashboard")) {
		return false;
	}

	return (
		<AppBar
			position='sticky'
			sx={{ backgroundColor: "#ffffff", boxShadow: "none", borderBottom: "1px solid lightgray", height: "76px" }} /* style={{ display: `${hide}` }} */
		>
			<Container maxWidth='xl'>
				<Toolbar disableGutters style={{ height: "78px" }}>
					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" }, }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'>
							<MenuIcon style={{ color: "green", fontSize: "26px" }} />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}>
							<Link
								to='/'
								style={{ display: "block", height: "50px" }}
								className={path === "home" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<HomeIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Home</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/service'
								style={{ display: "block", height: "50px" }}
								className={path === "service" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<SettingsSuggestIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Services</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/covarage'
								style={{ display: "block", height: "50px" }}
								className={path === "covarage" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<LocationCityIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Coverage Area</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/pricing'
								style={{ display: "block", height: "50px" }}
								className={path === "pricing" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<LocalOfferIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Pricing</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/tracking'
								style={{ display: "block", height: "50px" }}
								className={path === "tracking" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<ContentPasteSearchIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Tracking</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/blog'
								style={{ display: "block", height: "50px" }}
								className={path === "blog" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<TextSnippetIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Our Blogs</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/about'
								style={{ display: "block", height: "50px" }}
								className={path === "about" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<InfoIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>About</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/contact'
								style={{ display: "block", height: "50px" }}
								className={path === "contact" ? "activeMenu" : "inActiveMenu"}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<ForwardToInboxIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Contact Us</Typography>
								</MenuItem>
							</Link>
							<Link
								to='/dashboard'
								style={{ display: "block", height: "50px", }}
								className={
									path === "dashboard" ? "activeMenu" : "inActiveMenu"
								}>
								<MenuItem onClick={handleCloseNavMenu} style={{ width: "100vw" }}>
									<ManageAccountsIcon sx={{ color: "green", mr: 1, fontSize: "24px" }} />
									<Typography textAlign='center'>Dashboard</Typography>
								</MenuItem>
							</Link>
						</Menu>
					</Box>

					{/* Large Screen Menu Bar */}

					<Box sx={{ pt: 1, pb: 1, display: { md: "block", sm: "none", xs: "none" } }}>
						<Link to="/">
							<img src={logo} alt="Logo" style={{ width: "200px" }} />
						</Link>
					</Box>

					<Box
						sx={{
							flexGrow: 1,
							display: { xs: "none", md: "flex", justifyContent: "center" },
						}}>
						<Link
							to='/home'
							onClick={handleCloseNavMenu}
							className={path === "home" ? "activeMenu" : "inActiveMenu"}>
							Home
						</Link>
						<Link
							to='/tracking'
							onClick={handleCloseNavMenu}
							className={path === "tracking" ? "activeMenu" : "inActiveMenu"}>
							Tracking
						</Link>
						<Link
							to='/about'
							onClick={handleCloseNavMenu}
							className={path === "about" ? "activeMenu" : "inActiveMenu"}>
							About
						</Link>
						<Link
							to='/service'
							onClick={handleCloseNavMenu}
							className={path === "service" ? "activeMenu" : "inActiveMenu"}>
							Services
						</Link>
						<Link
							to='/covarage'
							onClick={handleCloseNavMenu}
							className={path === "covarage" ? "activeMenu" : "inActiveMenu"}>
							Coverage Area
						</Link>
						<Link
							to='/pricing'
							onClick={handleCloseNavMenu}
							className={path === "pricing" ? "activeMenu" : "inActiveMenu"}>
							Pricing
						</Link>
						<Link
							to='/contact'
							onClick={handleCloseNavMenu}
							className={path === "contact" ? "activeMenu" : "inActiveMenu"}>
							Contact
						</Link>
						<Link
							to='/dashboard'
							onClick={handleCloseNavMenu}
							className={path === "dashboard" ? "activeMenu" : "inActiveMenu"}>
							Dashboard
						</Link>
					</Box>

					<Box
						sx={{
							flexGrow: 0,
							display: "flex",
							alignItems: "center",
						}}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								mt: { xs: 2, md: 0 },
								mb: { xs: 2, md: 0 },
							}}>
							<img
								src={call}
								width={26}
								height={20}
								style={{ paddingRight: 5 }}
								alt=''
								className='callIcon'
							/>
							<a
								href='tel:09613829867'
								target='_blank'
								rel='noopener noreferrer'
								className='call'>
								01974238487
							</a>
						</Box>
						{user?.email ?
							<Button
								style={{ padding: "3px 13px", fontSize: "16px" }}
								sx={{
									backgroundColor: "#08A74C",
									"&:hover": {
										backgroundColor: "transparent",
										color: "#08A74C",
									},
									color: "white",
									border: "1px solid #08A74C",
									textTransform: "capitalize",
									mr: 2,
								}}
								onClick={() => {
									Swal.fire({
										title: "Do you want to Logout?",
										showCancelButton: true,
										confirmButtonText: "Yes",
									})
										.then((result) => {
											if (result.isConfirmed) {
												signOut(auth);
											}
										})
										.then((response) => {
											Swal.fire("", "Successfully LoggedOut!", "success");
										});
								}}>
								Logout
								<LogoutIcon sx={{ width: "20px", ml: 0.5 }} />
							</Button>
							:
							<>
								<Link to='/register' style={{ textDecoration: "none", }}>
									<Button
										style={{ padding: "3px 13px", fontSize: "16px" }}
										sx={{
											backgroundColor: "#08A74C",
											"&:hover": {
												backgroundColor: "transparent",
												color: "#08A74C",
											},
											color: "white",
											border: "1px solid #08A74C",
											textTransform: "capitalize",
											mr: 1,
										}}>
										Register
										<PersonIcon sx={{ width: "20px", ml: 0.5 }} />
									</Button>
								</Link>
							</>
						}
					</Box>
				</Toolbar>
			</Container>
		</AppBar >
	);
};

export default Navigation;

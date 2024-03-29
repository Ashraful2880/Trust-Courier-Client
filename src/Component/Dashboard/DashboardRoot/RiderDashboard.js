import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import RedeemIcon from "@mui/icons-material/Redeem";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	"&:not(:last-child)": {
		borderBottom: 0,
	},
	"&:before": {
		display: "none",
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
		{...props}
	/>
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === "dark"
			? "rgba(255, 255, 255, .05)"
			: "rgba(0, 0, 0, .03)",
	"& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
		transform: "rotate(90deg)",
	},
	"& .MuiAccordionSummary-content": {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
}));

const RiderDashboard = () => {
	const [expanded, setExpanded] = React.useState("");

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};
	const location = useLocation();
	return (
		<>
			<Link className='link' to='ridersDashboard/profile'>
				<ListItem
					button
					className={location?.pathname === "ridersDashboard/profile" && "activeButton"}>
					<ListItemIcon className='listItemIcon'>
						<AccountCircleIcon />
					</ListItemIcon>
					<ListItemText primary={"Profile"} />
				</ListItem>
			</Link>
			<Accordion
				expanded={expanded === "panel7"}
				onChange={handleChange("panel7")}>
				<AccordionSummary aria-controls='panel7d-content' id='panel7d-header'>
					<ListItemIcon className='listItemIcon'>
						<RedeemIcon />
					</ListItemIcon>
					<Typography>Parcel</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<List>
						<Link className='link' to='ridersDashboard/parcelList'>
							<ListItem
								button
								className={
									location?.pathname === "ridersDashboard/ParcelList" &&
									"activeButton"
								}>
								<PlaylistAddCheckIcon className='listItemIcon'>
									<FormatListNumberedIcon />
								</PlaylistAddCheckIcon>
								<ListItemText primary={"Collect Parcel List"} />
							</ListItem>
						</Link>
						<Link className='link' to='ridersDashboard/parceReclList'>
							<ListItem
								button
								className={
									location?.pathname === "ridersDashboard/parceReclList" &&
									"activeButton"
								}>
								<LocalShippingIcon className='listItemIcon'>
									<FormatListNumberedIcon />
								</LocalShippingIcon>
								<ListItemText primary={"Deliver Parcel List"} />
							</ListItem>
						</Link>
						<Link className='link' to='ridersDashboard/accounts'>
							<ListItem
								button
								className={
									location?.pathname === "ridersDashboard/accounts" &&
									"activeButton"
								}>
								<AccountBalanceWalletIcon className='listItemIcon'>
									<FormatListNumberedIcon />
								</AccountBalanceWalletIcon>
								<ListItemText primary={"Accounts"} />
							</ListItem>
						</Link>
					</List>
				</AccordionDetails>
			</Accordion>
		</>
	);
};

export default RiderDashboard;

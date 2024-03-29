import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import { Button } from "@mui/material";

const Tracking = ({ data, setShow }) => {
	console.log(data);
	const sendStatus = [
		{ id: 1, status: "Pickup Request Pending" },
		{ id: 2, status: "Pickup Request Accepted" },
		{ id: 3, status: "Assigned for Pickup" },
		{ id: 4, status: "Accepted by Pickup Rider" },
		{ id: 5, status: "Parcel Received By Pickup Rider" },
		{ id: 6, status: "Delivered To Branch By Pickup Rider" },
		{ id: 7, status: "Received in Pickup Branch" },
		{ id: 8, status: "Delivered To Warehouse" },
		{ id: 9, status: "Parcel Received On Warehouse" },
		{ id: 10, status: "Delivered To Receiver Branch" },
		{ id: 11, status: "Received in Receiver Branch" },
		{ id: 12, status: "Assigned Rider For Delivery" },
		{ id: 13, status: "Accepted By Delivery Rider" },
		{ id: 14, status: "Parcel Received By Delivery Rider" },
		{ id: 15, status: "Delivered To Customer By Rider" },
	];
	const returnStatus = [
		{ id: 1, status: "Parcel Returned by Customer" },
		{ id: 2, status: "Returning Parcel to Branch" },
		{ id: 3, status: "Returned Parcel Received in Branch" },
		{ id: 4, status: "Sending Returned Parcel to Warehouse" },
		{ id: 5, status: "Returned Parcel Received in Warehouse" },
		{ id: 6, status: "Sending Returned Parcel to Branch" },
		{ id: 7, status: "Returned Parcel Received in Branch" },
		{ id: 8, status: "Sending Returned Parcel to Merchant" },
		{ id: 9, status: "Successfully Returned To Merchant" },
	];
	const idIndex = sendStatus?.map((obj) => obj.status).indexOf(data?.status);

	return (
		<div>
			<Timeline position='alternate'>
				{sendStatus?.map((s, i) => (
					<>
						{data?.status === s?.status ? (
							<TimelineItem sx={{ color: "#08A74C" }}>
								<TimelineOppositeContent
									sx={{ m: "auto 0" }}
									align='right'
									variant='body2'
									color='text.secondary'>
									{s?.statusUpdateTime || ""}
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineConnector />
									<Button
										variant='contained'
										sx={{
											borderRadius: "50%",
											backgroundColor: "#08A74C",
											my: 1,
										}}>
										{s?.id}
									</Button>
									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent sx={{ py: "12px", px: 2 }}>
									<Typography variant='h6'>{s?.status}</Typography>
								</TimelineContent>
							</TimelineItem>
						) : (
							<TimelineItem sx={{ color: i < idIndex ? "#08A74C" : "gray" }}>
								<TimelineOppositeContent
									sx={{ m: "auto 0" }}
									align='right'
									variant='body2'
									color='text.secondary'>
									{i > idIndex && <HourglassBottomIcon />}
									{i < idIndex && <CheckCircleIcon sx={{ color: "#08A74C" }} />}
								</TimelineOppositeContent>
								<TimelineSeparator>
									<TimelineConnector />
									<Button
										variant='contained'
										sx={{
											borderRadius: "50%",
											backgroundColor: i < idIndex ? "#08A74C" : "gray",
											my: 1,
										}}>
										{s?.id}
									</Button>

									<TimelineConnector />
								</TimelineSeparator>
								<TimelineContent sx={{ py: "12px", px: 2 }}>
									<Typography variant='h6'>{s?.status}</Typography>
								</TimelineContent>
							</TimelineItem>
						)}
					</>
				))}
			</Timeline>
			<Button
				onClick={() => setShow(false)}
				variant='contained'
				color='success'
				sx={{ padding: "10px 0px", fontSize: "15px" }}>
				<Typography> Back </Typography>
			</Button>
		</div>
	);
};

export default Tracking;

import React from "react";
import { useState, useEffect } from "react";
import {
	CircularProgress,
	Grid,
	Backdrop,
	Typography,
	Box,
	Button,
} from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import GetAuth from "../../../../FirebaseAuth/GetAuth";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import BranchParcelListFiltered from "./BranchParcelListFiltered";

const BranchParcelList = () => {
	const { user, loading, token } = GetAuth();
	const [data, setData] = useState();
	const [branch, setBranch] = useState();
	const [opens, setOpens] = React.useState(false);
	const [parcelData, setParcelData] = useState();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/branchbyemail/${user?.email}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setBranch(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [token, opens, user?.email]);

	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_API_PATH}/senderBranchOrders/${branch?.branchName}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [token, branch]);

	const renderDetailsButton = (params) => {
		return (
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<AspectRatioIcon
					onClick={() => {
						setOpens(true);
						setParcelData(params.row?.marchentInfo.merchantName);
					}}
					sx={{ ml: 1.5, color: "#08A74C", cursor: "pointer" }}
				/>
			</Box>
		);
	};

	const columns = [
		{
			field: "merchantName",
			headerName: "Marchant Name",
			renderCell: (params) => {
				return params.row.marchentInfo.merchantName;
			},
			flex: 1,
		},
		{
			field: "merchantBusinessAddress",
			headerName: "Marchant Address",
			renderCell: (params) => {
				return `${params.row.marchentInfo.merchantBusinessAddress}(${params.row.marchentInfo.merchantArea})`;
			},
			flex: 1,
		},
		{
			field: "merchantContact",
			headerName: "Phone Number",
			renderCell: (params) => {
				return params.row.marchentInfo.merchantContact;
			},
			flex: 1,
		},
		{
			field: "_id",
			headerName: "Action",
			flex: 1,
			renderCell: renderDetailsButton,
			disableClickEventBubbling: true,
		},
	];

	const [selectedStatus, setSelectedStatus] = useState("All");
	const [filterData, setFilterData] = useState();
	useEffect(() => {
		if (selectedStatus === "Rider Assigned for Pickup") {
			setFilterData(
				data?.filter(
					(item) =>
						item?.status === "Assigned for Pickup" &&
						item?.collectRiderInfo?.id,
				),
			);
		} else if (selectedStatus === "Assigned for Pickup") {
			setFilterData(
				data?.filter(
					(item) =>
						item?.status === selectedStatus && !item?.collectRiderInfo?.id,
				),
			);
		} else {
			setFilterData(data?.filter((item) => item?.status === selectedStatus));
		}
	}, [data, selectedStatus]);

	const filteredByMarchant = (
		selectedStatus === "All" ? data : filterData
	)?.filter(
		(v, i, a) =>
			a.findIndex(
				(t) => t.marchentInfo.merchantName === v.marchentInfo.merchantName,
			) === i,
	);

	return (
		<Box sx={{ mx: 4, pt: 2, pb: 5 }}>
			<Box
				sx={{
					px: 2.5,
					pb: 1,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}>
				<Typography variant='h5' sx={{ fontWeight: "bold", color: "#1E793C" }}>
					All Parcel List
				</Typography>
			</Box>
			<Box sx={{ display: "flex" }}>
				<Button
					className={selectedStatus === "All" ? "active" : ""}
					onClick={() => setSelectedStatus("All")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					All
				</Button>
				<Button
					className={
						selectedStatus === "Pickup Request Pending" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Pickup Request Pending")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Pending
				</Button>
				<Button
					className={
						selectedStatus === "Pickup Request Accepted" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Pickup Request Accepted")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Accepted
				</Button>
				<Button
					className={selectedStatus === "Assigned for Pickup" ? "active" : ""}
					onClick={() => setSelectedStatus("Assigned for Pickup")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Assign
				</Button>
				<Button
					className={
						selectedStatus === "Rider Assigned for Pickup" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Rider Assigned for Pickup")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Assigned
				</Button>
				<Button
					className={
						selectedStatus === "Cancelled by Pickup Rider" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Cancelled by Pickup Rider")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Cancelled by Rider
				</Button>
				<Button
					className={
						selectedStatus === "Delivered To Branch By Pickup Rider"
							? "active"
							: ""
					}
					onClick={() =>
						setSelectedStatus("Delivered To Branch By Pickup Rider")
					}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Receive From Rider
				</Button>
				<Button
					className={
						selectedStatus === "Received in Pickup Branch" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Received in Pickup Branch")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Received From Rider
				</Button>
				<Button
					className={
						selectedStatus === "Sending Returned Parcel to Branch"
							? "active"
							: ""
					}
					onClick={() => setSelectedStatus("Sending Returned Parcel to Branch")}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Pending Returned Parcel
				</Button>
				<Button
					className={
						selectedStatus === "Returned Parcel Received in Branch"
							? "active"
							: ""
					}
					onClick={() =>
						setSelectedStatus("Returned Parcel Received in Branch")
					}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Returned Parcel Received
				</Button>
				<Button
					className={
						selectedStatus === "Sending Returned Parcel to Merchant"
							? "active"
							: ""
					}
					onClick={() =>
						setSelectedStatus("Sending Returned Parcel to Merchant")
					}
					sx={{ my: 0.7, fontWeight: "bold", mx: 1, color: "gray" }}>
					Sent Returned Parcel to Merchant
				</Button>
			</Box>
			<Grid container spacing={1} sx={{ justifyContent: "center", px: 2 }}>
				<Grid item xs={12} md={12}>
					{filterData && (
						<div style={{ height: "80vh", width: "100%" }} className='table'>
							<DataGrid
								rows={filteredByMarchant || []}
								getRowId={(row) => row?._id}
								columns={columns}
								pageSize={10}
								rowsPerPageOptions={[5]}
								checkboxSelection
								components={{ Toolbar: GridToolbar }}
							/>
						</div>
					)}
				</Grid>
			</Grid>
			<BranchParcelListFiltered
				opens={opens}
				setOpens={setOpens}
				marchantName={parcelData}
				allParcels={selectedStatus === "All" ? data : filterData}
				selectedStatus={selectedStatus}
			/>
			<Backdrop
				sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
				open={!data}>
				<CircularProgress color='inherit' />
			</Backdrop>
		</Box>
	);
};

export default BranchParcelList;

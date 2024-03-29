import React from "react";
import { useState, useEffect } from "react";
import { CircularProgress, Grid, Backdrop, Typography, Box, Button, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import GetAuth from "../../../../FirebaseAuth/GetAuth";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import RiderRecParcelListFiltered from "./RiderRecParcelListFiltered";

const RidersRecParcelList = () => {
	const { user, loading, token } = GetAuth();
	const [data, setData] = useState();
	const [opens, setOpens] = React.useState(false);
	const [parcelData, setParcelData] = useState();
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/riderDeliverOrders/${user?.email}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [token, opens]);
	const renderDetailsButton = (params) => {
		return (
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<AspectRatioIcon
					onClick={() => {
						setOpens(true);
						setParcelData(params?.row?.marchentInfo?.merchantName);
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
				return params?.row?.marchentInfo?.merchantName;
			},
			flex: 1,
		},
		{
			field: "merchantBusinessAddress",
			headerName: "Marchant Address",
			renderCell: (params) => {
				return `${params?.row?.marchentInfo?.merchantBusinessAddress}(${params.row.marchentInfo.merchantArea})`;
			},
			flex: 1,
		},
		{
			field: "merchantContact",
			headerName: "Phone Number",
			renderCell: (params) => {
				return params?.row?.marchentInfo?.merchantContact;
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
	const filterData = data?.filter((item) => item?.status === selectedStatus);
	const filteredByMarchant = (
		selectedStatus === "All" ? data : filterData
	)?.filter(
		(v, i, a) =>
			a.findIndex(
				(t) => t?.marchentInfo?.merchantName === v.marchentInfo.merchantName,
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
					Received Parcel List
				</Typography>
			</Box>
			<Box sx={{ display: "flex" }}>
				<Button
					className={selectedStatus === "All" ? "active" : ""}
					onClick={() => setSelectedStatus("All")}
					sx={{ my: 0.7, fontWeight: "bold", px: 1.5, color: "gray" }}>
					All
				</Button>
				<Button
					className={
						selectedStatus === "Assigned Rider For Delivery" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Assigned Rider For Delivery")}
					sx={{ my: 0.7, fontWeight: "bold", px: 1.5, color: "gray" }}>
					Assigned
				</Button>
				<Button
					className={
						selectedStatus === "Accepted By Delivery Rider" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Accepted By Delivery Rider")}
					sx={{ my: 0.7, fontWeight: "bold", px: 1.5, color: "gray" }}>
					Accepted
				</Button>
				<Button
					className={
						selectedStatus === "Parcel Received By Delivery Rider"
							? "active"
							: ""
					}
					onClick={() => setSelectedStatus("Parcel Received By Delivery Rider")}
					sx={{ my: 0.7, fontWeight: "bold", px: 1.5, color: "gray" }}>
					Received
				</Button>
				<Button
					className={
						selectedStatus === "Delivered To Customer By Rider" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Delivered To Customer By Rider")}
					sx={{ my: 0.7, fontWeight: "bold", px: 1.5, color: "gray" }}>
					Delivered
				</Button>
				<Button
					className={
						selectedStatus === "Parcel Returned by Customer" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Parcel Returned by Customer")}
					sx={{ my: 0.7, fontWeight: "bold", px: 1.5, color: "gray" }}>
					Parcel Returned
				</Button>
				<Button
					className={
						selectedStatus === "Returning Parcel to Branch" ? "active" : ""
					}
					onClick={() => setSelectedStatus("Returning Parcel to Branch")}
					sx={{ my: 0.7, fontWeight: "bold", px: 1.5, color: "gray" }}>
					Returning to Branch
				</Button>
			</Box>
			<Grid container spacing={1} sx={{ justifyContent: "center", px: 2 }}>
				<Grid item xs={12} md={12}>
					{filterData && (
						<div style={{ height: "80vh", width: "100%" }} className='table'>
							<DataGrid
								rows={filteredByMarchant}
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
			<RiderRecParcelListFiltered
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

export default RidersRecParcelList;

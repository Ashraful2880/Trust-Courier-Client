import {
	CircularProgress,
	Grid,
	Backdrop,
	Typography,
	Box,
	FormControl,
	Select,
	MenuItem,
	FormHelperText,
	Button,
	Fade,
	Modal,
	TextField,
	Autocomplete,
} from "@mui/material";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import PaymentsIcon from "@mui/icons-material/Payments";
import GetAuth from "../../../../FirebaseAuth/GetAuth";
import CancelIcon from "@mui/icons-material/Cancel";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	boxShadow: 24,
	p: 2,
	width: "90vw",
	maxHeight: "90vh",
	overflowX: "hidden",
	overflowY: "scroll",
	borderRadius: 3,
	textAlign: "center",
	backgroundColor: "white",
};

const RiderRecParcelListFiltered = ({
	opens,
	setOpens,
	marchantName,
	allParcels,
	selectedStatus,
}) => {
	const email = "rider@gmail.com";
	const { user, loading, token } = GetAuth();
	const [submitting, setSubmitting] = useState(false);
	const [data, setData] = useState();
	const [status, setStatus] = useState("");
	const [selectionModel, setSelectionModel] = React.useState();
	const [selected, setSelected] = React.useState([]);
	const printData = () => {
		setSelected(data.filter((e) => selectionModel.find((n) => n === e._id)));
	};
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/riderDeliverOrders/${email}`, {
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
	}, [token, submitting]);
	const changeStatus = (event, id) => {
		Swal.fire({
			title: "Are You Sure?",
			showCancelButton: true,
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				setSubmitting(true);
				axios
					.put(
						`${process.env.REACT_APP_API_PATH}/merchantorderStatus/${id}`,
						{
							status: event.target.value,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					.then((response) => {
						setSubmitting(false);
						Swal.fire("", "Successfully Done!", "success");
					})
					.catch((error) => {
						setSubmitting(false);
						console.log(error);
					});
			}
		});
	};
	const changePaymentStatus = (id, money) => {
		Swal.fire({
			title: "Did you collected the money?",
			showCancelButton: true,
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				setSubmitting(true);
				axios
					.put(
						`${process.env.REACT_APP_API_PATH}/merchantorderPaymentCollection/${id}`,
						{
							collectionStatus: "Collected From Customer",
							riderMoneyStatus: "Received",
							collectedFromCustomerDate: new Date().toLocaleString("en-US", {
								timeZone: "Asia/Dhaka",
							}),
							collectedAmount: money,
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					.then((response) => {
						setSubmitting(false);
						Swal.fire("", "Successfully Done!", "success");
					})
					.catch((error) => {
						setSubmitting(false);
						console.log(error);
					});
			}
		});
	};
	const sendMoneyToBranch = (id, paymentCollectionDetails) => {
		Swal.fire({
			title: "Are you sure?",
			showCancelButton: true,
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				setSubmitting(true);
				axios
					.put(
						`${process.env.REACT_APP_API_PATH}/merchantorderPaymentCollection/${id}`,
						{
							collectedFromCustomerDate:
								paymentCollectionDetails?.collectedFromCustomerDate,
							riderMoneyStatus: paymentCollectionDetails?.riderMoneyStatus,
							collectedAmount: paymentCollectionDetails?.collectedAmount,
							collectionStatus: "Sending Money To Branch",
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					.then((response) => {
						setSubmitting(false);
						Swal.fire("", "Successfully Done!", "success");
					})
					.catch((error) => {
						setSubmitting(false);
						console.log(error);
					});
			}
		});
	};

	const renderDetailsButton = (params) => {
		return (
			<Box sx={{ display: "flex", alignItems: "center" }}>
				{params.row?.status === "Delivered To Customer By Rider" &&
					params.row?.paymentCollectionDetails?.collectionStatus ===
						"Collected From Customer" && (
						<Button
							onClick={() =>
								sendMoneyToBranch(
									params.row?._id,
									params.row?.paymentCollectionDetails,
								)
							}
							sx={{
								my: 1,
								px: 3,
								fontWeight: "bold",
								borderRadius: "25px",
								border: "2px solid ",
							}}>
							<PaymentsIcon sx={{ mr: 0.5 }} />
							Send {params.row?.orderSummaray?.totalAmountWithCharges} ৳ To
							Branch
						</Button>
					)}
				{params.row?.status === "Parcel Received By Delivery Rider" &&
					params.row?.paymentCollectionDetails?.collectionStatus ===
						"Pending" && (
						<Button
							onClick={() =>
								changePaymentStatus(
									params.row?._id,
									params.row?.orderSummaray?.totalAmountWithCharges,
								)
							}
							sx={{
								my: 1,
								px: 3,
								fontWeight: "bold",
								borderRadius: "25px",
								border: "2px solid ",
							}}>
							<PaymentsIcon sx={{ mr: 0.5 }} />
							Collect {params.row?.orderSummaray?.totalAmountWithCharges} ৳
						</Button>
					)}
				<FormControl sx={{ m: 1 }}>
					<Select
						size='small'
						value={status}
						onChange={(event) => {
							changeStatus(event, params.row?._id);
							setStatus(event.target.value);
						}}
						displayEmpty
						inputProps={{ "aria-label": "Without label" }}>
						{params.row?.status === "Assigned Rider For Delivery" && (
							<MenuItem value={"Accepted By Delivery Rider"}>Accept</MenuItem>
						)}
						{params.row?.status === "Assigned Rider For Delivery" && (
							<MenuItem value={"Cancelled By Delivery Rider"}>Cancel</MenuItem>
						)}
						{params.row?.status === "Accepted By Delivery Rider" && (
							<MenuItem value={"Parcel Received By Delivery Rider"}>
								Parcel Received
							</MenuItem>
						)}
						{params.row?.status === "Parcel Received By Delivery Rider" && (
							<MenuItem value={"Delivered To Customer By Rider"}>
								Deliver To Customer
							</MenuItem>
						)}
					</Select>
				</FormControl>
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
			width: 150,
		},
		{
			field: "receiverBranchArea",
			headerName: "Pickup Address",
			renderCell: (params) => {
				return ` ${params.row.receiverInfo.receiverBranchArea}(${params.row.receiverInfo.receiverBranchName})`;
			},
			width: 180,
		},
		{
			field: "receiverAddress",
			headerName: "Full Address",
			renderCell: (params) => {
				return params.row.receiverInfo.receiverAddress;
			},
			width: 170,
		},
		{
			field: "receiverNumber",
			headerName: "Phone Number",
			renderCell: (params) => {
				return params.row.receiverInfo.receiverNumber;
			},
			width: 180,
		},
		{ field: "status", headerName: "Status", width: 250 },
		{
			field: "_id",
			headerName: "Action",
			width: 400,
			renderCell: renderDetailsButton,
			disableClickEventBubbling: true,
		},
	];

	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={opens}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{
				timeout: 500,
			}}>
			<Fade in={opens}>
				<Box sx={style}>
					<CancelIcon
						onClick={() => setOpens(false)}
						className='textColor'
						sx={{
							position: "fixed",
							top: "30px",
							right: "30px",
							cursor: "pointer",
							background: "White",
							borderRadius: "50%",
						}}
					/>
					<Box
						sx={{
							px: 2.5,
							pb: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}>
						<Typography
							variant='h5'
							sx={{ fontWeight: "bold", color: "#1E793C" }}>
							All Parcel List
						</Typography>
					</Box>

					<PrintIcon onClick={() => printData()} />
					<Grid container spacing={1} sx={{ justifyContent: "center", px: 2 }}>
						<Grid item xs={12} md={12}>
							{data && (
								<div style={{ height: 400, width: "100%" }} className='table'>
									<DataGrid
										rows={allParcels?.filter(
											(item) => item.marchentInfo.merchantName === marchantName,
										)}
										selectionModel={selectionModel}
										onSelectionModelChange={setSelectionModel}
										getRowId={(row) => row?._id}
										columns={columns}
										pageSize={5}
										rowsPerPageOptions={[5]}
										checkboxSelection
										components={{ Toolbar: GridToolbar }}
									/>
								</div>
							)}
						</Grid>
					</Grid>
					<Backdrop
						sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 999 }}
						open={submitting || !data}>
						<CircularProgress color='inherit' />
					</Backdrop>
				</Box>
			</Fade>
		</Modal>
	);
};

export default RiderRecParcelListFiltered;
import React from "react";
import { useState, useEffect } from "react";
import {
	CircularProgress,
	Grid,
	Backdrop,
	Typography,
	Box,
	FormControl,
	Select,
	MenuItem,
	Button,
	Fade,
	Modal,
	TextField,
	Autocomplete,
} from "@mui/material";
import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarColumnsButton,
	GridToolbarFilterButton,
} from "@mui/x-data-grid";
import axios from "axios";
import Swal from "sweetalert2";
import PrintIcon from "@mui/icons-material/Print";
import GetAuth from "../../../../FirebaseAuth/GetAuth";
import CancelIcon from "@mui/icons-material/Cancel";
import Badge from "@mui/material/Badge";
import Print from "../../Print/Print";
import BarcodePrint from "./../../BarcodePrint/BarcodePrint";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	boxShadow: 24,
	p: 2,
	width: "75vw",
	maxHeight: "90vh",
	overflowX: "hidden",
	overflowY: "scroll",
	borderRadius: 3,
	textAlign: "center",
	backgroundColor: "white",
};

const BranchParcelListFiltered = ({
	opens,
	setOpens,
	marchantName,
	allParcels,
	selectedStatus,
}) => {
	const { user, loading, token } = GetAuth();
	const [submitting, setSubmitting] = useState(false);
	const [open, setOpen] = React.useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const [data, setData] = useState();
	const [status, setStatus] = useState("");
	const [riders, setRiders] = useState();
	const [branch, setBranch] = useState();
	const [Warehouse, setWarehouse] = useState();
	const [selectionModel, setSelectionModel] = React.useState();
	const [selected, setSelected] = React.useState();
	const [openPrint, setOpenPrint] = React.useState(false);
	const [openBarCode, setOpenBarCode] = React.useState(false);

	const handleOpenPrint = () => {
		setOpenPrint(true);
		setSelected(data?.filter((e) => selectionModel?.find((n) => n === e._id)));
	};
	const handleClosePrint = () => setOpenPrint(false);
	const handleCloseBarCode = () => setOpenBarCode(false);

	const handleOpenBarCode = () => {
		setOpenBarCode(true);
		setSelected(data?.filter((e) => selectionModel?.find((n) => n === e._id)));
	};

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
		axios
			.get(
				`${process.env.REACT_APP_API_PATH}/ridersbybranch/${branch?.branchName}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((response) => {
				setRiders(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`${process.env.REACT_APP_API_PATH}/branchbyemail/${user?.email}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setBranch(response.data);
				setWarehouse(response.data?.warehouseInfo);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [token, submitting, branch?.branchName, user?.email]);

	const changeStatusMulti = (event, id) => {
		Swal.fire({
			title: "Are You Sure?",
			showCancelButton: true,
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				setSubmitting(true);
				// eslint-disable-next-line array-callback-return
				selectionModel.map((item) => {
					if (event.target.value === "Delivered To Warehouse") {
						axios
							.put(
								`${process.env.REACT_APP_API_PATH}/merchantorderWarehouse/${item}`,
								{
									warehouseInfo: Warehouse,
									status: event.target.value,
									time: new Date().toLocaleString("en-US", {
										timeZone: "Asia/Dhaka",
									}),
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
								setOpens(false);
							})
							.catch((error) => {
								setSubmitting(false);
								console.log(error);
							});
					} else {
						axios
							.put(
								`${process.env.REACT_APP_API_PATH}/merchantorderStatus/${item}`,
								{
									status: event.target.value,
									time: new Date().toLocaleString("en-US", {
										timeZone: "Asia/Dhaka",
									}),
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
								setOpens(false);
							})
							.catch((error) => {
								setSubmitting(false);
								console.log(error);
							});
					}
				});
			}
		});
	};

	const changeRiderMulti = (event, newValue) => {
		Swal.fire({
			title: "Are You Sure?",
			showCancelButton: true,
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				setSubmitting(true);
				selectionModel.map((item) =>
					axios
						.put(
							`${process.env.REACT_APP_API_PATH}/merchantorderRiderCollect/${item}`,
							{
								collectRiderInfo: newValue,
								status: "Assigned for Pickup",
								time: new Date().toLocaleString("en-US", {
									timeZone: "Asia/Dhaka",
								}),
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
							setOpens(false);
						})
						.catch((error) => {
							setSubmitting(false);
							console.log(error);
						}),
				);
			}
		});
	};
	const changeRider = (event, newValue, id) => {
		Swal.fire({
			title: "Are You Sure?",
			showCancelButton: true,
			confirmButtonText: "Yes",
		}).then((result) => {
			if (result.isConfirmed) {
				setSubmitting(true);
				axios
					.put(
						`${process.env.REACT_APP_API_PATH}/merchantorderRiderCollect/${id}`,
						{
							collectRiderInfo: newValue,
							status: "Assigned for Pickup",
							time: new Date().toLocaleString("en-US", {
								timeZone: "Asia/Dhaka",
							}),
						},
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						},
					)
					.then((response) => {
						setSubmitting(false);
						Swal.fire("", "Successfully Assigned!", "success");
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
				{((params.row?.status === "Assigned for Pickup" &&
					!params.row?.collectRiderInfo?.riderName) ||
					params.row?.status === "Cancelled by Pickup Rider") &&
					selectedStatus !== "Rider Assigned for Pickup" && (
						<Autocomplete
							onChange={(event, newValue) => {
								changeRider(event, newValue, params.row?._id);
							}}
							size='small'
							sx={{ my: 0.5, width: 200 }}
							options={riders}
							getOptionLabel={(option) => option.riderName}
							renderInput={(params) => (
								<TextField
									{...params}
									label='Select Rider'
									variant='outlined'
								/>
							)}
						/>
					)}
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
			width: 180,
		},
		{
			field: "receiverNumber",
			headerName: "Phone Number",
			renderCell: (params) => {
				return params.row.receiverInfo.receiverNumber;
			},
			width: 180,
		},
		{
			field: "status",
			headerName: "Status",
			renderCell: (params) => {
				return `${params.row.status} (${params.row.collectRiderInfo.riderName})`;
			},
			width: 250,
		},
		{
			field: "_id",
			headerName: "Action",
			width: 300,
			renderCell: renderDetailsButton,
			disableClickEventBubbling: true,
		},
	];
	function CustomToolbar() {
		return (
			<GridToolbarContainer>
				<GridToolbarColumnsButton />
				<GridToolbarFilterButton />
				{selectionModel?.length > 0 && (
					<Badge
						badgeContent={selectionModel?.length}
						color='primary'
						sx={{
							mx: 2,
							fontSize: "20px",
							color: "#166534",
							cursor: "pointer",
							zIndex: "999",
						}}>
						<PrintIcon onClick={handleOpenPrint} />
					</Badge>
				)}
				{/* Print Icon Barcode */}
				{selectionModel?.length > 0 && (
					<Button
						onClick={handleOpenBarCode}
						sx={{
							mx: 2,
							fontSize: "20px",
							color: "#166534",
							cursor: "pointer",
							zIndex: "999",
						}}>
						<Typography> Barcode </Typography>
						<Badge badgeContent={selectionModel?.length} color='primary'>
							<PrintIcon color='success' />
						</Badge>
					</Button>
				)}
			</GridToolbarContainer>
		);
	}
	console.log(
		allParcels?.filter(
			(item) => item.marchentInfo.merchantName === marchantName,
		),
	);
	return (
		<Modal
			aria-labelledby='transition-modal-title'
			aria-describedby='transition-modal-description'
			open={opens}
			closeAfterTransition
			BackdropComponent={Backdrop}
			BackdropProps={{ timeout: 500 }}>
			<Fade in={opens}>
				<Box sx={style}>
					<CancelIcon
						onClick={() => setOpens(false)}
						className='textColor'
						sx={{
							position: "fixed",
							top: "28px",
							right: "30px",
							zIndex: 999,
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

					<Box sx={{ display: "flex", my: 1 }}>
						{selectionModel?.length > 0 ? (
							<>
								{(selectedStatus === "Assigned for Pickup" ||
									selectedStatus === "Cancelled by Pickup Rider") && (
									<Autocomplete
										onChange={(event, newValue) => {
											changeRiderMulti(event, newValue);
										}}
										size='small'
										sx={{ my: 0.5, width: 200 }}
										options={riders}
										getOptionLabel={(option) => option.riderName}
										renderInput={(params) => (
											<TextField
												{...params}
												label='Select Rider'
												variant='outlined'
											/>
										)}
									/>
								)}
								{selectedStatus !== "All" && (
									<Box>
										{selectedStatus === "Assigned for Pickup" ||
										selectedStatus === "Cancelled by Pickup Rider" ? (
											""
										) : (
											<Button
												variant='contained'
												color='success'
												onClick={handleOpen}
												sx={{ fontWeight: "bold", p: 1 }}>
												Change Status : {selectionModel?.length}
											</Button>
										)}

										<FormControl>
											<Select
												sx={{ visibility: "hidden", mr: 15 }}
												size='small'
												open={open}
												onClose={handleClose}
												onOpen={handleOpen}
												value={status}
												onChange={(event) => {
													changeStatusMulti(event);
													setStatus(event.target.value);
												}}
												displayEmpty
												inputProps={{ "aria-label": "Without label" }}>
												{selectedStatus === "Pickup Request Pending" && (
													<MenuItem value={"Pickup Request Accepted"}>
														Accept
													</MenuItem>
												)}
												{selectedStatus === "Pickup Request Accepted" && (
													<MenuItem value={"Assigned for Pickup"}>
														Assign for Pickup
													</MenuItem>
												)}
												{selectedStatus ===
													"Delivered To Branch By Pickup Rider" && (
													<MenuItem value={"Received in Pickup Branch"}>
														Received in Pickup Branch
													</MenuItem>
												)}
												{selectedStatus === "Received in Pickup Branch" && (
													<MenuItem value={"Delivered To Warehouse"}>
														Deliver To Warehouse
													</MenuItem>
												)}
												{selectedStatus ===
													"Sending Returned Parcel to Branch" && (
													<MenuItem
														value={"Returned Parcel Received in Branch"}>
														Returned Parcel Received
													</MenuItem>
												)}
												{selectedStatus ===
													"Returned Parcel Received in Branch" && (
													<MenuItem
														value={"Sending Returned Parcel to Merchant"}>
														Sent Returned Parcel to Merchant
													</MenuItem>
												)}
											</Select>
										</FormControl>
									</Box>
								)}
							</>
						) : (
							<>
								{selectedStatus !== "All" && (
									<Button
										disabled
										variant='contained'
										color='success'
										onClick={handleOpen}
										sx={{ fontWeight: "bold", p: 1 }}>
										Change Status
									</Button>
								)}
							</>
						)}
					</Box>

					<Grid
						container
						spacing={1}
						sx={{ justifyContent: "center", px: 2, position: "relative" }}>
						<Grid item xs={12} md={12}>
							{data && (
								<div
									style={{ height: "80vh", width: "100%" }}
									className='table'>
									<DataGrid
										rows={allParcels?.filter(
											(item) => item.marchentInfo.merchantName === marchantName,
										)}
										selectionModel={selectionModel}
										onSelectionModelChange={setSelectionModel}
										getRowId={(row) => row?._id}
										columns={columns}
										pageSize={10}
										rowsPerPageOptions={[5]}
										checkboxSelection
										components={{ Toolbar: CustomToolbar }}
									/>
								</div>
							)}
						</Grid>
					</Grid>
					{/* Print Component Here */}
					<Print
						data={selected}
						handleClosePrint={handleClosePrint}
						openPrint={openPrint}
					/>
					{/*Barcode Print Component Here */}
					<BarcodePrint
						data={selected}
						handleCloseBarCode={handleCloseBarCode}
						openBarCode={openBarCode}
					/>
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

export default BranchParcelListFiltered;

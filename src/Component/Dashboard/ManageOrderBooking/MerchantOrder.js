import React, { useEffect, useState } from "react";
import {
	Autocomplete,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	TextField,
	Typography,
} from "@mui/material";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useForm } from "react-hook-form";
import axios from "axios";
import GetAuth from "../../../FirebaseAuth/GetAuth";

const MerchantOrder = () => {
	const { user, loading, token } = GetAuth();
	const { register, handleSubmit, reset } = useForm();
	const [selectedDistricts, setSelectedDistricts] = useState("");
	const [selectedBranch, setSelectedBranch] = useState("");
	const [branch, setBranch] = useState();
	const [productCategory, setProductCategory] = useState();
	const [weight, setWeight] = useState();
	const [selectWeight, setSelectWeight] = useState();
	const [serviceAreas, setServiceAreas] = useState();
	const [selectServiceAreas, setSelectServiceAreas] = useState();
	const [cashCollection, setCashCollection] = useState();
	const [addDeliveryCharge, setAddDeliveryCharge] = useState(true);
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/branches`, {
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
		axios
			.get(`${process.env.REACT_APP_API_PATH}/itemCategories`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setProductCategory(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`${process.env.REACT_APP_API_PATH}/weightPackages`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setWeight(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`${process.env.REACT_APP_API_PATH}/serviceAreas`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setServiceAreas(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [token]);

	const cashCollected = parseFloat(cashCollection) || 0;
	const codPercentage =
		parseFloat(selectServiceAreas?.serviceAreaCODPercentage) || 0;
	const deliveryCharge = addDeliveryCharge
		? parseFloat(selectServiceAreas?.serviceAreaCharge)
		: 0;
	const weightCharge = parseFloat(selectWeight?.weightPackageRate) || 0;
	const totalAmount = deliveryCharge + weightCharge || 0;
	const codAmount = totalAmount * (codPercentage / 100) || 0;
	const totalPayment = totalAmount + codAmount || 0;
	const payment = totalPayment - cashCollected || 0;
	const onSubmit = ({
		branchDistrict,
		cashCollection,
		instructions,
		merchantArea,
		merchantBranchName,
		productCategory,
		productType,
		productWeight,
		receiverAddress,
		receiverName,
		receiverNumber,
		referenceId,
	}) => {
		const data = {
			fromMarchantData: "",
			branchDistrict,
			cashCollection,
			instructions,
			merchantArea,
			merchantBranchName,
			productCategory,
			productType,
			productWeight,
			receiverAddress,
			receiverName,
			receiverNumber,
			referenceId,
		};
		console.log(data);
	};

	return (
		<Box
			sx={{
				mt: 2.5,
				mx: 2.5,
				border: "1px solid gray",
				borderRadius: 2,
				boxShadow: "0px 0px 10px gray",
				pt: 2,
				pb: 5,
			}}>
			<Typography
				variant='h6'
				sx={{
					mb: 3,
					textAlign: "left",
					background: "#1E793C",
					padding: "8px 20px",
					color: "#fff",
					borderRadius: "5px",
					display: "flex",
					alignItems: "center",
					mx: 2,
				}}>
				<CreateNewFolderIcon sx={{ mr: 2 }} /> Create a New Parcel Order
				(Merchant)
			</Typography>
			<Box sx={{ mx: 3 }}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Box sx={{ display: { lg: "flex", md: "block", sm: "block" }, justifyContent: "space-between", gap: 4 }}>
						<Box sx={{ flexGrow: 2 }}>
							{/* Receiver Info Here */}
							<Typography
								component='p'
								sx={{
									fontWeight: "bold",
									textAlign: "left",
									my: 1,
									mx: 2,
									color: "#009688",
									fontSize: "18px",
								}}>
								Receiver Information
							</Typography>
							<Box sx={{ display: "flex", gap: "15px", mx: 2 }}>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									label='Receiver Name'
									helperText='Receiver Name'
									{...register("receiverName", { required: true })}
								/>
								<TextField
									size='small'
									type='number'
									sx={{ my: 0.5 }}
									fullWidth
									required
									label='Mobile Number'
									helperText='Reciever Mobile Number'
									{...register("receiverNumber", { required: true })}
								/>
							</Box>
							<Box sx={{ display: "flex", gap: "15px", mx: 2 }}>
								<Autocomplete
									onChange={(event, newValue) => {
										setSelectedDistricts(newValue);
									}}
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									options={branch}
									getOptionLabel={(option) => option?.branchDistrict}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField
											{...register("branchDistrict", { required: true })}
											{...params}
											label='Districts Name'
											variant='outlined'
										/>
									)}
								/>
								<Autocomplete
									onChange={(event, newValue) => {
										setSelectedBranch(newValue);
									}}
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									options={branch?.filter(
										(item) =>
											item?.branchDistrict === selectedDistricts?.branchDistrict,
									)}
									getOptionLabel={(option) => option.branchName}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField
											{...register("merchantBranchName", { required: true })}
											{...params}
											label='Select Branch'
											variant='outlined'
											helperText='Branch'
										/>
									)}
								/>
								<Autocomplete
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									options={selectedBranch?.branchArea || []}
									getOptionLabel={(option) => option.area}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField
											{...register("merchantArea", { required: true })}
											{...params}
											label='Select Area'
											variant='outlined'
											helperText='Area'
										/>
									)}
								/>
							</Box>
							<Box sx={{ display: "flex", gap: "15px", mx: 2 }}>

								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									multiline
									rows={2}
									label='Address'
									helperText='Address'
									{...register("receiverAddress", { required: true })}
								/>
							</Box>
							{/* Order Info Here */}
							<Typography
								component='p'
								sx={{
									fontWeight: "bold",
									textAlign: "left",
									my: 1,
									mx: 2,
									color: "#009688",
									fontSize: "18px",
								}}>
								Order Information
							</Typography>
							<Box sx={{ display: "flex", gap: "15px", mx: 2 }}>
								<Autocomplete
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									options={productCategory}
									getOptionLabel={(option) => option.itemCategoryName}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField
											{...register("productCategory", { required: true })}
											{...params}
											label='Product Category'
											variant='outlined'
											helperText='Select Product category'
										/>
									)}
								/>
								<Autocomplete
									onChange={(event, newValue) => {
										setSelectWeight(newValue);
									}}
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									options={weight}
									getOptionLabel={(option) => option.weightPackageName}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField
											{...register("productWeight", { required: true })}
											{...params}
											label='Product Weight'
											variant='outlined'
											helperText='Select Product Weight'
										/>
									)}
								/>

								<Autocomplete
									onChange={(event, newValue) => {
										setSelectServiceAreas(newValue);
									}}
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									options={serviceAreas || []}
									getOptionLabel={(option) => option.serviceAreaName}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField
											{...register("productType", { required: true })}
											{...params}
											label='Service Area'
											variant='outlined'
											helperText='Select Service Area'
										/>
									)}
								/>
							</Box>
							<Box sx={{ display: "flex", gap: "15px", mx: 2 }}>
								<TextField
									type='number'
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									label='Cash Collection'
									helperText='Cash Collection'
									{...register("cashCollection", { required: true })}
									value={cashCollection}
									onChange={(e) => setCashCollection(e.target.value)}
								/>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									label='Reference Id'
									helperText='Reference Id'
									{...register("referenceId", { required: true })}
								/>
								<FormGroup sx={{ my: 0.5, minWidth: "230px" }}>
									<FormControlLabel
										control={
											<Checkbox
												checked={addDeliveryCharge}
												onChange={(e) => setAddDeliveryCharge(e.target.checked)}
											/>
										}
										label='With Delivery Charge'
									/>
								</FormGroup>
							</Box>
							<TextField
								size='small'
								sx={{ my: 0.5, width: "97%" }}
								label='Instructions'
								multiline
								rows={3}
								helperText='Any Instructions'
								{...register("instructions", { required: true })}
							/>
						</Box>
						<Box sx={{ flexGrow: 0.5 }}>
							<Typography
								component='p'
								sx={{
									fontWeight: "bold",
									textAlign: "left",
									my: 1,
									mx: 2,
									color: "#009688",
									fontSize: "18px",
								}}>
								Order Summary
							</Typography>
							<TableContainer component={Paper}>
								<Table aria-label='simple table'>
									<TableBody>
										<TableRow>
											<TableCell component='th' scope='row'>
												<Typography
													component='p'
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													Cash Collection
												</Typography>
											</TableCell>
											<TableCell align='right'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													{cashCollected} Taka
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component='th' scope='row'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													Weight Charge
												</Typography>
											</TableCell>
											<TableCell align='right'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													{weightCharge} Taka
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component='th' scope='row'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													Delivery Charge
												</Typography>
											</TableCell>
											<TableCell align='right'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													{deliveryCharge || 0} Taka
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component='th' scope='row'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													Cash On Delivery Charge
												</Typography>
											</TableCell>
											<TableCell align='right'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													{codAmount} Taka
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow>
											<TableCell component='th' scope='row'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													Total
												</Typography>
											</TableCell>
											<TableCell align='right'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													{totalPayment} Taka
												</Typography>
											</TableCell>
										</TableRow>
										<TableRow style={{ background: "#e9e9e9" }}>
											<TableCell component='th' scope='row'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													Payable Amount
												</Typography>
											</TableCell>
											<TableCell align='right'>
												<Typography
													sx={{
														fontWeight: "600",
														color: "gray",
														fontSize: "15px",
													}}>
													{payment} Taka
												</Typography>
											</TableCell>
										</TableRow>
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Box>
					<Box sx={{ display: "flex", gap: "15px", mx: 1, mt: 2 }}>
						<Button
							type='submit'
							variant='contained'
							color='success'
							sx={{ my: 0.7, fontWeight: "bold", px: 1.5, mx: 1 }}>
							<DoneIcon sx={{ mr: 0.5 }} />
							Place
						</Button>
						<Button
							type='reset'
							variant='contained'
							color='error'
							sx={{ my: 0.7, fontWeight: "bold", px: 1.5, mx: 1 }}>
							<RestartAltIcon sx={{ mr: 0.5 }} />
							Reset
						</Button>
					</Box>
				</form >
			</Box >
		</Box >
	);
};

export default MerchantOrder;
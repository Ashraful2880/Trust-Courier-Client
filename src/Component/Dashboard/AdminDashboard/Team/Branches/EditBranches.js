import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
	Button,
	TextField,
	Backdrop,
	Typography,
	CircularProgress,
	Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import Swal from "sweetalert2";
const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	boxShadow: 24,
	p: 2,
	width: { md: "50vw", sm: "70vw", xs: "90vw" },
	maxHeight: "90vh",
	overflowX: "hidden",
	overflowY: "scroll",
	borderRadius: 3,
	textAlign: "center",
	backgroundColor: "white",
};

const EditBranches = ({ open, setOpen, id, token, setSubmitting }) => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			branchName: "",
			branchAddress: "",
			branchDistrict: "",
			branchArea: "",
			branchContact: "",
			branchEmail: "",
			branchPassword: "",
			pickupCom: "",
			deliveryCom: "",
			bookingCom: "",
			officeDeliveryCom: "",
		},
	});
	const [value, setValue] = React.useState();
	const [areas, setAreas] = useState();
	const [selectedDistricts, setSelectedDistricts] = useState();
	const [warehouses, setWarehouses] = useState();
	const [warehouse, setWarehouse] = useState();
	const [districts, setDistricts] = useState();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/areas`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setAreas(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [token]);
	const [data, setData] = React.useState();
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/branch/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				reset(response.data);
				setData(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`${process.env.REACT_APP_API_PATH}/districts`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setDistricts(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`${process.env.REACT_APP_API_PATH}/warehouseUsers`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setWarehouses(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [id, reset, token]);

	const onSubmit = ({
		branchName,
		branchAddress,
		branchDistrict,
		branchContact,
		branchEmail,
		branchPassword,
		pickupCom,
		deliveryCom,
		bookingCom,
		officeDeliveryCom,
	}) => {
		setSubmitting(true);
		axios
			.put(
				`${process.env.REACT_APP_API_PATH}/branch/${id}`,
				{
					branchName,
					branchAddress,
					branchDistrict,
					branchContact,
					branchEmail: branchEmail.toLowerCase(),
					branchPassword,
					pickupCom,
					deliveryCom,
					bookingCom,
					officeDeliveryCom,
					branchArea: value || data?.branchArea,
					warehouseInfo: warehouse || data?.warehouseInfo,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((response) => {
				setSubmitting(false);
				setOpen(false);
				Swal.fire("", "Successfully Updated!", "success");
			})
			.catch((error) => {
				setSubmitting(false);
				console.log(error);
			});
	};

	return (
		<div>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby='transition-modal-description'
				open={open}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<Box sx={style}>
						<CancelIcon
							onClick={() => setOpen(false)}
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
						{data && warehouses && districts && areas ? (
							<>
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
									}}>
									<BorderColorIcon sx={{ mr: 2 }} /> Edit Branch
								</Typography>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											required
											helperText='Branch Name'
											{...register("branchName", { required: true })}
										/>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											multiline
											rows={2}
											helperText='Branch Address'
											{...register("branchAddress", { required: true })}
										/>
									</Box>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<Autocomplete
											onChange={(event, newValue) => {
												setSelectedDistricts(newValue);
											}}
											size='small'
											sx={{ my: 1, width: "100% !important" }}
											options={districts?.filter(
												(item, i, ar) => ar?.indexOf(item) === i,
											)}
											getOptionLabel={(option) => option?.district}
											defaultValue={
												areas?.filter(
													(item) => item?.district === data?.branchDistrict,
												)[0]
											}
											style={{ width: 300 }}
											renderInput={(params) => (
												<TextField
													required
													{...register("branchDistrict", { required: true })}
													{...params}
													helperText='Districts Name'
													variant='outlined'
												/>
											)}
										/>

										<Autocomplete
											sx={{ my: 1.5, width: "100% !important" }}
											size='small'
											onChange={(event, newValue) => {
												setValue(newValue);
											}}
											multiple
											id='tags-outlined'
											options={areas?.filter(
												(item) =>
													item?.district === selectedDistricts?.district,
											)}
											getOptionLabel={(option) => option?.area}
											defaultValue={data?.branchArea}
											filterSelectedOptions
											renderInput={(params) => (
												<TextField
													{...params}
													helperText='Areas'
													placeholder='Select Areas'
												/>
											)}
										/>
									</Box>
									<Autocomplete
										onChange={(event, newValue) => {
											setWarehouse(newValue);
										}}
										size='small'
										sx={{ my: 1, width: "100% !important" }}
										options={warehouses}
										getOptionLabel={(option) => option?.warehouseUserName}
										style={{ width: 300 }}
										defaultValue={data?.warehouseInfo}
										renderInput={(params) => (
											<TextField
												required
												{...params}
												helperText='Warehouse'
												variant='outlined'
											/>
										)}
									/>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											helperText='Pickup Commission (in %)'
											{...register("pickupCom", { required: true })}
										/>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											helperText='Delivery Commission (in %)'
											{...register("deliveryCom", { required: true })}
										/>
									</Box>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											helperText='Booking Commission (in %)'
											{...register("bookingCom", { required: true })}
										/>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											helperText='Office Delivery Commission (in %)'
											{...register("officeDeliveryCom", { required: true })}
										/>
									</Box>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											helperText='Branch Contact'
											{...register("branchContact", { required: true })}
										/>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											helperText='Branch Email'
											{...register("branchEmail", { required: true })}
										/>
									</Box>
									<Box sx={{ my: 1 }}>
										<Button
											type='submit'
											variant='contained'
											color='success'
											// className='button'
											sx={{ my: 0.5, fontWeight: "bold", px: 1.5, mx: 1 }}>
											<DoneIcon sx={{ mr: 0.5 }} />
											Update
										</Button>
										<Button
											onClick={() => setOpen(false)}
											type='reset'
											variant='contained'
											color='error'
											sx={{ my: 0.5, fontWeight: "bold", px: 1.5, mx: 1 }}>
											<ReplayIcon sx={{ mr: 0.5 }} />
											Close
										</Button>
									</Box>
								</form>
							</>
						) : (
							<CircularProgress className='textColor' />
						)}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default EditBranches;

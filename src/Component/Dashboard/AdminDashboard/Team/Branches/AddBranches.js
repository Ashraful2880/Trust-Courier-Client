import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
	Button,
	TextField,
	Backdrop,
	Typography,
	Autocomplete,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useForm } from "react-hook-form";
import DoneIcon from "@mui/icons-material/Done";
import ReplayIcon from "@mui/icons-material/Replay";
import Swal from "sweetalert2";
import auth2 from "../../../../../FirebaseAuth/firebase.config2";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
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

const AddBranches = ({ open, setOpen, token, setSubmitting }) => {
	const { register, handleSubmit, reset } = useForm();
	const [areas, setAreas] = useState();
	const [selectedDistricts, setSelectedDistricts] = useState();
	const [districts, setDistricts] = useState();
	const [warehouses, setWarehouses] = useState();
	const [warehouse, setWarehouse] = useState();
	const [num, setNum] = React.useState();
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
	}, [token]);
	const [value, setValue] = React.useState();
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth2);
	if (loading) {
		setSubmitting(true);
	}
	if (error) {
		setSubmitting(false);
		Swal.fire({
			title: "Error",
			text: error.message,
			icon: "error",
			confirmButtonText: "Ok",
		});
	}
	const [data, setData] = useState();
	useEffect(() => {
		if (user) {
			axios
				.post(
					`${process.env.REACT_APP_API_PATH}/branch`,
					{
						...data,
						status: "Active",
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
					Swal.fire("", "Successfully Added!", "success");
					signOut(auth2);
				})
				.catch((error) => {
					setSubmitting(false);
					console.log(error);
				});
		}
	}, [data, setOpen, setSubmitting, token, user]);

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
		setData({
			id: "branch-" + Math.floor(Math.random() * 1000000000),
			branchName,
			branchAddress,
			branchDistrict,
			branchArea: value,
			branchContact,
			branchEmail,
			branchPassword,
			pickupCom,
			deliveryCom,
			bookingCom,
			officeDeliveryCom,
			warehouseInfo: warehouse,
		});
		setSubmitting(true);
		createUserWithEmailAndPassword(branchEmail, branchPassword);
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
								top: "28px",
								right: "30px",
								cursor: "pointer",
								background: "White",
								borderRadius: "50%",
							}}
						/>

						<Typography
							variant='h6'
							sx={{
								mb: 2,
								textAlign: "left",
								background: "#1E793C",
								padding: "8px 20px",
								color: "#fff",
								borderRadius: "5px",
								display: "flex",
								alignItems: "center",
							}}>
							<AddTaskIcon sx={{ mr: 2 }} /> Add New Branch
						</Typography>
						{areas && (
							<form onSubmit={handleSubmit(onSubmit)}>
								<Box sx={{ display: "flex", gap: "20px" }}>
									<TextField
										size='small'
										sx={{ my: 0.5 }}
										fullWidth
										required
										helperText='Branch Name'
										label='Branch Name'
										{...register("branchName", { required: true })}
									/>
									<TextField
										size='small'
										sx={{ my: 0.5 }}
										fullWidth
										multiline
										rows={1}
										label='Branch Address'
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
										style={{ width: 300 }}
										renderInput={(params) => (
											<TextField
												required
												{...register("branchDistrict", { required: true })}
												{...params}
												label='Districts Name'
												helperText='Districts Name'
												variant='outlined'
											/>
										)}
									/>
									<Autocomplete
										sx={{ my: 1, width: "100% !important" }}
										size='small'
										onChange={(event, newValue) => {
											setValue(newValue);
										}}
										multiple
										id='tags-outlined'
										options={areas?.filter(
											(item) => item?.district === selectedDistricts?.district,
										)}
										getOptionLabel={(option) => option?.area}
										filterSelectedOptions
										renderInput={(params) => (
											<TextField
												{...params}
												label='Areas'
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
									renderInput={(params) => (
										<TextField
											required
											{...params}
											label='Warehouse'
											helperText='Warehouse'
											variant='outlined'
										/>
									)}
								/>
								<Box sx={{ display: "flex", gap: "20px" }}>
									<TextField
										type="number"
										size='small'
										sx={{ my: 0.5 }}
										fullWidth
										label='Pickup Commission (in %)'
										helperText='Pickup Commission (in %)'
										{...register("pickupCom", { required: true })}
									/>
									<TextField
										type="number"
										size='small'
										sx={{ my: 0.5 }}
										fullWidth
										label='Delivery Commission (in %)'
										helperText='Delivery Commission (in %)'
										{...register("deliveryCom", { required: true })}
									/>
								</Box>
								<Box sx={{ display: "flex", gap: "20px" }}>
									<TextField
										type="number"
										size='small'
										sx={{ my: 0.5 }}
										fullWidth
										label='Booking Commission (in %)'
										helperText='Booking Commission (in %)'
										{...register("bookingCom", { required: true })}
									/>
									<TextField
										type="number"
										size='small'
										sx={{ my: 0.5 }}
										fullWidth
										label='Office Delivery Commission (in %)'
										helperText='Office Delivery Commission (in %)'
										{...register("officeDeliveryCom", { required: true })}
									/>
								</Box>
								<Box sx={{ display: "flex", gap: "20px" }}>
									<Box style={{ width: "100%" }}>
										<input
											type='text'
											placeholder="Branch Contact"
											name="branchContact"
											style={{ width: "100%", padding: "10px 12px", margin: "4px 0px", fontSize: "16px", borderRadius: "5px", border: "1px solid gray" }}
											value={num}
											onChange={(e) =>
												setNum(e.target.value.replace(/[^0-9]/g, ""))
											}
											maxLength="11"
											minLength="11"
											{...register("branchContact", { required: true })}
										/>
										<label style={{ textAlign: "left", fontSize: "12px", color: "gray", width: "100%", display: "block", }}>Sender number</label>
									</Box>
									<TextField
										size='small'
										sx={{ my: 0.5 }}
										fullWidth
										label='Branch Email'
										helperText='Branch Email'
										{...register("branchEmail", { required: true })}
									/>
								</Box>
								<Box sx={{ display: "flex", gap: "20px" }}>
									<TextField
										size='small'
										sx={{ my: 0.5, width: "49%" }}
										fullWidth
										label='Branch Password'
										helperText='Branch Password'
										{...register("branchPassword", { required: true })}
									/>
								</Box>
								<Box sx={{ mb: 2 }}>
									<Button
										type='submit'
										variant='contained'
										color='success'
										sx={{ my: 0.7, fontWeight: "bold", px: 1.5, mx: 1 }}>
										<DoneIcon sx={{ mr: 0.5 }} />
										Add Branch
									</Button>
									<Button
										onClick={() => setOpen(false)}
										type='reset'
										variant='contained'
										color='error'
										sx={{ my: 0.7, fontWeight: "bold", px: 1.5, mx: 1 }}>
										<ReplayIcon sx={{ mr: 0.5 }} />
										Close
									</Button>
								</Box>
							</form>
						)}
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default AddBranches;

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
import { useForm } from "react-hook-form";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import AddTaskIcon from "@mui/icons-material/AddTask";
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

const AddMerchants = ({ open, setOpen, token, setSubmitting }) => {
	const { register, handleSubmit, reset, watch } = useForm();
	const [errors, setErrors] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState([]);
	const [branches, setBranches] = useState([]);
	const [districts, setDistricts] = useState();
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/branches`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setBranches(response.data);
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
					`${process.env.REACT_APP_API_PATH}/merchant`,
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
		merchantName,
		merchantCompanyName,
		merchantAddress,
		merchantBusinessAddress,
		merchantDistrict,
		merchantBranchName,
		merchantContact,
		merchantArea,
		merchantEmail,
		merchantPassword,
	}) => {
		setData({
			id: "merchant-" + Math.floor(Math.random() * 1000000000),
			merchantName,
			merchantCompanyName,
			merchantAddress,
			merchantBusinessAddress,
			merchantBranchName,
			merchantDistrict,
			merchantContact,
			merchantArea,
			merchantEmail,
			merchantPassword,
		});
		setSubmitting(true);
		createUserWithEmailAndPassword(merchantEmail, merchantPassword);
	};
	console.log(selectedBranch);
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
							<AddTaskIcon sx={{ mr: 2 }} /> Add New Merchant
						</Typography>
						<form onSubmit={handleSubmit(onSubmit)}>
							<Box sx={{ display: "flex", gap: "20px" }}>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									label='Merchant Name'
									helperText='Name'
									{...register("merchantName", { required: true })}
								/>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									label='Company Name'
									helperText='Company Name'
									{...register("merchantCompanyName", { required: true })}
								/>
							</Box>
							<Box sx={{ display: "flex", gap: "20px" }}>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									multiline
									rows={2}
									label='Merchant Address'
									helperText='Full Address'
									{...register("merchantAddress", { required: true })}
								/>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									multiline
									rows={2}
									label='Business Address'
									helperText='Business Address'
									{...register("merchantBusinessAddress", { required: true })}
								/>
							</Box>
							<Autocomplete
								size='small'
								sx={{ my: 0.5, width: "100% !important" }}
								options={districts}
								getOptionLabel={(option) => option.district}
								style={{ width: 300 }}
								renderInput={(params) => (
									<TextField
										required
										{...register("merchantDistrict", {
											required: true,
										})}
										{...params}
										label='Select District'
										variant='outlined'
										helperText='Branch'
									/>
								)}
							/>
							<Box sx={{ display: "flex", gap: "20px" }}>
								<Autocomplete
									onChange={(event, newValue) => {
										setSelectedBranch(newValue);
									}}
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									options={branches}
									getOptionLabel={(option) => option.branchName}
									style={{ width: 300 }}
									renderInput={(params) => (
										<TextField
											required
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
											required
											{...register("merchantArea", { required: true })}
											{...params}
											label='Select Area'
											variant='outlined'
											helperText='Area'
										/>
									)}
								/>
							</Box>
							<Box sx={{ display: "flex", gap: "20px" }}>
								<TextField
									type='number'
									helperText='Contact Number'
									id='filled-start-adornment'
									placeholder='Merchant Contact Number'
									size='small'
									sx={{ my: 0.5, width: "100% !important" }}
									{...register("merchantContact", { required: true })}
									variant='outlined'
								/>
								<TextField
									type='email'
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									label='Email'
									helperText='Email'
									{...register("merchantEmail", { required: true })}
								/>
							</Box>
							<Box sx={{ display: "flex", gap: "20px" }}>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									fullWidth
									required
									type='password'
									label='User Password'
									helperText='User Password'
									{...register("password", {
										required: true,
									})}
								/>
								<TextField
									size='small'
									sx={{ my: 0.5 }}
									type='password'
									fullWidth
									required
									label='Confirm Password'
									helperText={
										errors ? (
											<span style={{ color: "red" }}>
												Your password didn't matched.
											</span>
										) : (
											"Confirm Password"
										)
									}
									{...register("merchantPassword", {
										required: true,
										validate: (val) => {
											if (watch("password") !== val) {
												setErrors(true);
												return "false";
											}
										},
									})}
								/>
							</Box>

							<Box sx={{ my: 2 }}>
								<Button
									type='submit'
									variant='contained'
									color='success'
									sx={{ my: 0.7, fontWeight: "bold", px: 1.5, mx: 1 }}>
									<DoneIcon sx={{ mr: 0.5 }} />
									Save
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
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default AddMerchants;

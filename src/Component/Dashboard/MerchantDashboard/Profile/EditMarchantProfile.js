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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
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

const EditMarchantProfile = ({ open, setOpen, token, setSubmitting, data }) => {
	const [merchants, setMerchants] = useState();
	const { register, handleSubmit, reset, watch } = useForm({
		defaultValues: {
			merchantName: "",
			merchantCompanyName: "",
			merchantAddress: "",
			merchantBusinessAddress: "",
			merchantDistrict: "",
			merchantBranchName: "",
			merchantArea: "",
			merchantContact: "",
			merchantEmail: "",
			merchantPassword: "",
			merchantBankName: "",
			merchantBankBranch: "",
			merchantBankAccNumber: "",
			merchantMobileBanking: ""
		},
	});
	const [error, setError] = useState(false);
	const [selectedBranch, setSelectedBranch] = useState();
	const [branches, setBranches] = useState();
	const [districts, setDistricts] = useState();
	useEffect(() => {
		axios
			.get(
				`${process.env.REACT_APP_API_PATH}/merchants/${data?.merchantEmail}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				},
			)
			.then((response) => {
				reset(response?.data);
				setMerchants(response.data);
			})
			.catch((error) => {
				console.log(error);
			});
		axios
			.get(`${process.env.REACT_APP_API_PATH}/branches`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				setBranches(response?.data);
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
				setDistricts(response?.data);
			})
			.catch((error) => {
				console.log(error);
			});
	}, [data, reset, token]);

	const onSubmit = ({
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
		merchantBankName,
		merchantBankBranch,
		merchantBankAccNumber,
		merchantMobileBanking

	}) => {
		console.log({
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
			merchantBankName,
			merchantBankBranch,
			merchantBankAccNumber,
			merchantMobileBanking
		});
		setSubmitting(true);
		axios
			.put(
				`${process.env.REACT_APP_API_PATH}/merchant/${data?._id}`,
				{
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
					merchantBankName,
					merchantBankBranch,
					merchantBankAccNumber,
					merchantMobileBanking
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
						{branches && districts ? (
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
									<RemoveRedEyeIcon sx={{ mr: 2 }} /> Edit Merchant Details
								</Typography>
								<form onSubmit={handleSubmit(onSubmit)}>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											required
											helperText='Name'
											{...register("merchantName", { required: true })}
										/>
										<TextField
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											required
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
											helperText='Business Address'
											{...register("merchantBusinessAddress", {
												required: true,
											})}
										/>
									</Box>
									<Autocomplete
										size='small'
										sx={{ my: 0.5, width: "100% !important" }}
										options={districts}
										getOptionLabel={(option) => option?.district}
										style={{ width: 300 }}
										defaultValue={
											districts[
											districts?.findIndex(
												(x) => x?.district === data?.merchantDistrict,
											)
											]
										}
										renderInput={(params) => (
											<TextField
												{...register("merchantDistrict", {
													required: true,
												})}
												{...params}
												variant='outlined'
												helperText='District'
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
											getOptionLabel={(option) => option?.branchName}
											style={{ width: 300 }}
											defaultValue={
												branches[
												branches?.findIndex(
													(x) => x?.branchName === data?.merchantBranchName,
												)
												]
											}
											renderInput={(params) => (
												<TextField
													{...register("merchantBranchName", {
														required: true,
													})}
													{...params}
													variant='outlined'
													helperText='Branch'
												/>
											)}
										/>

										<Autocomplete
											size='small'
											sx={{ my: 0.5, width: "100% !important" }}
											options={
												selectedBranch ||
												branches?.filter(
													(x) => x?.branchName === data?.merchantBranchName,
												)?.branchArea ||
												[]
											}
											getOptionLabel={(option) => option?.area}
											style={{ width: 300 }}
											defaultValue={branches
												?.find(
													(x) => x?.branchName === data?.merchantBranchName,
												)
												?.branchArea?.find(
													(xy) => xy?.area === data?.merchantArea || [],
												)}
											renderInput={(params) => (
												<TextField
													{...register("merchantArea", { required: true })}
													{...params}
													variant='outlined'
													helperText='Area'
												/>
											)}
										/>
									</Box>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											minlength='11'
											maxlength='11'
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
											helperText='Email'
											{...register("merchantEmail", { required: true })}
										/>
									</Box>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											minlength='11'
											maxlength='11'
											type='name'
											helperText='Bank Name'
											id='filled-start-adornment'
											placeholder='Bank Name'
											size='small'
											sx={{ my: 0.5, width: "100% !important" }}
											{...register("merchantBankName", { required: true })}
											variant='outlined'
										/>
										<TextField
											type='name'
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											required
											placeholder='Bank Branch Name'
											helperText='Bank Branch Name'
											{...register("merchantBankBranch", { required: true })}
										/>
									</Box>
									<Box sx={{ display: "flex", gap: "20px" }}>
										<TextField
											type='number'
											helperText='Bank Account Number'
											id='filled-start-adornment'
											placeholder='Bank Account Number'
											size='small'
											sx={{ my: 0.5, width: "100% !important" }}
											{...register("merchantBankAccNumber", { required: true })}
											variant='outlined'
										/>
										<TextField
											type='number'
											size='small'
											sx={{ my: 0.5 }}
											fullWidth
											placeholder='Mobile Banking Number'
											helperText='Mobile Banking Number'
											{...register("merchantMobileBanking", { required: true })}
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

export default EditMarchantProfile;

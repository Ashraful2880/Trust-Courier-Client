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
import CancelIcon from "@mui/icons-material/Cancel";
import { useForm } from "react-hook-form";
import SendIcon from "@mui/icons-material/Send";
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

const AddWarehouseUsers = ({ open, setOpen, token, setSubmitting }) => {
	const { register, handleSubmit, reset } = useForm();
	const [warehouses, setWarehouses] = useState();

	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/warehouses`, {
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
	}, [token]);
	const onSubmit = ({
		warehouseUserName,
		warehouseUserAddress,
		wareHouseName,
		warehouseUserContact,
		warehouseUserEmail,
		warehouseUserPassword,
		warehouseUserImage,
	}) => {
		setSubmitting(true);
		axios
			.post(
				`${process.env.REACT_APP_API_PATH}/warehouseUser`,
				{
					warehouseUserName,
					warehouseUserAddress,
					wareHouseName,
					warehouseUserContact,
					warehouseUserEmail,
					warehouseUserPassword,
					warehouseUserImage,
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
								top: "5px",
								right: "5px",
								cursor: "pointer",
							}}
						/>

						<Typography variant='h5' sx={{ fontWeight: "bold", mb: 1.5 }}>
							Add Warehouse
						</Typography>
						<form onSubmit={handleSubmit(onSubmit)}>
							<TextField
								size='small'
								sx={{ my: 0.7 }}
								fullWidth
								required
								label='Warehouse Name'
								{...register("warehouseUserName", { required: true })}
							/>
							<TextField
								size='small'
								sx={{ my: 0.7 }}
								fullWidth
								multiline
								rows={2}
								label='Warehouse Address'
								{...register("warehouseUserAddress", { required: true })}
							/>
							<Autocomplete
								size='small'
								sx={{ my: 1, width: "100% !important" }}
								options={warehouses}
								getOptionLabel={(option) => option.warehouseName}
								style={{ width: 300 }}
								renderInput={(params) => (
									<TextField
										{...register("wareHouseName", { required: true })}
										{...params}
										label='Warehouse Name'
										variant='outlined'
									/>
								)}
							/>

							<TextField
								size='small'
								sx={{ my: 0.7 }}
								fullWidth
								label='Warehouse Contact'
								{...register("warehouseUserContact", { required: true })}
							/>
							<TextField
								size='small'
								sx={{ my: 0.7 }}
								fullWidth
								label='Warehouse Email'
								{...register("warehouseUserEmail", { required: true })}
							/>
							<TextField
								size='small'
								sx={{ my: 0.7 }}
								fullWidth
								label='Warehouse Password'
								{...register("warehouseUserPassword", { required: true })}
							/>
							<TextField
								size='small'
								sx={{ my: 0.7 }}
								fullWidth
								label='Warehouse Image'
								{...register("warehouseUserImage", { required: true })}
							/>
							<Button
								type='submit'
								variant='contained'
								className='button'
								sx={{ my: 0.7, fontWeight: "bold", px: 2.5 }}>
								Add <SendIcon sx={{ ml: 1.5 }} />
							</Button>
						</form>
					</Box>
				</Fade>
			</Modal>
		</div>
	);
};

export default AddWarehouseUsers;
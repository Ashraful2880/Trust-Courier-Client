import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Button, TextField, Backdrop, Typography, CircularProgress, } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useForm } from "react-hook-form";
import ReplayIcon from "@mui/icons-material/Replay";
import DoneIcon from '@mui/icons-material/Done';
import CancelIcon from "@mui/icons-material/Cancel";
import BorderColorIcon from '@mui/icons-material/BorderColor';
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

const EditItemCategory = ({ open, setOpen, id, token, setSubmitting }) => {
	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			itemCategoryName: "",
			itemCategoryDetails: "",
		},
	});

	const [data, setData] = React.useState();
	useEffect(() => {
		axios
			.get(`${process.env.REACT_APP_API_PATH}/itemCategory/${id}`, {
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
	}, [id, reset, token]);
	const onSubmit = ({ itemCategoryName, itemCategoryDetails }) => {
		setSubmitting(true);
		axios
			.put(
				`${process.env.REACT_APP_API_PATH}/itemCategory/${id}`,
				{
					itemCategoryName,
					itemCategoryDetails,
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
						{data ? (
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
									<BorderColorIcon sx={{ mr: 2 }} /> Edit Item Category
								</Typography>
								<form onSubmit={handleSubmit(onSubmit)}>
									<TextField
										size='small'
										sx={{ my: 0.7 }}
										fullWidth
										required
										{...register("itemCategoryName", { required: true })}
									/>

									<TextField
										size='small'
										sx={{ my: 0.7 }}
										fullWidth
										multiline
										rows={3}
										{...register("itemCategoryDetails", { required: true })}
									/>

									<Box sx={{ my: 2 }}>
										<Button
											type='submit'
											variant='contained'
											color='success'
											sx={{ my: 0.7, fontWeight: "bold", px: 1.5, mx: 1 }}>
											<DoneIcon sx={{ mr: 0.5 }} />
											Update
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

export default EditItemCategory;

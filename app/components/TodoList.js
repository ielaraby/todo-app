import { useState, useContext, useEffect, useMemo, useReducer } from "react";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import todoReducer from "../reducers/todoReducer";
import Todo from "./Todo";

export default function TodoList() {
	const [todoTitle, setTodoTitle] = useState("");
	const [todos, dispatch] = useReducer(todoReducer, []);
	const [displayTodosType, setDisplayTodosType] = useState("all");
	const [open, setOpen] = useState(false);
	const [dialogTodo, setDialogTodo] = useState(null);
	const [openUpdate, setOpenUpdate] = useState(false);

	let filteredTodos = todos;

	useEffect(() => {
		dispatch({ type: "get" });
	}, []);

	function handleTodosTypeChange(e) {
		setDisplayTodosType(e.target.value);
	}

	const handleClose = () => {
		setOpen(false);
	};

	function openDeleteDialog(todo) {
		setDialogTodo(todo);
		setOpen(true);
	}

	function handleDelete() {
		dispatch({ type: "delete", payload: dialogTodo });
		setOpen(false);
	}

	function handleUpdateOpen(todo) {
		setDialogTodo(todo);
		setOpenUpdate(true);
	}

	const handleUpdateClose = () => {
		setOpenUpdate(false);
	};

	function handleUpdate() {
		dispatch({ type: "update", payload: dialogTodo });
		setOpenUpdate(false);
	}

	function handleComplete(todo) {
		dispatch({ type: "complete", payload: todo });
	}

	const completedTodos = useMemo(() => {
		return todos.filter((t) => {
			return t.isCompleted;
		});
	}, [todos]);

	const notCompletedTodos = useMemo(() => {
		return todos.filter((t) => {
			return !t.isCompleted;
		});
	}, [todos]);

	if (displayTodosType == "completed") {
		filteredTodos = completedTodos;
	} else if (displayTodosType == "not-completed") {
		filteredTodos = notCompletedTodos;
	} else {
		filteredTodos = todos;
	}

	function addTodo() {
		dispatch({ type: "add", payload: { newTitle: todoTitle } });
		setTodoTitle("");
	}

	const todoList = filteredTodos.map((t) => {
		return (
			<Todo
				key={t.id}
				todo={t}
				openDelete={openDeleteDialog}
				openUpdate={handleUpdateOpen}
				setComplete={handleComplete}
			/>
		);
	});

	return (
		<>
			{/* Modal of Delete */}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ direction: "rtl" }}
			>
				<DialogTitle id="alert-dialog-title">
					{"هل أنت متأكد من رغبتك فى حذف المهمة؟"}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						لاحظ أنه لا يمكنك التراجع عن الحذف بعد الموافقة
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>إغلاق</Button>
					<Button onClick={handleDelete} autoFocus>
						نعم، متأكد
					</Button>
				</DialogActions>
			</Dialog>
			{/* End Modal of Delete */}

			{/* Modal of Update */}
			<Dialog
				open={openUpdate}
				onClose={handleUpdateClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				style={{ direction: "rtl" }}
			>
				<DialogTitle id="alert-dialog-title">{"تعديل مهمة"}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="عنوان المهمة"
						type="email"
						fullWidth
						variant="standard"
						value={dialogTodo ? dialogTodo.title : ""}
						onChange={(e) => {
							setDialogTodo({ ...dialogTodo, title: e.target.value });
						}}
					/>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="التفاصيل"
						type="email"
						fullWidth
						variant="standard"
						value={dialogTodo ? dialogTodo.desc : ""}
						onChange={(e) => {
							setDialogTodo({ ...dialogTodo, desc: e.target.value });
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleUpdateClose}>إغلاق</Button>
					<Button
						onClick={() => {
							handleUpdate();
						}}
						autoFocus
					>
						تعديل
					</Button>
				</DialogActions>
			</Dialog>
			{/* End Modal of Update */}

			<Container maxWidth="sm">
				<Card sx={{ minWidth: 275 }}>
					<CardContent style={{ textAlign: "center", height: "70vh" }}>
						<Typography variant="h2">مهامي</Typography>

						<Divider />

						{/* Filter buttons */}
						<ToggleButtonGroup
							style={{ marginTop: "30px" }}
							color="primary"
							value={displayTodosType}
							exclusive
							onChange={handleTodosTypeChange}
							aria-label="Platform"
						>
							<ToggleButton value="not-completed">الغير منجزة</ToggleButton>
							<ToggleButton value="completed">المنجزة</ToggleButton>
							<ToggleButton value="all">الكل</ToggleButton>
						</ToggleButtonGroup>
						{/* End Filter buttons */}

						{/* Todo List */}
						<div
							style={{ height: "74%", marginTop: "20px", overflowY: "scroll" }}
						>
							{todoList}
						</div>
						{/* End Todo List */}

						{/* Adding Todo */}
						<Grid
							container
							spacing={0}
							style={{
								background: "white",
								paddingTop: "20px",
								paddingBottom: "20px",
								position: "sticky",
								bottom: "0",
							}}
						>
							<Grid
								item={true}
								xs={4}
								display="flex"
								justifyContent="space-around"
								alignItems="center"
							>
								<Button
									style={{ width: "100%", height: "100%" }}
									variant="contained"
									size="large"
									disabled={todoTitle == 0}
									onClick={() => {
										addTodo();
									}}
								>
									إضافة
								</Button>
							</Grid>

							<Grid xs={8} item={true}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="عنوان المهمة"
									variant="outlined"
									value={todoTitle}
									onChange={(e) => {
										setTodoTitle(e.target.value);
									}}
								/>
							</Grid>
						</Grid>
						{/* End Adding Todo */}
					</CardContent>
				</Card>
			</Container>
		</>
	);
}

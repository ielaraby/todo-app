import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../contexts/TodosContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export default function Todo({ todo, openDelete, openUpdate }) {
	const { allTodos, setAllTodos } = useContext(TodosContext);

	const handleClickOpen = () => {
		openDelete(todo);
	};

	function handleComplete() {
		const updatedTodos = allTodos.map((t) => {
			if (t.id == todo.id) {
				t.isCompleted = !t.isCompleted;
			}
			return t;
		});
		setAllTodos(updatedTodos);
		localStorage.setItem("todos", JSON.stringify(updatedTodos));
	}

	const handleUpdateOpen = () => {
		openUpdate(todo);
	};

	return (
		<Card
			className="todoCard"
			sx={{
				minWidth: 275,
				marginBottom: 2,
				background: todo.isCompleted ? "#009933" : "#655991",
				textDecoration: todo.isCompleted ? "line-through" : "none",
				color: "white",
			}}
		>
			<CardContent>
				<Grid container>
					<Grid
						item={true}
						xs={4}
						display="flex"
						justifyContent="space-around"
						alignItems="center"
					>
						<IconButton
							className="iconButton"
							aria-label="delete"
							style={{ background: "#dd5599" }}
							onClick={() => {
								handleClickOpen();
							}}
						>
							<DeleteOutlinedIcon />
						</IconButton>
						<IconButton
							className="iconButton"
							aria-label="edit"
							style={{ background: "#caca00" }}
							onClick={() => {
								handleUpdateOpen();
							}}
						>
							<EditOutlinedIcon />
						</IconButton>
						<IconButton
							className="iconButton"
							aria-label="complete"
							style={{
								background: todo.isCompleted ? "#655991" : "#009933",
								color: "white",
							}}
							onClick={() => {
								handleComplete();
							}}
						>
							<CheckIcon />
						</IconButton>
					</Grid>

					<Grid xs={8} item={true}>
						<Typography variant="h5" style={{ textAlign: "right" }}>
							{todo.title}
						</Typography>
						<Typography variant="h6" style={{ textAlign: "right" }}>
							{todo.desc}
						</Typography>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
}

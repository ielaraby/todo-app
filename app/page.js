"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState } from "react";
import TodoList from "./components/TodoList.js";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { TodosContext } from "./contexts/TodosContext";

import { v4 as uuidv4 } from "uuid";

const theme = createTheme({
	spacing: [0, 2, 4, 8, 16, 32, 64],
	typography: {
		fontFamily: "Almarai",
	},
});

const todos = [
	{
		id: uuidv4(),
		title: "المهمة الأولي",
		desc: "تفاصيل المهمة الأولي",
		isCompleted: false,
	},
	{
		id: uuidv4(),
		title: "المهمة الثانية",
		desc: "تفاصيل المهمة الثانية",
		isCompleted: false,
	},
	{
		id: uuidv4(),
		title: "المهمة الثالثة",
		desc: "تفاصيل المهمة الثالثة",
		isCompleted: false,
	},
];

export default function Home() {
	const [allTodos, setAllTodos] = useState(todos);

	return (
		<themeProvider theme={theme}>
			<div
				style={{
					display: "flex",
					height: "100vh",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<TodosContext.Provider value={{ allTodos, setAllTodos }}>
					<TodoList />
				</TodosContext.Provider>
			</div>
		</themeProvider>
	);
}

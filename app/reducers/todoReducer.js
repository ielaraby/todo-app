import { v4 as uuidv4 } from "uuid";

export default function todoReducer(currentTodos, action) {
	switch (action.type) {
		case "add": {
			const newTodo = {
				id: uuidv4(),
				title: action.payload.newTitle,
				desc: "",
				isCompleted: false,
			};

			const newTodos = [...currentTodos, newTodo];
			localStorage.setItem("todos", JSON.stringify(newTodos));

			return newTodos;
		}

		case "update": {
			const updatedTodos = currentTodos.map((t) => {
				if (t.id == action.payload.id) {
					return {
						...t,
						title: action.payload.title,
						desc: action.payload.desc,
					};
				} else {
					return t;
				}
			});

			localStorage.setItem("todos", JSON.stringify(updatedTodos));
			return updatedTodos;
		}

		case "delete": {
			const updatedTodos = currentTodos.filter((t) => {
				return t.id != action.payload.id;
			});

			localStorage.setItem("todos", JSON.stringify(updatedTodos));
			return updatedTodos;
		}

		case "complete": {
			const updatedTodos = currentTodos.map((t) => {
				if (t.id == action.payload.id) {
					const updatedTodo = {
						...t,
						isCompleted: !t.isCompleted,
					};
					return updatedTodo;
				}
				return t;
			});

			localStorage.setItem("todos", JSON.stringify(updatedTodos));
			return updatedTodos;
		}

		case "get": {
			const todoStorage = JSON.parse(localStorage.getItem("todos"));
			return todoStorage;
		}

		default: {
			throw Error("Unknown Action: " + action.type);
		}
	}
	return [];
}

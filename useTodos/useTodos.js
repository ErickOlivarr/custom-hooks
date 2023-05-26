import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

//este custom hook se usó en el componente TodoApp del archivo TodoApp.jsx, checarlo, ahi se explica el hook del useReducer y lo demas que se ve abajo

const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || [];
};

export const useTodos = () => {

    const [ todos, dispatch ] = useReducer(todoReducer, [], init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);


    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };

        dispatch(action);
    };

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    };

    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    };


    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter(todo => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    };
};
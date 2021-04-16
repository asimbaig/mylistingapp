import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, AppDispatch } from '../../app/store'
import { Todo } from './types';
import axios from "../../api/database";

const initialState: Todo[] = [];

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action: PayloadAction<Todo>) {
            state.push(action.payload);
        },
        removeTodo(state, action: PayloadAction<string>) {
            var index = state.findIndex(todo => todo.id === action.payload);
            if (index > -1) {
                state.splice(index, 1);
            }
        },
        toggleTodo(state, action: PayloadAction<Todo>) {
            
            let todo = state.find(todo => todo.id === action.payload.id);

            if (todo) {
                const userId = localStorage.getItem('userId');
                todo.completed = !todo.completed;
                axios
                    .put("/NewTodos/" + userId + "/" + todo.id + ".json", todo);
            }

        },
        loadTodos(state, action: PayloadAction<Todo[]>) {
            state.length = 0;
            for (let todo in action.payload) {
                state.push(action.payload[todo]);
            }
        }
    }
});

export const { toggleTodo } = todoSlice.actions;

export const removeTodo = (id: string): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    axios
        .delete("/NewTodos/"+ userId + "/" + id + ".json")
        .then((response) => {
            dispatch(todoSlice.actions.removeTodo(id))
        })
        .catch((err) => {
            console.log(">_>->_>->_>" + JSON.stringify(err));
        });
}
export const addTodo = (text: string): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    const newTodo: Todo = {
        completed: false,
        dated: new Date().toDateString(),
        text: text
    }
    axios
        .post("/NewTodos/" + userId + ".json", newTodo)
        .then((response) => {
            //console.log(JSON.stringify(response));
            newTodo.id = response.data.name;
            dispatch(todoSlice.actions.addTodo(newTodo))
        })
        .catch((err) => {
            console.log(">_>->_>->_>" + JSON.stringify(err));
        });
}
export const loadTodos = (): AppThunk => async (dispatch: AppDispatch) => {
    const userId = localStorage.getItem('userId');
    axios
        .get("/NewTodos/" + userId + ".json")
        .then((res) => {
            const fetchedTodos = [];
            for (let key in res.data) {
                fetchedTodos.push({
                    ...res.data[key],
                    id: key,
                });
            }
            fetchedTodos.sort(function (a, b) {
                return a.status - b.status;
            });
            return fetchedTodos;
        })
        .then((fetchedTodos) => {
            dispatch(todoSlice.actions.loadTodos(fetchedTodos));
        })
        .catch((err) => {
            // console.log(err);
        });
}
export default todoSlice.reducer;
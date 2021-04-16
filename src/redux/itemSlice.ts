import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import { Item, ItemModel } from "./itemType";
// import axios from "../../api/database";
import LISTINGS from "../../src/redux/listings.dummy";

const initialState: ItemModel = { items: [], selectedItem: undefined };

const itemsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
    },
    removeTodo(state, action: PayloadAction<string>) {
      var index = state.items.findIndex((item) => item._id === action.payload);
      if (index > -1) {
        state.items.splice(index, 1);
      }
    },
    setSelectedItem(state, action: PayloadAction<Item>) {
      state.selectedItem = action.payload;
    },
    // toggleTodo(state, action: PayloadAction<Todo>) {
    //     let todo = state.find(todo => todo.id === action.payload.id);
    //     if (todo) {
    //         const userId = localStorage.getItem('userId');
    //         todo.completed = !todo.completed;
    //         axios
    //             .put("/NewTodos/" + userId + "/" + todo.id + ".json", todo);
    //     }
    // },
    loadItems(state, action: PayloadAction<Item[]>) {
      state.items.length = 0;
      for (let item in action.payload) {
        state.items.push(action.payload[item]);
      }
    },
  },
});

// export const { toggleTodo } = todoSlice.actions;

export const removeItem = (id: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  // const userId = localStorage.getItem('userId');
  // axios
  //     .delete("/NewTodos/"+ userId + "/" + id + ".json")
  //     .then((response) => {
  //         dispatch(todoSlice.actions.removeTodo(id))
  //     })
  //     .catch((err) => {
  //         console.log(">_>->_>->_>" + JSON.stringify(err));
  //     });
};
export const addItem = (text: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  // const userId = localStorage.getItem('userId');
  // const newTodo: Todo = {
  //     completed: false,
  //     dated: new Date().toDateString(),
  //     text: text
  // }
  // axios
  //     .post("/NewTodos/" + userId + ".json", newTodo)
  //     .then((response) => {
  //         //console.log(JSON.stringify(response));
  //         newTodo.id = response.data.name;
  //         dispatch(todoSlice.actions.addTodo(newTodo))
  //     })
  //     .catch((err) => {
  //         console.log(">_>->_>->_>" + JSON.stringify(err));
  //     });
};
export const loadItems = (): AppThunk => async (dispatch: AppDispatch) => {
  let listings: Item[] = [...LISTINGS];
  dispatch(itemsSlice.actions.loadItems(listings));

  // const userId = localStorage.getItem('userId');
  // axios
  //     .get("/NewTodos/" + userId + ".json")
  //     .then((res) => {
  //         const fetchedTodos = [];
  //         for (let key in res.data) {
  //             fetchedTodos.push({
  //                 ...res.data[key],
  //                 id: key,
  //             });
  //         }
  //         fetchedTodos.sort(function (a, b) {
  //             return a.status - b.status;
  //         });
  //         return fetchedTodos;
  //     })
  //     .then((fetchedTodos) => {
  //         dispatch(todoSlice.actions.loadTodos(fetchedTodos));
  //     })
  //     .catch((err) => {
  //         // console.log(err);
  //     });
};
export const setSelectItem = (selectedItem: Item): AppThunk => async (
  dispatch: AppDispatch
) => {
  dispatch(itemsSlice.actions.setSelectedItem(selectedItem));
};
export default itemsSlice.reducer;

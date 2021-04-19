import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import { Item, ItemModel } from "./itemType";
import { UserModel } from "./userType";
import axios from "./api-ref";


const initialState: ItemModel = { 
  items: [], 
  selectedItem: undefined, 
  userOtherItems: [], 
  itemUser: undefined, 
  myItems: [],
  searchText:  ""
};

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
    loadItems(state, action: PayloadAction<Item[]>) {
      if (state.searchText) {
        state.items = action.payload.filter(s => s.title.toLowerCase().indexOf(state.searchText.toLowerCase()) > -1);
      }else{
        state.items.length = 0;
        for (let item in action.payload) {
          state.items.push(action.payload[item]);
        }
      }
    },
    loadUserOtherItems(state, action: PayloadAction<Item[]>) {
      state.userOtherItems.length = 0;
      for (let item in action.payload) {
        state.userOtherItems.push(action.payload[item]);
      }
    },
    setItemUser(state, action: PayloadAction<UserModel>) {
      state.itemUser = action.payload;
    },
    loadMyItems(state, action: PayloadAction<Item[]>) {
      state.myItems.length = 0;
      for (let item in action.payload) {
        state.myItems.push(action.payload[item]);
      }
    },
    setSearchText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
  },
});

export const { setSearchText } = itemsSlice.actions;

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
  axios.get("items")
        .then((res) => {
          dispatch(itemsSlice.actions.loadItems(res.data as Item[]));
        })
        .catch((err) => {});
};
export const loadUserOtherItems = (userItemIds: String[]): AppThunk => async (dispatch: AppDispatch) => {
  let UserItems: Item[] = [];
  axios.get("items").then((res) => {
          const items = res.data as Item[]
          items.map((item)=>{
            for(var i=0;  i < userItemIds.length;i++){
                  if(item._id===userItemIds[i]){
                      UserItems.push(item);
                  }
            }
          });
          // console.log("UserItems: "+ UserItems);
          dispatch(itemsSlice.actions.loadUserOtherItems(UserItems));
        }).catch((err) => {console.log(err)});
};
export const loadMyItems = (userId: String): AppThunk => async (dispatch: AppDispatch) => {
  axios.get("items/user/"+userId).then((res) => {
          const items = res.data as Item[];
          dispatch(itemsSlice.actions.loadMyItems(items));
        }).catch((err) => {console.log(err)});
};
export const setSelectItem = (selectedItem: Item): AppThunk => async (dispatch: AppDispatch) => {
  axios.get("users/ItemUser/" + selectedItem.userId).then((res) => {
          var itemUser = res.data as UserModel;
          dispatch(itemsSlice.actions.setItemUser(itemUser));
          dispatch(loadUserOtherItems(itemUser.listedItems));
        })
        .catch((error) => {
          console.log(error);
        });
  dispatch(itemsSlice.actions.setSelectedItem(selectedItem));
};
export default itemsSlice.reducer;

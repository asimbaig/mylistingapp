import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, AppDispatch } from "./store";
import { Item, ItemModel } from "./itemType";
import { UserModel } from "./userType";
import axios from "./api-ref";
import { setIsLoading } from "./appSlice";
import { PhotoModel } from "./photoType";

const initialState: ItemModel = {
  items: [],
  selectedItem: undefined,
  userOtherItems: [],
  itemUser: undefined,
  myItems: [],
  searchText: "",
};

const itemsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      state.items.push(action.payload);
      state.myItems.push(action.payload);
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
        state.items = action.payload.filter(
          (s) =>
            s.title.toLowerCase().indexOf(state.searchText.toLowerCase()) > -1
        );
      } else {
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
    updateItem(state, action: PayloadAction<Item>) {
      let itemIndex = state.items.findIndex((item => item._id === action.payload._id));
      state.items[itemIndex] = action.payload;
    },
    updateItemViews(state, action: PayloadAction<Item>) {
      // console.log("action.payload.views: "+ action.payload.views);
      state = {
        ...state,
        items: state.items.map((item, i) => {
          if (item._id === action.payload._id) {
            item.views = action.payload.views;
          }
          return item;
        }),
      };
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
export const addItem = (item: Item): AppThunk => async (
  dispatch: AppDispatch
) => {
  axios
    .post("items/", item)
    .then((response) => {
      //console.log(JSON.stringify(response));
      dispatch(itemsSlice.actions.addItem(response.data as Item));
    })
    .catch((err) => {
      console.log(">_>->_>->_>" + JSON.stringify(err));
    });
};
export const loadItems = (): AppThunk => async (dispatch: AppDispatch) => {
  setIsLoading(true);
  axios
    .get("items")
    .then((res) => {
      dispatch(itemsSlice.actions.loadItems(res.data as Item[]));
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
};
export const loadUserOtherItems = (userItemIds: String[]): AppThunk => async (
  dispatch: AppDispatch
) => {
  setIsLoading(true);
  let UserItems: Item[] = [];
  axios
    .get("items")
    .then((res) => {
      const items = res.data as Item[];
      items.map((item) => {
        for (var i = 0; i < userItemIds.length; i++) {
          if (item._id === userItemIds[i]) {
            UserItems.push(item);
          }
        }
      });
      // console.log("UserItems: "+ UserItems);
      dispatch(itemsSlice.actions.loadUserOtherItems(UserItems));
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const loadMyItems = (userId: String): AppThunk => async (
  dispatch: AppDispatch
) => {
  setIsLoading(true);
  axios
    .get("items/user/" + userId)
    .then((res) => {
      const items = res.data as Item[];
      dispatch(itemsSlice.actions.loadMyItems(items));
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};
export const setSelectItem = (selectedItem: Item): AppThunk => async (
  dispatch: AppDispatch
) => {
  setIsLoading(true);
  axios
    .get("users/ItemUser/" + selectedItem.userId)
    .then((res) => {
      var itemUser = res.data as UserModel;
      dispatch(itemsSlice.actions.setItemUser(itemUser));
      dispatch(loadUserOtherItems(itemUser.listedItems));
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  dispatch(itemsSlice.actions.setSelectedItem(selectedItem));
};
export const updateItemViews = (itemId: string): AppThunk => async (
  dispatch: AppDispatch
) => {
  axios
    .put("items/views/" + itemId)
    .then((res) => {
      dispatch(itemsSlice.actions.updateItemViews(res.data));
      // console.log("View Updated: "+res.data.views);
    })
    .catch((err) => {});
};
export const deleteItemImage = (
  photo: PhotoModel,
  itemId: string
): AppThunk => async (dispatch: AppDispatch) => {
  setIsLoading(true);
  axios
    .post("items/deleteItemImage/" + itemId, photo)
    .then((res) => {
      dispatch(itemsSlice.actions.updateItem(res.data as Item));
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
    });
};
export default itemsSlice.reducer;

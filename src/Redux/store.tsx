import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import listMovieReducer from "./moduleDemo/reducer/ListMovieReducer";
import credentialsReducer from "../Layout/Navbar/SignIn/module/reducer/credentialsReducer";
import userProfileReducer from "../Layout/Navbar/NavSub/module/reducer/userProfileReducer";
import detailProductReducer from "../Layout/DeTailProduct/module/detailProductReducer";
import manageUserReducer from "../Layout/Admin/Users/module/manageUserReducer";
import categoryReducer from "../Layout/Navbar/NavMenu/categoryReducer";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    listMovieReducer,
    credentialsReducer,
    userProfileReducer,
    detailProductReducer,
    manageUserReducer,
    categoryReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

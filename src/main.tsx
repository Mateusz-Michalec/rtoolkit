import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { fetchUsers } from "./features/users/usersSlice"
import { BrowserRouter, Routes } from "react-router-dom"
import { fetchPosts } from "./features/posts/postSlice"

store.dispatch(fetchPosts())
store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

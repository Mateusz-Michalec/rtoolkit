import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { fetchUsers } from "./features/users/usersSlice"
import { BrowserRouter } from "react-router-dom"
import { postsApi } from "./features/posts/postSlice"

store.dispatch(postsApi.endpoints.getPosts.initiate())
store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

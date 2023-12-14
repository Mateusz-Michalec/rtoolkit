import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { postsApi } from "./features/api/posts"
import { usersApi } from "./features/api/users"

store.dispatch(postsApi.endpoints.getPosts.initiate())
store.dispatch(usersApi.endpoints.getUsers.initiate())

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)

import { Navigate, Route, Routes } from "react-router-dom"
import PostForm from "./features/posts/PostForm"
import PostsList from "./features/posts/PostsList"
import Layout from "./components/Layout"
import SinglePost from "./features/posts/SinglePost"
import User from "./features/users/User"
import UsersList from "./features/users/UsersList"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<PostForm key="add-post" />} />
          <Route
            path="edit/:postId"
            element={<PostForm key="edit-post" isEdit={true} />}
          />
          <Route path=":postId" element={<SinglePost />} />
        </Route>
        <Route path="users">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<User />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App

import React, { FormEvent, useState } from "react"
import { useAppSelector } from "../../app/hooks"
import { selectAllUsers } from "../users/usersSlice"
import { useNavigate, useParams } from "react-router-dom"
import {
  selectPostById,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../api/posts"

type PostFormProps = {
  isEdit?: boolean
}

const PostForm = ({ isEdit }: PostFormProps) => {
  const { postId } = useParams()
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const [updatePost] = useUpdatePostMutation()
  const [deletePost] = useDeletePostMutation()

  const post = postId
    ? useAppSelector((state) => selectPostById(state, Number(postId)))
    : null

  const navigate = useNavigate()

  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title || "")
  const [body, setBody] = useState(post?.body || "")
  const [userId, setUserId] = useState(post?.userId || 1)
  const [action, setAction] = useState<"add" | "edit" | "delete">("add")

  const onSumbit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (action === "add") await addNewPost({ title, body, userId }).unwrap()
      else if (action === "edit" && post)
        await updatePost({ ...post, title, body, userId }).unwrap()
      else if (action === "delete") await deletePost(postId).unwrap()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section>
      <h2>{isEdit ? "Edit Post" : "Add a New Post"}</h2>
      <form onSubmit={onSumbit}>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          name="postAuthor"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postBody">Body:</label>
        <textarea
          id="postBody"
          name="postBody"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button
          onClick={() => (isEdit ? setAction("edit") : setAction("add"))}
          disabled={title && body && userId ? false : true}
        >
          {isEdit ? "Edit Post" : "Save Post"}
        </button>
        {isEdit ? (
          <button onClick={() => setAction("delete")}>Delete Post</button>
        ) : null}
      </form>
    </section>
  )
}

export default PostForm

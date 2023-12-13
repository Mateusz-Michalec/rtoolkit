import React, { FormEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import {
  Post,
  addNewPost,
  addPost,
  deletePost,
  getPostsStatus,
  selectPostById,
  updatePost,
} from "./postSlice"
import { selectAllUsers } from "../users/usersSlice"
import { useNavigate, useParams } from "react-router-dom"

type PostFormProps = {
  isEdit?: boolean
}

const PostForm = ({ isEdit }: PostFormProps) => {
  const { postId } = useParams()
  const post = postId
    ? useAppSelector((state) => selectPostById(state, Number(postId)))
    : null

  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const users = useAppSelector(selectAllUsers)

  const [title, setTitle] = useState(post?.title || "")
  const [body, setBody] = useState(post?.body || "")
  const [userId, setUserId] = useState(post?.userId || 1)
  const [action, setAction] = useState<"add" | "edit" | "delete">("add")

  const disabledFlag = title && body && userId ? false : true

  const onSumbit = (e: FormEvent) => {
    e.preventDefault()
    try {
      if (post && action === "edit")
        dispatch(updatePost({ ...post, title, body, userId })).unwrap()
      else if (post && action === "delete")
        dispatch(deletePost({ id: post.id })).unwrap()
      else dispatch(addNewPost({ title, body, userId })).unwrap()
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
          disabled={disabledFlag}
        >
          {isEdit ? "Edit Post" : "Save Post"}
        </button>
        {isEdit ? (
          <button onClick={() => setAction("delete")} disabled={disabledFlag}>
            Delete Post
          </button>
        ) : null}
      </form>
    </section>
  )
}

export default PostForm

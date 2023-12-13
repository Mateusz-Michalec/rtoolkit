import React from "react"
import { useAppSelector } from "../../app/hooks"
import { selectPostById } from "./postSlice"
import { useParams } from "react-router-dom"
import PostExcerpt from "./PostExcerpt"

const SinglePost = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, Number(postId)))

  return post ? (
    <PostExcerpt post={post} isExtended={true} />
  ) : (
    <p>Post not found!</p>
  )
}

export default SinglePost

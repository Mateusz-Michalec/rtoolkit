import React from "react"
import { useAppSelector } from "../../app/hooks"

import { useParams } from "react-router-dom"
import PostExcerpt from "./PostExcerpt"
import { selectPostById } from "../api/posts"

const SinglePost = () => {
  const { postId } = useParams()

  const post = useAppSelector((state) => selectPostById(state, Number(postId)))

  return post ? (
    <PostExcerpt postId={post.id} isExtended={true} />
  ) : (
    <p>Post not found!</p>
  )
}

export default SinglePost

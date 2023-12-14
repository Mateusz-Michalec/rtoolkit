import React from "react"
import PostAuthor from "./PostAuthor"
import ReactionBtns from "./ReactionBtns"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import { EntityId } from "@reduxjs/toolkit"
import { selectPostById } from "../api/posts"

type PostExcerptProps = {
  postId: EntityId
  isExtended?: boolean
}

const PostExcerpt = ({ postId, isExtended }: PostExcerptProps) => {
  const navigate = useNavigate()

  const post = useAppSelector((state) => selectPostById(state, postId))

  return (
    <>
      {post ? (
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p className="excerpt">
            {isExtended ? post.body : `${post.body.substring(0, 60)}...`}
          </p>
          <PostAuthor userId={post?.userId} />
          <ReactionBtns postId={post.id} reactions={post.reactions} />
          <p style={{ fontSize: "14px", textAlign: "end", color: "gray" }}>
            {new Date(post.timestamp).toLocaleTimeString()}
          </p>
          {isExtended ? (
            <>
              <button type="button" onClick={() => navigate(-1)}>
                Go Back
              </button>
              <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
            </>
          ) : (
            <Link to={`post/${post.id}`}>View Post</Link>
          )}
        </article>
      ) : null}
    </>
  )
}

export default PostExcerpt

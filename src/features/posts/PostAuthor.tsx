import React from "react"
import { useAppSelector } from "../../app/hooks"
import { selectUserById } from "../users/usersSlice"

type PostAuthorProps = {
  userId: number
}

const PostAuthor = ({ userId }: PostAuthorProps) => {
  const author = useAppSelector((state) => selectUserById(state, userId))

  return (
    <span className="postCredit">by {author ? author.name : "unknown"}</span>
  )
}

export default PostAuthor

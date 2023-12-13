import React from "react"
import { useAppDispatch } from "../../app/hooks"
import { addReaction } from "./postSlice"

const reactionEmoji = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕",
}

type ReactionBtnsProps = {
  postId: number
  reactions: Record<string, number>
}

const ReactionBtns = ({ postId, reactions }: ReactionBtnsProps) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      {Object.entries(reactionEmoji).map(([reaction, emoji]) => (
        <button
          key={reaction}
          type="button"
          className="reactionButton"
          onClick={() =>
            dispatch(addReaction({ postId: postId, reaction: reaction }))
          }
        >
          {emoji} {reactions[reaction]}
        </button>
      ))}
    </div>
  )
}

export default ReactionBtns

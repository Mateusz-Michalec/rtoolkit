import React from "react"
import { useAppDispatch } from "../../app/hooks"
import { useAddReactionMutation } from "../api/posts"

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
  const [addReaction] = useAddReactionMutation()

  return (
    <div>
      {Object.entries(reactionEmoji).map(([reaction, emoji]) => (
        <button
          key={reaction}
          type="button"
          className="reactionButton"
          onClick={() =>
            addReaction({
              postId: postId,
              reactions: { ...reactions, [reaction]: reactions[reaction] + 1 },
            })
          }
        >
          {emoji} {reactions[reaction]}
        </button>
      ))}
    </div>
  )
}

export default ReactionBtns

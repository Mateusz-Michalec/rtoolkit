import { useAppSelector } from "../../app/hooks"
import { selectPostsId, useGetPostsQuery } from "../api/posts"

import PostExcerpt from "./PostExcerpt"

const PostsList = () => {
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery()
  const postsIds = useAppSelector(selectPostsId)

  return (
    <section>
      <h2>Posts</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        postsIds.map((postId) => <PostExcerpt key={postId} postId={postId} />)
      ) : isError ? (
        <p>Something went wrong.</p>
      ) : null}
    </section>
  )
}

export default PostsList

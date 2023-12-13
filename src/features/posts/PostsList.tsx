import { useAppSelector } from "../../app/hooks"
import { getPostsStatus, selectAllPosts, selectPostsIds } from "./postSlice"
import PostExcerpt from "./PostExcerpt"

const PostsList = () => {
  const postsIds = useAppSelector(selectPostsIds)
  const postsStatus = useAppSelector(getPostsStatus)

  return (
    <section>
      <h2>Posts</h2>
      {postsStatus === "loading" ? (
        <p>Loading...</p>
      ) : (
        postsIds.map((postId) => <PostExcerpt key={postId} postId={postId} />)
      )}
    </section>
  )
}

export default PostsList

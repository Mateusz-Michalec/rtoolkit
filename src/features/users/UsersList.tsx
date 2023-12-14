import React from "react"
import { useAppSelector } from "../../app/hooks"
import { Link } from "react-router-dom"
import { useGetUsersQuery } from "../api/users"

const UsersList = () => {
  const { data: users, isLoading, isSuccess, isError } = useGetUsersQuery()

  return (
    <section>
      <h2>Users</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : isSuccess ? (
        <ul>
          {users.ids.map((userId) => (
            <li key={userId}>
              <Link to={`/users/${userId}`}>
                {users.entities[userId]?.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : isError ? (
        <p>Something went wrong</p>
      ) : null}
    </section>
  )
}

export default UsersList

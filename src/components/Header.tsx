import React from "react"
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { increaseCounter, selectCounter } from "../features/posts/postSlice"

const Header = () => {
  const counter = useAppSelector(selectCounter)
  const dispatch = useAppDispatch()
  return (
    <header className="header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="post">Add Post</Link>
          </li>
          <li>
            <Link to="users">Users</Link>
          </li>
          <li>
            <button onClick={() => dispatch(increaseCounter())}>
              {counter}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

import { userLogin } from "@/services"
import React from "react"

 const User = () => {
  const test = () => {
    userLogin()
  }
  return (
    <div>
      <div>User</div>
      <button onClick={test}>click</button>
    </div>
  )
}

export default User
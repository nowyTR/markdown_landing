import React from 'react'
import { useAuth } from 'react-use-auth'
import { Button } from 'rebass'
import UseUpdateUser from '../hooks/useUpdateUser'

function AuthController() {
  const { login, logout, userId, isAuthenticated } = useAuth()
  UseUpdateUser(userId)

  return isAuthenticated() ? (
    <Button bg="muted" color="black" onClick={logout}>
      Logout
    </Button>
  ) : (
    <Button bg="primary" onClick={login}>
      Get Started
    </Button>
  )
}

export default AuthController

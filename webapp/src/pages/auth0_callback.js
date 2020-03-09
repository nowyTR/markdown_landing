import React, { useEffect } from 'react'
import { useAuth } from 'react-use-auth'
import Layout from '../components/layout'

const Auth0CallbackPage = () => {
  const { handleAuthentication } = useAuth()

  useEffect(() => {
    handleAuthentication()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout>
      <h1>This is the auth callback page, you should be redirected immediately.</h1>
    </Layout>
  )
}

export default Auth0CallbackPage

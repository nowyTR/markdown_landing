import React from 'react'
import { Heading } from 'rebass'
import { useAuth } from 'react-use-auth'
import AuthController from '../components/auth_controller'
import Dashboard from '../components/dashboard'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
  const { isAuthenticated } = useAuth()

  return (
    <Layout>
      <SEO title="Home" />
      <Heading>Markdown landing page</Heading>
      <p>Write a landing page for anything</p>
      {isAuthenticated() ? <Dashboard /> : null}
      <AuthController />
    </Layout>
  )
}

export default IndexPage

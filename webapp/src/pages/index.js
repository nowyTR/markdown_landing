import React from 'react'
import { Link } from 'gatsby'
import { Flex, Heading, Box, Button } from 'rebass'
import { useAuth } from 'react-use-auth'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
  const { login, user, isAuthenticated } = useAuth()
  return (
    <Layout>
      <SEO title="Home" />
      <Heading fontSize={[5, 6, 7]}>Hello</Heading>
      <p>Write a landing page for anything</p>
      {isAuthenticated() ? <p>Hello {user.nickname}</p> : null}
      <Button bg="primary" onClick={login}>
        Get started
      </Button>
    </Layout>
  )
}

export default IndexPage

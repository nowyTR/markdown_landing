import React from 'react'
import { Heading, Button } from 'rebass'
import { useAuth } from 'react-use-auth'
import { graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
  const { login, user, isAuthenticated } = useAuth()
  const data = useStaticQuery(graphql`
    query {
      api {
        hello {
          world
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Heading fontSize={[5, 6, 7]}>{data.api.hello.world}</Heading>
      <p>Write a landing page for anything</p>
      {isAuthenticated() ? <p>Hello {user.nickname}</p> : null}
      <Button bg="primary" onClick={login}>
        Get started
      </Button>
    </Layout>
  )
}

export default IndexPage

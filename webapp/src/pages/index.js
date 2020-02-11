import React from 'react'
import { Heading, Button } from 'rebass'
import { useAuth } from 'react-use-auth'
import { graphql, useStaticQuery } from 'gatsby'
import { useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import Layout from '../components/layout'
import SEO from '../components/seo'

const IndexPage = () => {
  const { login, user, isAuthenticated } = useAuth()
  const data = useStaticQuery(graphql`
    query {
      mdlapi {
        hello {
          world
        }
      }
    }
  `)

  const { mdlapi } = data
  const { data: liveData, loading } = useQuery(gql`
    query {
      hello {
        world
      }
    }
  `)

  console.log('apolloData', liveData, 'loading: ', loading)

  return (
    <Layout>
      <SEO title="Home" />
      <Heading fontSize={[5, 6, 7]}>{liveData ? liveData.hello.world : mdlapi.hello.world}</Heading>
      <p>Write a landing page for anything</p>
      {loading ? <p>fetching data...</p> : null}
      {isAuthenticated() ? <p>Hello {user.nickname}</p> : null}
      <Button bg="primary" onClick={login}>
        Get started
      </Button>
    </Layout>
  )
}

export default IndexPage

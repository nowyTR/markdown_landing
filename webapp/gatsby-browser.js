/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import { navigate } from 'gatsby'

import { AuthProvider } from 'react-use-auth'
import { ApolloProvider } from 'react-apollo-hooks'
import { client } from './src/apollo'

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <AuthProvider
      navigate={navigate}
      auth0_domain={process.env.AUTH0_DOMAIN}
      auth0_client_id={process.env.AUTH0_CLIENT_ID}
    >
      {element}
    </AuthProvider>
  </ApolloProvider>
)

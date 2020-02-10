/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

import React from 'react'
import { navigate } from 'gatsby'

import { AuthProvider } from 'react-use-auth'

export const wrapRootElement = ({ element }) => (
  <AuthProvider
    navigate={navigate}
    auth0_domain={process.env.AUTH0_DOMAIN}
    auth0_client_id={process.env.AUTH0_CLIENT_ID}
  >
    {element}
  </AuthProvider>
)

import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-fetch'
import { API_URL } from './config'

export const client = new ApolloClient({
  uri: API_URL,
  fetch
})

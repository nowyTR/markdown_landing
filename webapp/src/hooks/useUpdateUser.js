import React from 'react'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const UPDATE_USER = gql`
  mutation UpdateUser($userId: String!) {
    updateUser(userId: $userId) {
      userId
      createdAt
      lastSignedInAt
    }
  }
`

function UseUpdateUser(userId) {
  const [updateUser] = useMutation(UPDATE_USER)

  React.useEffect(() => {
    if (userId != null) {
      updateUser({ variables: { userId: userId } })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])
}

export default UseUpdateUser

import React from 'react'
import { Link } from 'gatsby'
import { useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { useAuth } from 'react-use-auth'
import { Box, Button } from 'rebass'
import { Input } from '@rebass/forms'

function CreatePageForm({ onSubmit, disabled }) {
  const [formState, setFormState] = React.useState({
    name: '',
    content: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    onSubmit(formState)
  }

  return (
    <Box as="form" onSubmit={handleSubmit} width={400}>
      <Input
        type="text"
        name="pageName"
        placeholder="name you page"
        value={formState.name}
        onChange={e => setFormState({ ...formState, name: e.target.value })}
      />
      <Input
        type="text"
        name="pageContent"
        placeholder="content"
        value={formState.content}
        onChange={e => setFormState({ ...formState, content: e.target.value })}
      />
      <Button variant="primary" onClick={() => console.log('create page')} type="submit" disabled={disabled}>
        Create new page
      </Button>
    </Box>
  )
}

const CREATE_PAGE = gql`
  mutation CreatePage($userId: String!, $pageName: String!) {
    createPage(userId: $userId, pageName: $pageName) {
      pageId
    }
  }
`

function Dashboard() {
  const { user } = useAuth()
  const [createPage, { data, loading }] = useMutation(CREATE_PAGE)

  const handleSubmit = data => {
    createPage({ variables: { userId: user.sub, pageName: data.name } })
  }

  console.log(data)

  return (
    <Box m={[2, 3, 4]}>
      <p>
        Hello <strong>{user.nickname}</strong>, what are you going to create today?
      </p>
      {data != null ? (
        <Link to={`/${data.createPage.pageId}`}>Start editing new page</Link>
      ) : (
        <CreatePageForm onSubmit={handleSubmit} disabled={loading} />
      )}
      List all pages here
    </Box>
  )
}

export default Dashboard

import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Textarea } from '@rebass/forms'
import { Heading, Box, Flex, Button } from 'rebass'
import { useAuth } from 'react-use-auth'
import useRemark from '../hooks/useRemark'
import Layout from '../components/layout'
import SEO from '../components/seo'

const PAGE_QUERY = gql`
  query page($userId: String, $pageId: String) {
    page(userId: $userId, pageId: $pageId) {
      content
      createdAt
      lastUpdatedAt
    }
  }
`

function useContentFromServer({ userId, pageId, setPageContent }) {
  const { data, loading } = useQuery(PAGE_QUERY, { variables: { userId, pageId } })

  React.useEffect(() => {
    if (data) {
      setPageContent(data.page.content)
    }
  }, [data])
}

const SAVE_PAGE = gql`
  mutation SavePage($userId: String!, $pageId: String!, $content: String!) {
    savePage(userId: $userId, pageId: $pageId, content: $content) {
      pageId
      content
    }
  }
`

function LandingPage({ pageContext }) {
  const { userId: currentUserId, isAuthenticated } = useAuth()
  const { pageName, pageId, userId } = pageContext
  const [content, setContent] = React.useState(pageContext.content || '')
  useContentFromServer({ userId, pageId, setPageContent: setContent })
  const [savePage, { data, loading }] = useMutation(SAVE_PAGE)

  const jsxContent = useRemark(content)
  const showForm = isAuthenticated && userId === currentUserId

  const handleSubmit = e => {
    e.preventDefault()
    savePage({ variables: { userId, pageId, content } })
    console.log(content)
  }

  return (
    <Layout>
      <SEO title={pageName} />
      <Heading>{pageName}</Heading>
      {showForm ? (
        <Flex>
          <Box as="form" onSubmit={handleSubmit} width={1 / 2}>
            <Textarea value={content} onChange={e => setContent(e.target.value)} rows={10} />
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </Box>
          <Box width={1 / 2}>{jsxContent}</Box>
        </Flex>
      ) : (
        <Flex>
          <Box width={1}>{jsxContent}</Box>
        </Flex>
      )}
    </Layout>
  )
}

export default LandingPage

import React from 'react'
import { Textarea } from '@rebass/forms'
import { Heading, Box, Flex, Button } from 'rebass'
import { useAuth } from 'react-use-auth'
import useRemark from '../hooks/useRemark'
import useContentFromServer from '../hooks/useContentFromServer'
import Layout from '../components/layout'
import SEO from '../components/seo'

function LandingPage({ pageContext }) {
  const { pageName, pageId, userId } = pageContext
  const [content, setContent] = React.useState(pageContext.content || '')
  const { userId: currentUserId, isAuthenticated } = useAuth()
  const { savePage, isLoading } = useContentFromServer({ userId, pageId, setPageContent: setContent })

  const jsxContent = useRemark(content)
  const showForm = isAuthenticated() && userId === currentUserId

  const handleSubmit = e => {
    e.preventDefault()
    savePage({ variables: { userId, pageId, content } })
  }

  return (
    <Layout>
      <SEO title={pageName} />
      <Heading>{pageName}</Heading>
      {showForm ? (
        <Flex>
          <Box as="form" onSubmit={handleSubmit} width={1 / 2}>
            <Textarea value={content} onChange={e => setContent(e.target.value)} rows={10} />
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? '...' : 'Save'}
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

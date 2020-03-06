import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'
import { Textarea } from '@rebass/forms'
import { Heading, Box, Flex } from 'rebass'
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

function LandingPage({ pageContext }) {
  const [userContent, setUserContent] = React.useState([pageContext.content])
  const { pageName, pageId, userId } = pageContext
  const { data, loading } = useQuery(PAGE_QUERY, { variables: { userId, pageId } })
  // const { isAuthenticated } = useAuth()

  const content = data ? data.page.content : pageContext.content
  const jsx = useRemark(content)

  React.useEffect(() => {
    if (data) {
      setUserContent(data.page.content)
    }
  }, [data])

  console.log(pageContext)
  return (
    <Layout>
      <SEO title={pageName} />
      <Heading>{pageName}</Heading>
      <Flex>
        <Box>
          <Textarea value={userContent} onChange={e => setUserContent(e.target.value)} />
        </Box>
        <Box marginLeft={[4]}>{jsx}</Box>
      </Flex>
    </Layout>
  )
}

export default LandingPage

import React from 'react'
import { useQuery, useMutation } from 'react-apollo-hooks'
import { gql } from 'apollo-boost'

const PAGE_QUERY = gql`
  query page($userId: String, $pageId: String) {
    page(userId: $userId, pageId: $pageId) {
      content
      createdAt
      lastUpdatedAt
    }
  }
`

const SAVE_PAGE = gql`
  mutation SavePage($userId: String!, $pageId: String!, $content: String!) {
    savePage(userId: $userId, pageId: $pageId, content: $content) {
      pageId
      content
    }
  }
`

function useContentFromServer({ userId, pageId, setPageContent }) {
  const { data, loading } = useQuery(PAGE_QUERY, { variables: { userId, pageId } })
  const [savePage, { loading: savePageLoading }] = useMutation(SAVE_PAGE)

  React.useEffect(() => {
    if (data) {
      setPageContent(data.page.content)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return { savePage, isLoading: loading || savePageLoading }
}

export default useContentFromServer

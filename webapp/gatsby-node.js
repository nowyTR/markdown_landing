const path = require('path')
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// creating static pages for every entry from dataset
exports.createPages = async ({ graphql, actions }) => {
  const result = await graphql(`
    query {
      mdlapi {
        allPages {
          userId
          pageId
          pageName
          content
        }
      }
    }
  `)

  result.data.mdlapi.allPages.forEach(({ pageId, userId, pageName, content }) => {
    const landingPagePath = path.resolve(__dirname, 'src/templates/landingPage.js')
    actions.createPage({
      path: `/${pageId}`,
      component: landingPagePath,
      context: {
        userId,
        pageId,
        pageName,
        content: content || ''
      }
    })
  })

  return true
}

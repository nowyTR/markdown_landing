import { getItem, updateItem } from 'simple-dynamodb'
import { v4 as uuidv4 } from 'uuid'

type SavePageParams = {
  userId: string
  pageId: string
  content: string
}

async function savePage(parent, args: SavePageParams): Promise<LandingPage> {
  const { userId, pageId, content } = args
  const result = await updateItem({
    TableName: process.env.PAGE_TABLE!,
    Key: {
      userId,
      pageId
    },
    UpdateExpression: 'SET content = :content, lastUpdatedAt = :lastUpdatedAt',
    ExpressionAttributeValues: {
      ':content': content,
      ':lastUpdatedAt': new Date().toISOString()
    },
    ReturnValues: 'ALL_NEW'
  })

  const page = result.Attributes

  return {
    userId,
    pageId: page ? page.pageId : null,
    createdAt: page ? page.createdAt : null,
    lastUpdatedAt: page ? page.createdAt : null,
    pageName: page ? page.pageName : null,
    content: page ? page.content : ''
  }
}

type PageParams = {
  userId: string
  pageName: string
}

async function createPage(parent, args): Promise<LandingPage> {
  const pageId = uuidv4()
  const { userId, pageName } = args
  const result = await updateItem({
    TableName: process.env.PAGE_TABLE!,
    Key: {
      userId,
      pageId
    },
    UpdateExpression: 'SET pageName = :pageName, createdAt = :createdAt',
    ExpressionAttributeValues: {
      ':pageName': pageName,
      ':createdAt': new Date().toISOString()
    },
    ReturnValues: 'ALL_NEW'
  })

  const page = result.Attributes

  return {
    userId,
    pageId: page ? page.pageId : null,
    createdAt: page ? page.createdAt : null,
    lastUpdatedAt: page ? page.createdAt : null,
    pageName: page ? page.pageName : null,
    content: ''
  }
}

type UserParams = {
  userId: string
}

async function updateUser(parent, args: UserParams): Promise<User> {
  const { userId } = args
  const result = await getItem({
    TableName: process.env.USER_TABLE!,
    Key: {
      userId
    }
  })

  let user = result.Item

  if (user != null) {
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: {
        userId
      },
      UpdateExpression: 'SET lastSignedInAt = :lastSignedInAt',
      ExpressionAttributeValues: {
        ':lastSignedInAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    })

    user = result.Attributes
  } else {
    const result = await updateItem({
      TableName: process.env.USER_TABLE!,
      Key: {
        userId
      },
      UpdateExpression: 'SET createdAt = :createdAt, lastSignedInAt = :lastSignedInAt',
      ExpressionAttributeValues: {
        ':createdAt': new Date().toISOString(),
        ':lastSignedInAt': new Date().toISOString()
      },
      ReturnValues: 'ALL_NEW'
    })

    user = result.Attributes
  }

  return {
    userId,
    createdAt: user ? user.createdAt : null,
    lastSignedInAt: user ? user.lastSignedInAt : null
  }
}

export { updateUser, createPage, savePage }

import { getItem, updateItem, scanItems } from 'simple-dynamodb'
import { ItemList, AttributeMap } from 'aws-sdk/clients/dynamodb'

async function allPages(): Promise<ItemList | undefined> {
  const result = await scanItems({
    TableName: process.env.PAGE_TABLE!
  })

  return result.Items
}

type PageParams = {
  userId: string
  pageId: string
}

async function page(parent, args: PageParams): Promise<AttributeMap | undefined> {
  const { userId, pageId } = args
  const result = await getItem({
    TableName: process.env.PAGE_TABLE!,
    Key: {
      userId,
      pageId
    }
  })

  return result.Item
}

export { allPages, page }

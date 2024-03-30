import { defineEventHandler } from 'h3'
import { serverQueryContent } from '#content/server'

export default defineEventHandler(async (event) => {
    const appConfig = useAppConfig()

    // Fetch all documents
    let docs = await serverQueryContent(event).find()

    docs = await Promise.all(
        docs
            .filter(
                (doc) => {
                    // Only use `.md` files which are not drafts and has content
                    // Filter hidden documents from the search results
                    return doc?._extension === 'md' &&
                        doc?._draft === false &&
                        doc?._hidden !== true &&
                        !doc?._empty
                }
            )
            .map(
                async ({ _id: id, _path: path, _dir: dir, title = '', description = '', body = undefined, ...rest }) => {
                    const { directoryIcon } = rest

                    if (directoryIcon) {
                        console.log({ directoryIcon })
                    }

                    return {
                        id,
                        path,
                        dir,
                        title,
                        description,
                        keywords: body?.toc?.links.map(link => link?.text),
                        body: extractTextFromAst(body) || ''
                    }
                }
            )
    )

    return docs
})

function extractTextFromAst(node: any) {
    let text = ''
    if (node.type === 'text') {
        text += node.value
    }
    if (node.children) {
        for (const child of node.children) {
            text += ' ' + extractTextFromAst(child)
        }
    }
    return text
}

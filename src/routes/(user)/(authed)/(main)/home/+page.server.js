import prisma from "$lib/server/prisma"
import { ImageType } from "@prisma/client"

export const load = async ({ locals }) => {
    const currentUser = await prisma.user.findUnique({
        where: {
            id: locals.currentUser.id
        },
        include: {
            relations: true,
        }
    })

    const posts = await prisma.post.findMany({
        where: {
            authorId: {
                in: currentUser.relations.map((r) => r.user2Id)
            }
        },
        include: {
            comments: true,
            tags: {
                include: {
                    tag: true
                },
            },
            images: {
                select: {
                    id: true,
                },
            },
            author: {
                include: {
                    images: {
                        select: {
                            id: true,
                        },
                        orderBy: [
                            {
                                addedAt: "desc"
                            }
                        ]
                    },
                },
            },
            comments: true,
            reactions: true,
        },
        orderBy: {
            postedAt: "desc"
        }
    })

    return {
        posts,
        currentUser
    }
}
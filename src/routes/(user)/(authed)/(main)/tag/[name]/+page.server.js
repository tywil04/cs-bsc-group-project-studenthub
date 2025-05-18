import prisma from "$lib/server/prisma"

export const load = async ({ params }) => {
    const tag = await prisma.tag.findUnique({ 
        where: { 
            name: params.name 
        },
        include: {
            posts: {
                include: {
                    post: {
                        include: {
                            comments: true,
                            tags: {
                                include: {
                                    tag: true
                                }
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
                            reactions: true
                        },
                    },
                }
            },
        }
    })

    return { 
        tag
    }
}
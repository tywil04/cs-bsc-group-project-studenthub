import { fail } from "@sveltejs/kit"
import prisma from "$lib/server/prisma"
import { PostStatus } from "@prisma/client"

const POSTS_PER_PAGE = 10

export const load = async ({ url, locals }) => {
    const page = parseInt(url.searchParams.get("page") || "1")

    const numberOfPosts = await prisma.post.count({
        where: {
            reports: {
                some: {}
            },
            status: PostStatus.unreviewed
        },
    })
    const numberOfPages = Math.ceil(numberOfPosts / POSTS_PER_PAGE)

    const posts = await prisma.post.findMany({
        where: {
            reports: {
                some: {}
            },
            status: PostStatus.unreviewed
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
                    },
                },
            },
            comments: {
                include: {
                    comments: true,
                    author: {
                        include: {
                            images: {
                                select: {
                                    id: true,
                                },
                            },
                        },
                    },
                    reactions: true
                }
            },
            reactions: true,
        },
        orderBy: [
            {
                reports: {
                    _count: "desc"
                }
            },
            {
                postedAt: "desc"
            }
        ],
        take: POSTS_PER_PAGE, 
        skip: (page - 1) * POSTS_PER_PAGE
    });

    return { 
        posts, 
        page,
        numberOfPages
    }
}

export const actions = {
    allowPost: async ({ request, locals }) => {
        const data = await request.formData();

        const postId = data.get("postId");

        await prisma.post.update({
            where: {
                id: postId,
                status: PostStatus.unreviewed
            },
            data: {
                status: PostStatus.allowed
            }
        })

        await prisma.report.deleteMany({
            where: {
                postId: postId
            }
        })
    },

    blockPost: async ({ request, locals }) => {
        const data = await request.formData();

        const postId = data.get("postId");

        await prisma.post.update({
            where: {
                id: postId,
                status: PostStatus.unreviewed
            },
            data: {
                status: PostStatus.blocked
            }
        })

        await prisma.report.deleteMany({
            where: {
                postId: postId
            }
        })
    }
}
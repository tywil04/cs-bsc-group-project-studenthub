import prisma from "$lib/server/prisma"
import { ImageType, PostReactionType, ReportType } from "@prisma/client"

export const load = async ({ params }) => {
    const post = await prisma.post.findUnique({
        where: {
            id: params.id
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
                        where: {
                            type: ImageType.profile
                        },
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
            comments: {
                include: {
                    comments: true,
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
                    reactions: true
                }
            },
            reactions: true,
        },
    })

    return {
        post
    }
}

export const actions = {
    toggleLike: async ({ params, locals }) => {
        let postReaction = await prisma.postReaction.findUnique({
            where: {
                id: {
                    userId: locals.currentUser.id,
                    postId: params.id,
                    type: PostReactionType.liked,
                }
            }
        })

        if (postReaction) {
            await prisma.postReaction.delete({
                where: {
                    id: {
                        userId: locals.currentUser.id,
                        postId: params.id,
                        type: PostReactionType.liked,
                    }
                }
            })
        } else {
            await prisma.postReaction.create({
                data: {
                    userId: locals.currentUser.id,
                    postId: params.id,
                    type: PostReactionType.liked
                }
            })

            try {
                await prisma.postReaction.delete({
                    where: {
                        id: {
                            userId: locals.currentUser.id,
                            postId: params.id,
                            type: PostReactionType.disliked
                        }
                    }
                })
            } catch {}
        }
    },

    toggleDislike: async ({ params, locals }) => {
        let postReaction = await prisma.postReaction.findUnique({
            where: {
                id: {
                    userId: locals.currentUser.id,
                    postId: params.id,
                    type: PostReactionType.disliked,
                }
            }
        })

        if (postReaction) {
            await prisma.postReaction.delete({
                where: {
                    id: {
                        userId: locals.currentUser.id,
                        postId: params.id,
                        type: PostReactionType.disliked,
                    }
                }
            })
        } else {
            await prisma.postReaction.create({
                data: {
                    userId: locals.currentUser.id,
                    postId: params.id,
                    type: PostReactionType.disliked
                }
            })

            try {
                await prisma.postReaction.delete({
                    where: {
                        id: {
                            userId: locals.currentUser.id,
                            postId: params.id,
                            type: PostReactionType.liked
                        }
                    },
                })
            } catch {}
        }
    },

    report: async({ params, locals, request }) => {
        const data = await request.formData();

        const errors = {}

        const type = data.get("type")
        if (!Object.values(ReportType).includes(type)) {
            errors.type = "Invalid report type"
        }

        const existingReport = await prisma.report.findFirst({
            where: {
                postId: params.id, 
                userId: locals.currentUser.id,
            }
        })
        if (!!existingReport) {
            errors.overall = "You can only report post once"
        }

        if (Object.keys(errors).length > 0) {
            return fail(400, { success: false, errors: errors });
        }

        const report = await prisma.report.create({
            data: {
                type,
                postId: params.id,
                userId: locals.currentUser.id,
            }
        })
    }
}
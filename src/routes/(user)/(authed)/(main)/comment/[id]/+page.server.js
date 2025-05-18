import prisma from "$lib/server/prisma"
import { CommentReactionType } from "@prisma/client"

export const load = async ({ params }) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: params.id
        },
        include: {
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
            parentComment: {
                include: {
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
                    reactions: true
                },
            },
            post: {
                include: {
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
                }
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
            reactions: true
        }
    })

    return {
        comment
    }
}

export const actions = {
    toggleLike: async ({ params, locals }) => {
        let commentReaction = await prisma.commentReaction.findUnique({
            where: {
                id: {
                    userId: locals.currentUser.id,
                    commentId: params.id,
                    type: CommentReactionType.liked,
                }
            }
        })

        if (commentReaction) {
            await prisma.commentReaction.delete({
                where: {
                    id: {
                        userId: locals.currentUser.id,
                        commentId: params.id,
                        type: CommentReactionType.liked,
                    }
                }
            })
        } else {
            await prisma.commentReaction.create({
                data: {
                    userId: locals.currentUser.id,
                    commentId: params.id,
                    type: CommentReactionType.liked
                }
            })

            try {
                await prisma.commentReaction.delete({
                    where: {
                        id: {
                            userId: locals.currentUser.id,
                            commentId: params.id,
                            type: CommentReactionType.disliked
                        }
                    }
                })
            } catch {}
        }
    },

    toggleDislike: async ({ params, locals }) => {
        let commentReaction = await prisma.commentReaction.findUnique({
            where: {
                id: {
                    userId: locals.currentUser.id,
                    commentId: params.id,
                    type: CommentReactionType.disliked,
                }
            }
        })

        if (commentReaction) {
            await prisma.commentReaction.delete({
                where: {
                    id: {
                        userId: locals.currentUser.id,
                        commentId: params.id,
                        type: CommentReactionType.disliked,
                    }
                }
            })
        } else {
            await prisma.commentReaction.create({
                data: {
                    userId: locals.currentUser.id,
                    commentId: params.id,
                    type: CommentReactionType.disliked
                }
            })

            try {
                await prisma.commentReaction.delete({
                    where: {
                        id: {
                            userId: locals.currentUser.id,
                            commentId: params.id,
                            type: CommentReactionType.liked
                        }
                    },
                })
            } catch {}
        }
    },
}
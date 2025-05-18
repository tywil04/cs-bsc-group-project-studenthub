import { fail } from "@sveltejs/kit"
import prisma from "$lib/server/prisma"
import { ImageType, UserRelationType } from "@prisma/client"

export const load = async ({ params, locals }) => {
    const user = await prisma.user.findUnique({ 
        where: { 
            id: params.id 
        },
        include: {
            posts: {
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
                    reactions: true
                },
                orderBy: {
                    postedAt: "desc"
                }
            },
            images: {
                where: {
                    type: ImageType.profile,
                },
                select: {
                    id: true,
                },
                orderBy: [
                    {
                        addedAt: "desc"
                    }
                ]
            }
        },
    })

    const userFollowing = await prisma.userRelation.count({ 
        where: { 
            user1Id: user.id, 
            type: UserRelationType.followed 
        }
    })

    const userFollowers = await prisma.userRelation.count({ 
        where: { 
            user2Id: user.id, 
            type: UserRelationType.followed 
        }
    })

    const currentUserRelationToUser = (await prisma.userRelation.findFirst({ 
        where: { 
            user1Id: locals.currentUser.id, 
            user2Id: user.id,
        } 
    }))?.type || "none"

    return {
        user,
        userFollowers,
        userFollowing,
        currentUserRelationToUser,
    }
}

export const actions = {
    toggleFollow: async ({ params, locals }) => {
        const user = await prisma.user.findUnique({ where: { id: params.id } })

        if (user.id === locals.currentUser.id) {
            return fail(400, { success: false, error: "Cannot follow yourself" });
        }

        let blockedRelation = await prisma.userRelation.findUnique({
            where: { 
                id: {
                    user1Id: locals.currentUser.id, 
                    user2Id: user.id,
                },
                type: UserRelationType.blocked
            }
        });
        if (blockedRelation) {
            return fail(400, { success: false, error: "Cannot follow a blocked user" });
        }

        let followedRelation = await prisma.userRelation.findUnique({
            where: { 
                id: {
                    user1Id: locals.currentUser.id, 
                    user2Id: user.id,
                },
                type: UserRelationType.followed
            }
        });

        if (followedRelation != null) {
            // is already followed, so unfollow
            await prisma.userRelation.delete({ 
                where: { 
                    id: {
                        user1Id: locals.currentUser.id, 
                        user2Id: user.id,
                    },
                    type: UserRelationType.followed
                } 
            })
        } else {
            // isnt followed, so follow
            await prisma.userRelation.create({      
                data: {
                    user1Id: locals.currentUser.id, 
                    user2Id: user.id,
                    type: UserRelationType.followed,
                }
            })
        }
    },

    toggleBlock: async ({ params, locals }) => {
        const user = await prisma.user.findUnique({ where: { id: params.id } })

        if (user.id === locals.currentUser.id) {
            return fail(400, { success: false, error: "Cannot block yourself" });
        }

        let blockedRelation = await prisma.userRelation.findUnique({
            where: { 
                id: {
                    user1Id: locals.currentUser.id, 
                    user2Id: user.id,
                },
                type: UserRelationType.blocked
            }
        });

        let followedRelation = await prisma.userRelation.findUnique({
            where: { 
                id: {
                    user1Id: locals.currentUser.id, 
                    user2Id: user.id,
                },
                type: UserRelationType.followed
            }
        });

        if (blockedRelation != null) {
            // already blocked, so unblock
            await prisma.userRelation.delete({
                where: { 
                    id: {
                        user1Id: locals.currentUser.id, 
                        user2Id: user.id,
                    },
                    type: UserRelationType.blocked
                }
            });
        } else {
            if (followedRelation != null) {
                // already following, so unfollow
                await prisma.userRelation.delete({
                    where: { 
                        id: {
                            user1Id: locals.currentUser.id, 
                            user2Id: user.id,
                        },
                        type: UserRelationType.followed
                    }
                });
            }

            // not blocked, so block
            await prisma.userRelation.create({      
                data: {
                    user1Id: locals.currentUser.id, 
                    user2Id: user.id,
                    type: UserRelationType.blocked,
                }
            })
        }
    },
}
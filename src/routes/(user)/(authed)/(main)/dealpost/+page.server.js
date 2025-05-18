import prisma from "$lib/server/prisma";

export const load = async ({ locals }) => {
    const dealPosts = await prisma.dealPost.findMany({
        orderBy: [
            {
                postedAt: "desc"
            }
        ]
    })

    return {
        dealPosts
    }
}
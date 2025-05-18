import prisma from "$lib/server/prisma";

export const load = async ({ locals }) => {
    const accomodationPosts = await prisma.accomodationPost.findMany({
        orderBy: [
            {
                postedAt: "desc"
            }
        ]
    })

    return {
        accomodationPosts
    }
}
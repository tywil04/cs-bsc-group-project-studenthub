import prisma from "$lib/server/prisma";

export const load = async ({ locals }) => {
    const jobPosts = await prisma.jobPost.findMany({
        orderBy: [
            {
                postedAt: "desc"
            }
        ]
    })

    return {
        jobPosts
    }
}
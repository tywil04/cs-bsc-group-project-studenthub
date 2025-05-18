import prisma from "$lib/server/prisma";

export const load = async ({ locals }) => {
    const announcements = await prisma.announcement.findMany({
        orderBy: [
            {
                postedAt: "desc"
            }
        ]
    })

    return {
        announcements
    }
}
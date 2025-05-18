import { fail } from "@sveltejs/kit"
import prisma from "$lib/server/prisma"
import { ImageType, UserRelationType } from "@prisma/client"

const USERS_PER_PAGE = 10

export const load = async ({ url, locals }) => {
    const query = url.searchParams.get("query")

    const page = parseInt(url.searchParams.get("page") || "1")

    if (query) {
        const prismaWhereClause = {
            OR: [
                {
                    firstName: { contains: query }
                },
                {
                    lastName: { contains: query }
                },
                {
                    username: { contains: query }
                }
            ],
            // NOT: [
            //     {
            //         id: locals.currentUser.id
            //     }
            // ]
        }

        const numberOfUsers = await prisma.user.count({ where: prismaWhereClause })
        const numberOfPages = Math.ceil(numberOfUsers / USERS_PER_PAGE)
 
        const users = await prisma.user.findMany({
            where: prismaWhereClause,
            include: {
                images: {
                    where: {
                        type: ImageType.profile,
                    },
                    select: {
                        id: true,
                    }
                }
            },
            take: USERS_PER_PAGE,
            skip: (page - 1) * USERS_PER_PAGE,
        })

        return {
            users,
            numberOfPages,
            query,
            page
        }
    }
}
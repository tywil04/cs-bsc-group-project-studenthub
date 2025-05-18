import { fail } from "@sveltejs/kit"
import prisma from "$lib/server/prisma"
import { ImageType, UserRelationType } from "@prisma/client"

export const load = async ({ params, locals }) => {
    const user = await prisma.user.findUnique({ 
        where: { 
            id: params.id 
        },
        include: {
            relations: {
                include: {
                    user2: true,
                }
            }
        }
    })

    return { 
        user
    }
}